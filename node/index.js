const express = require('express');
const app = express();
const port = 3000;

let html = "<h1>Full Cycle Rocks!</h1> " +
             "<p>- Lista de nomes cadastrada no banco de dados.</p>" +
             "<ul>[LISTA]</ul>";
let peopleList = "";

const config = {
    host: 'dbnode',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require("mysql");
const connection = mysql.createConnection(config);

const sqlCreateTable = 'CREATE TABLE people (id int(4) AUTO_INCREMENT, name varchar(255) NOT NULL, PRIMARY KEY (id))';
connection.query(sqlCreateTable);

const sqlInsert = `insert into people(name) values ('fernando')`;
connection.query(sqlInsert);

const sqlPeopleQuery = 'Select * from people';
connection.query(sqlPeopleQuery, function (err, rows, fields) {
    if (err) throw err;
    var resultArray = Object.values(JSON.parse(JSON.stringify(rows)));

    resultArray.forEach(function(v){ 
        peopleList = peopleList + '<li>' + v.id + '-' + v.name + '</li>';
    });

    html = html.replace('[LISTA]', peopleList);
    
  });

connection.end();

console.log('serving..');
app.get('/', (req, res) => {
    res.send(html);
});

app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`)
    console.log("Code Education Rocks!")
});
