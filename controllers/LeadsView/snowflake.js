import config from '../../database/snowflakeConfig.js'
import snowflake from 'snowflake-sdk'
import query from '../../database/fourWeekAvg.js'

var connection = snowflake.createConnection(config)

export const getAvg = async(req, res) => {
    connection.execute({
    sqlText: query,
    complete: async function(err,stmt,rows){
        console.log('fetching snowflake data...')
        await connection.connectAsync(
            function(err, conn) {
                if (err) {
                    console.error('Unable to connect: ' + err.message);
                } 
                else {
                    let connId = conn.getId();
                    console.log('Successfully connected to Snowflake on id ' + connId); 
                }
            }).then( () => {
                connection.execute({
                sqlText: query,
                complete: function(err, stmt, rows) {
                    if (err) {
                        console.error('error: ' + err.message);
                    } else {
                        res.send(rows);
                    }}
                })
            })     
        }
    });
};
