const query = 
`WITH fraudops_caseload AS (SELECT
    (rc.case_id)::decimal(20,0)                                              AS ssp_case_id
    , rc.case_id                                                             AS case_id
    , rc.user_token                                                          AS user_token
    , rc.created_at                                                          AS created_at
    , rc.case_type                                                           AS case_type
    , rc."group"
    , rc.admin_uid                                                           AS admin_uid
    , rc.case_closed_at                                                      AS closed_at
    , rc.country_code                                                        AS country_code
    , rc.subroute
    , (DATEDIFF(minutes, created_at, closed_at)/60)::decimal(10,2)           AS resolution_hours
  FROM app_risk.app_risk.fact_risk_cases rc
  
  WHERE "group" IN ('tr','account_takeover_ops', 'chargeback_risk_review', 'reactivation')
    AND rc.case_type NOT IN ('franklin_review')
    AND rc.status != 'pending'
    AND rc.subroute IS NULL OR rc.subroute IN ('BUYER_FRAUD', 'BUYER_FRAUD_ALERT_HIGH', 'BUYER_FRAUD_ALERT_LOW', 'BUYER_FRAUD_HIGH', 'BUYER_FRAUD_LOW', 'CARDING', 'CREDIT_RISK', 'CREDIT_RISK_HIGH', 'CREDIT_RISK_LOW', 'FAKE_ACCOUNT', 'FAKE_ACCOUNT_CARD_PRESENT', 'FAKE_ACCOUNT_CARD_PRESENT_HIGH', 'FAKE_ACCOUNT_CARD_PRESENT_LOW', 'FAKE_ACCOUNT_HIGH', 'FAKE_ACCOUNT_LOW', 'GOOD_MERCHANT_GONE_BAD', 'GOOD_MERCHANT_GONE_BAD_HIGH', 'GOOD_MERCHANT_GONE_BAD_LOW', 'LINKED_TO_BAD_USER', 'LINKED_TO_BAD_USER_HIGH', 'LINKED_TO_BAD_USER_LOW', 'UNCATEGORIZED', 'UNCATEGORIZED_LOW', 'UNCATEGORIZED_HIGH', 'incomplete_irf_LOW', 'incomplete_irf_HIGH', 'incomplete_irf', 'irf_response_LOW', 'irf_response_HIGH', 'irf_response')
  
  
  UNION
  
  SELECT
      (distinct_case_id)::decimal(20,0)                                         AS ssp_case_id
      , case_id                                                                 AS case_id
      , user_token
      , CASE
            WHEN ssp.created_at IS NULL
            THEN testing.created_at
            ELSE ssp.created_at
            END                                                                AS created_at
      , case_type
      , "group"
      , admin_uid
      , closed_at
      , country_code
      , subroute
      , CASE
              WHEN ssp.created_at IS NULL
              THEN (DATEDIFF(minutes, testing.created_at, ssp.closed_at)/60)::decimal(10,2)
              ELSE (DATEDIFF(minutes, ssp.created_at, ssp.closed_at)/60)::decimal(10,2)
              END                                                             AS resolution_hours
  
    FROM (SELECT
        CONCAT(c.id, spal.id)                                                   AS distinct_case_id
      , CASE
            WHEN new_value IN ('pending_further_completion', 'reviewed_and_deactivated', 'reviewed_and_accepted', 'reviewed_and_frozen', 'reviewed')
            THEN  CONCAT(RANK() OVER (partition by CASE
                                                       WHEN new_value IN ('pending_further_completion', 'reviewed_and_deactivated', 'reviewed_and_accepted', 'reviewed_and_frozen', 'reviewed')
                                                       THEN 'flag'
                                                        END, entity_id ORDER BY spal.id), spal.entity_id )
             END                                                                AS mapping
      , c.id                                                                    AS case_id
      , CASE
            WHEN spal.new_value = 'secure-profile-risk-pending-completion'
            THEN 'suspicion'
            WHEN spal.new_value IN ('pending_further_completion','reviewed_and_deactivated', 'reviewed_and_accepted', 'reviewed_and_frozen','reviewed')
            THEN 'ssp_response'
            ELSE NULL
         END
                                                                                 AS case_type
      , ctg."group"                                                              AS "group"
      , to_char(c.target_token, 'utf-8')                                         AS user_token
      , CASE
            WHEN spal.new_value = 'secure-profile-risk-pending-completion'
            THEN c.created_at
            ELSE NULL
         END                                                                     AS created_at
      , r.token                                                                  AS token
      , CASE
            WHEN spal.new_value = 'secure-profile-risk-pending-completion'
            THEN sus_uid.actor_uid
            ELSE spal.actor_uid
         END                                                                     AS admin_uid
      , c.country_code                                                           AS country_code
      , queue_labels.name                                                        AS subroute
      , CASE
            WHEN spal.new_value IN ('secure-profile-risk-pending-completion', 'pending_further_completion', 'reviewed_and_deactivated', 'reviewed_and_accepted', 'reviewed_and_frozen', 'reviewed')
            THEN spal.created_at
            ELSE NULL
         END                                                                      AS closed_at
      , spal.id                                                                   AS spid
  FROM SECURE_PROFILE.RAW_OLTP.AUDIT_LOGS spal
  LEFT JOIN SECURE_PROFILE.RAW_OLTP.REQUESTS r
    ON r.id = spal.entity_id
  LEFT JOIN REGULATOR.RAW_OLTP.SECURE_PROFILE_CASE_INFOS spci
    ON r.token = TO_CHAR(spci.secure_profile_request_token, 'utf-8')
  LEFT JOIN kases.raw_oltp.cases c
      ON spci.case_token = c.token
  LEFT JOIN (SELECT id
             , to_char(name) AS case_type
             FROM kases.raw_oltp.case_types) AS ct
      ON c.case_type_id = ct.id
  LEFT JOIN app_risk.app_risk.case_type_groups ctg
      ON ct.case_type = ctg.case_type
  LEFT JOIN (SELECT *
             FROM regulator.raw_oltp.audit_logs ral
             WHERE ral.action_name = 'SecureProfile::CreateRiskRequest'
              ) sus_uid
          ON sus_uid.case_id = c.legacy_case_id
  LEFT JOIN KASES.RAW_OLTP.QUEUE_LABELS queue_labels
      ON c.queue_label_id = queue_labels.id
  WHERE spal.new_value IN ('secure-profile-risk-pending-completion', 'pending_further_completion', 'reviewed_and_deactivated', 'reviewed_and_accepted', 'reviewed_and_frozen', 'reviewed')
    AND ctg."group" = 'tr') ssp
  LEFT JOIN (SELECT CONCAT( RANK() OVER (PARTITION BY entity_id ORDER BY id)  , entity_id) AS testing_1 , created_at
  FROM SECURE_PROFILE.RAW_OLTP.AUDIT_LOGS
  WHERE new_value IN ('sqsprofile/risk_information_received')) TESTING
  ON testing.testing_1=ssp.mapping
  )
  SELECT * FROM (
  SELECT *, DENSE_RANK() OVER (ORDER BY z___min_rank) as z___pivot_row_rank, RANK() OVER (PARTITION BY z__pivot_col_rank ORDER BY z___min_rank) as z__pivot_col_ordering, CASE WHEN z___min_rank = z___rank THEN 1 ELSE 0 END AS z__is_highest_ranked_cell FROM (
  SELECT *, MIN(z___rank) OVER (PARTITION BY "fraudops_caseload.created_at_pt_day_of_week_index","fraudops_caseload.created_at_pt_day_of_week") as z___min_rank FROM (
  SELECT *, RANK() OVER (ORDER BY "fraudops_caseload.created_at_pt_day_of_week_index" ASC, z__pivot_col_rank, "fraudops_caseload.created_at_pt_day_of_week") AS z___rank FROM (
  SELECT *, DENSE_RANK() OVER (ORDER BY CASE WHEN "fraudops_caseload.subroute_bucket" IS NULL THEN 1 ELSE 0 END, "fraudops_caseload.subroute_bucket") AS z__pivot_col_rank FROM (
  SELECT
      (CASE
            WHEN fraudops_caseload.subroute IN ('BUYER_FRAUD', 'BUYER_FRAUD_ALERT_HIGH', 'BUYER_FRAUD_ALERT_LOW', 'BUYER_FRAUD_HIGH', 'BUYER_FRAUD_LOW')
            THEN 'BUYER_FRAUD'
            WHEN fraudops_caseload.subroute = 'CARDING'
            THEN 'CARDING'
            WHEN fraudops_caseload.subroute IN ('CREDIT_RISK', 'CREDIT_RISK_HIGH', 'CREDIT_RISK_LOW')
            THEN 'CREDIT_RISK'
            WHEN fraudops_caseload.subroute IN ('FAKE_ACCOUNT', 'FAKE_ACCOUNT_CARD_PRESENT', 'FAKE_ACCOUNT_CARD_PRESENT_HIGH', 'FAKE_ACCOUNT_CARD_PRESENT_LOW', 'FAKE_ACCOUNT_HIGH', 'FAKE_ACCOUNT_LOW')
            AND fraudops_caseload.case_type = 'suspicion'
            THEN 'FAKE_ACCOUNT'
            WHEN fraudops_caseload.subroute IN ('GOOD_MERCHANT_GONE_BAD', 'GOOD_MERCHANT_GONE_BAD_HIGH', 'GOOD_MERCHANT_GONE_BAD_LOW')
            THEN 'GOOD_MERCHANT_GONE_BAD'
            WHEN fraudops_caseload.subroute IN ('LINKED_TO_BAD_USER', 'LINKED_TO_BAD_USER_HIGH', 'LINKED_TO_BAD_USER_LOW')
            THEN 'LINKED_TO_BAD_USER'
            WHEN fraudops_caseload.subroute IN ('UNCATEGORIZED', 'UNCATEGORIZED_LOW', 'UNCATEGORIZED_HIGH')
            AND fraudops_caseload.case_type != 'tr_general'
            THEN 'UNCATEGORIZED'
            WHEN fraudops_caseload.subroute IN ('incomplete_irf_LOW', 'incomplete_irf_HIGH', 'incomplete_irf')
            THEN 'INCOMPLETE_IRF'
            WHEN fraudops_caseload.subroute IN ('irf_response_LOW', 'irf_response_HIGH', 'irf_response')
            THEN 'IRF_RESPONSE'
            WHEN fraudops_caseload.case_type IN ('payroll_risk_review')
            THEN 'PAYROLL_RISK_REVIEW'
            WHEN fraudops_caseload.case_type IN ('payroll_irf_response')
            THEN 'PAYROLL_IRF_RESPONSE'
            WHEN fraudops_caseload.case_type IN ('bbox_order_review')
            THEN 'BBOX_ORDER_REVIEW'
            WHEN fraudops_caseload.case_type IN ('ato_alert')
            THEN 'ATO_ALERT'
            WHEN fraudops_caseload.case_type IN ('expiring_freeze')
            THEN 'EXPIRING_FREEZE'
            WHEN fraudops_caseload.case_type IN ('tr_miss_review', 'model_miss_review')
            THEN 'CB_TAGGING'
            WHEN fraudops_caseload.case_type IN ('rowo_scoring')
            THEN 'ROWO_SCORING'
            WHEN fraudops_caseload.case_type IN ('tr_general')
            THEN 'TR_GENERAL'
            WHEN fraudops_caseload.case_type IN ('intl_optimistic_review')
            THEN 'OPTIMISTIC_REVIEW'
            WHEN fraudops_caseload.subroute IN ('INCOMPLETE_RISK_REQUEST_LOW', 'INCOMPLETE_RISK_REQUEST_HIGH')
             AND fraudops_caseload.case_type = 'ssp_response'
            THEN 'INCOMPLETE_SSP'
            WHEN (fraudops_caseload.subroute != 'INCOMPLETE_RISK_REQUEST_LOW' OR fraudops_caseload.subroute != 'INCOMPLETE_RISK_REQUEST_HIGH')
            AND fraudops_caseload.case_type = 'ssp_response'
            THEN 'SSP_RESPONSE'
            WHEN fraudops_caseload.case_type IN ('fraud_escalation')
            THEN 'FRAUD_ESCALATION'
            WHEN fraudops_caseload.case_type IN ('reactivation_appeal', 'reactivation_irf_response')
            THEN 'REACTIVATION'
            ELSE 'Other'
          END) AS "fraudops_caseload.subroute_bucket",
          (MOD(EXTRACT(DOW FROM CONVERT_TIMEZONE('UTC', 'America/Los_Angeles', fraudops_caseload.created_at) )::integer - 1 + 7, 7)) AS "fraudops_caseload.created_at_pt_day_of_week_index",
          (CASE TO_CHAR(CONVERT_TIMEZONE('UTC', 'America/Los_Angeles', fraudops_caseload.created_at) , 'DY')
    WHEN 'Tue' THEN 'Tuesday'
    WHEN 'Wed' THEN 'Wednesday'
    WHEN 'Thu' THEN 'Thursday'
    WHEN 'Sat' THEN 'Saturday'
    ELSE TO_CHAR(CONVERT_TIMEZONE('UTC', 'America/Los_Angeles', fraudops_caseload.created_at) , 'DY') || 'day'
  END
  ) AS "fraudops_caseload.created_at_pt_day_of_week",
      COUNT(DISTINCT fraudops_caseload.ssp_case_id ) AS "fraudops_caseload.case_count"
  FROM fraudops_caseload
  WHERE (((( CAST(EXTRACT(HOUR FROM TO_TIMESTAMP_NTZ(CONVERT_TIMEZONE('UTC', 'America/Los_Angeles', fraudops_caseload.created_at) )) AS INT) ) >= 1 AND ( CAST(EXTRACT(HOUR FROM TO_TIMESTAMP_NTZ(CONVERT_TIMEZONE('UTC', 'America/Los_Angeles', fraudops_caseload.created_at) )) AS INT) ) <= 16))) AND (((( CONVERT_TIMEZONE('UTC', 'America/Los_Angeles', fraudops_caseload.created_at)  ) >= ((DATEADD('day', -28, DATE_TRUNC('week', CURRENT_DATE())))) AND ( CONVERT_TIMEZONE('UTC', 'America/Los_Angeles', fraudops_caseload.created_at)  ) < ((DATEADD('day', 28, DATEADD('day', -28, DATE_TRUNC('week', CURRENT_DATE()))))))) AND ((CASE TO_CHAR(CONVERT_TIMEZONE('UTC', 'America/Los_Angeles', fraudops_caseload.created_at) , 'DY')
    WHEN 'Tue' THEN 'Tuesday'
    WHEN 'Wed' THEN 'Wednesday'
    WHEN 'Thu' THEN 'Thursday'
    WHEN 'Sat' THEN 'Saturday'
    ELSE TO_CHAR(CONVERT_TIMEZONE('UTC', 'America/Los_Angeles', fraudops_caseload.created_at) , 'DY') || 'day'
  END
  ) NOT IN ('Saturday', 'Sunday') OR (CASE TO_CHAR(CONVERT_TIMEZONE('UTC', 'America/Los_Angeles', fraudops_caseload.created_at) , 'DY')
    WHEN 'Tue' THEN 'Tuesday'
    WHEN 'Wed' THEN 'Wednesday'
    WHEN 'Thu' THEN 'Thursday'
    WHEN 'Sat' THEN 'Saturday'
    ELSE TO_CHAR(CONVERT_TIMEZONE('UTC', 'America/Los_Angeles', fraudops_caseload.created_at) , 'DY') || 'day'
  END
  ) IS NULL)) AND ((fraudops_caseload.case_type ) IN ('expiring_freeze', 'ssp_response', 'suspicion', 'tr_irf_response') AND ((fraudops_caseload.country_code ) = 'US' AND ((CASE
            WHEN fraudops_caseload.subroute IN ('BUYER_FRAUD', 'BUYER_FRAUD_ALERT_HIGH', 'BUYER_FRAUD_ALERT_LOW', 'BUYER_FRAUD_HIGH', 'BUYER_FRAUD_LOW')
            THEN 'BUYER_FRAUD'
            WHEN fraudops_caseload.subroute = 'CARDING'
            THEN 'CARDING'
            WHEN fraudops_caseload.subroute IN ('CREDIT_RISK', 'CREDIT_RISK_HIGH', 'CREDIT_RISK_LOW')
            THEN 'CREDIT_RISK'
            WHEN fraudops_caseload.subroute IN ('FAKE_ACCOUNT', 'FAKE_ACCOUNT_CARD_PRESENT', 'FAKE_ACCOUNT_CARD_PRESENT_HIGH', 'FAKE_ACCOUNT_CARD_PRESENT_LOW', 'FAKE_ACCOUNT_HIGH', 'FAKE_ACCOUNT_LOW')
            AND fraudops_caseload.case_type = 'suspicion'
            THEN 'FAKE_ACCOUNT'
            WHEN fraudops_caseload.subroute IN ('GOOD_MERCHANT_GONE_BAD', 'GOOD_MERCHANT_GONE_BAD_HIGH', 'GOOD_MERCHANT_GONE_BAD_LOW')
            THEN 'GOOD_MERCHANT_GONE_BAD'
            WHEN fraudops_caseload.subroute IN ('LINKED_TO_BAD_USER', 'LINKED_TO_BAD_USER_HIGH', 'LINKED_TO_BAD_USER_LOW')
            THEN 'LINKED_TO_BAD_USER'
            WHEN fraudops_caseload.subroute IN ('UNCATEGORIZED', 'UNCATEGORIZED_LOW', 'UNCATEGORIZED_HIGH')
            AND fraudops_caseload.case_type != 'tr_general'
            THEN 'UNCATEGORIZED'
            WHEN fraudops_caseload.subroute IN ('incomplete_irf_LOW', 'incomplete_irf_HIGH', 'incomplete_irf')
            THEN 'INCOMPLETE_IRF'
            WHEN fraudops_caseload.subroute IN ('irf_response_LOW', 'irf_response_HIGH', 'irf_response')
            THEN 'IRF_RESPONSE'
            WHEN fraudops_caseload.case_type IN ('payroll_risk_review')
            THEN 'PAYROLL_RISK_REVIEW'
            WHEN fraudops_caseload.case_type IN ('payroll_irf_response')
            THEN 'PAYROLL_IRF_RESPONSE'
            WHEN fraudops_caseload.case_type IN ('bbox_order_review')
            THEN 'BBOX_ORDER_REVIEW'
            WHEN fraudops_caseload.case_type IN ('ato_alert')
            THEN 'ATO_ALERT'
            WHEN fraudops_caseload.case_type IN ('expiring_freeze')
            THEN 'EXPIRING_FREEZE'
            WHEN fraudops_caseload.case_type IN ('tr_miss_review', 'model_miss_review')
            THEN 'CB_TAGGING'
            WHEN fraudops_caseload.case_type IN ('rowo_scoring')
            THEN 'ROWO_SCORING'
            WHEN fraudops_caseload.case_type IN ('tr_general')
            THEN 'TR_GENERAL'
            WHEN fraudops_caseload.case_type IN ('intl_optimistic_review')
            THEN 'OPTIMISTIC_REVIEW'
            WHEN fraudops_caseload.subroute IN ('INCOMPLETE_RISK_REQUEST_LOW', 'INCOMPLETE_RISK_REQUEST_HIGH')
             AND fraudops_caseload.case_type = 'ssp_response'
            THEN 'INCOMPLETE_SSP'
            WHEN (fraudops_caseload.subroute != 'INCOMPLETE_RISK_REQUEST_LOW' OR fraudops_caseload.subroute != 'INCOMPLETE_RISK_REQUEST_HIGH')
            AND fraudops_caseload.case_type = 'ssp_response'
            THEN 'SSP_RESPONSE'
            WHEN fraudops_caseload.case_type IN ('fraud_escalation')
            THEN 'FRAUD_ESCALATION'
            WHEN fraudops_caseload.case_type IN ('reactivation_appeal', 'reactivation_irf_response')
            THEN 'REACTIVATION'
            ELSE 'Other'
          END)) IN ('BUYER_FRAUD', 'CARDING', 'FAKE_ACCOUNT', 'GOOD_MERCHANT_GONE_BAD', 'LINKED_TO_BAD_USER', 'UNCATEGORIZED')))
  GROUP BY
      1,
      2,
      3) ww
  ) bb WHERE z__pivot_col_rank <= 16384
  ) aa
  ) xx
  ) zz
   WHERE (z__pivot_col_rank <= 50 OR z__is_highest_ranked_cell = 1) AND (z___pivot_row_rank <= 500 OR z__pivot_col_ordering = 1) ORDER BY z___pivot_row_rank`
   export default query;