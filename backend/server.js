// set module
const express = require("express");
const bodyParser = require('body-parser');

// database conn pool(create)
const db = require('./db');

// create server
const app = express();

//json parser
app.use(bodyParser.json());

// Create table command(do not use like that...)
// db.pool.query(`CREATE TABLE lists (
// id INTEGER AUTO_INCREMENT,
// value TEXT,
// PRIMARY KEY (id)
// )`, (err, results, fields) => {
//     console.log('results', results);
// });

// database table 에 있는 모든 데이터 읽어와 front-end server로 보내준다
app.get('/api/values', function(req, res) {
    // get all data from database
    db.pool.query(`SELECT * FROM lists;`,
    (err, results, fields) => {
        if(err) {
            return res.status(500).send(err);
        } else {
            return res.json(results);
        }
    });
});

// client 에서 입력한 값을 database table 에 insert
app.post('/api/value', function (req, res, next) {
    //데이터베이스에 값 넣어주기
    console.log('REQ BODY VALUE: ' + req.body.value);
    console.log('DB: ' + db.pool);

    db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}")`,
        (err, results, fileds) => {
            if (err)
                return res.status(500).send(err);
            else
                return res.json({ success: true, value: req.body.value })
        });
});

// after server onlistener
app.listen(5000, () => {
    console.log('Application started!!!!!!');
});