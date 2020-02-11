const fs = require('fs')

const dbConnection = require('./db_connection')
const initQuery = fs.readFileSync(`${__dirname}/db_build.sql`).toString()

dbConnection.query(initQuery, (error, result) =>{
    if(error) throw error;
    console.log(("tables created with result : ", result));
})
