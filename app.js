const express = require("express");
const app = express();

const db = require("./routes/connections/index");
const register = require("./routes/users/registration/index");
const login = require("./routes/users/login/index");
const crud = require("./routes/sample/index");

const port = 6553;
app.use(express.json());
app.listen(port, () => {
    console.log("server started and running on port" + port)
});

db.connect((err) => {
    if (err) {
        console.log('unable to connect to database');
    }
});
app.use("/register", register)
app.use("/login",login)
app.use("/insert",crud)
app.use("/update",crud)
app.use("/",crud)



// var express = require('express');
// var querystring = require('querystring');
// var http = require('http');

// var app = express();

// // app.get('/', function (req, res) {
//   var data = querystring.stringify({
//     username: "myname",
//     password: " pass"
//   });

//   var options = {
//     host: 'localhost',
//     port: 8070,
//     path: '/',
//     method: 'get',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//       'Content-Length': Buffer.byteLength(data)
//     }
//   };

//   var httpreq = http.request(options, function (response) {
//     response.setEncoding('utf8');
//     response.on('data', function (chunk) {
//       console.log("body: " + chunk);
//     });
//     response.on('end', function() {
//       res.send('ok');
//     })
//   });
//   httpreq.write(data);
//   httpreq.end();
// // });

// app.listen(8090);

