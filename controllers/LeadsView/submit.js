import CaseTargets from "../../models/target.js";

export const submitTargets = async (req, res) => {
    const rowData = req.body.data
    for (let i = 0; i < rowData.length; i++) {
        let row = rowData[i];
        console.log(row.id)
    try {
        await CaseTargets.create({
            rowId: row.id,
            agentname: row.agentname,
            noncasework: row.noncasework,
            ooo: row.ooo,
            TR_TOTAL: row.TR_TOTAL,
            SSP_TOTAL: row.SSP_TOTAL,
            ACH: row.ACH,
            BF: row.BF,
            FA: row.FA,
            CARDING: row.CARDING,
            RESPONSE: row.RESPONSE,
            AFTERPAY: row.AFTERPAY,
            VERIFF: row.VERIFF,
            UNCAT: row.UNCAT,
            GMGB: row.GMGB,
            UNLINKED_REFUNDS: row.UNLINKED_REFUNDS,
            LBU: row.LBU,
            EF: row.EF,
            target_date: new Date(),
            submitted_by: 'tester'
        })

    } catch (err) {
        console.log(err);
    }
    
    }
    res.json('rows added')
}