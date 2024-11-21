const mysql = require('mysql');
const dotenv = require('dotenv')
dotenv.config()

let configuration = {
    host: process.env.BDD_HOST,
    port: process.env.BDD_PORT,
    user: process.env.BDD_USER,
    password: process.env.BDD_MDP,
    database: process.env.BDD_NAME
};

let connection = mysql.createConnection(configuration);
 
connection;
 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

module.exports = connection;