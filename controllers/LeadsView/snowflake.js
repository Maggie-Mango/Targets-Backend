import config from '../../database/snowflakeConfig.js'
import snowflake from 'snowflake-sdk'

var connection = snowflake.createConnection(config)


connection.connectAsync( 
    function(err, conn) {
        if (err) {
            console.error('Unable to connect: ' + err.message);
        } 
        else {
            let connId = conn.getId();
            console.log('Successfully connected to Snowflake on id ' + connId); 
        }
    }).then(() => {
        connection.execute({
        sqlText: 'select * from app_risk.app_risk.fraudops_cases limit 1',
        complete: function(err, stmt, rows) {
            if (err) {
                console.error('error: ' + err.message);
            } else {
                console.log('in here')
                console.log(rows)
            }
        }
    })
})