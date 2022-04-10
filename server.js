const express = require('express');
const exphbs = require('express-handlebars'); // updated to 6.0.X
const fileUpload = require('express-fileupload');
const bodyparser = require('body-parser');
const fs = require('fs');
const mysql = require('mysql');
const multer = require('multer')
const path = require('path')

const app = express();
const port = process.env.PORT || 5000;

// default option
app.use(fileUpload());

// Static Files
app.use(express.static('public'));
app.use(express.static('upload'));

// body-parser middleware use
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))


// Templating engine
// app.engine('hbs', exphbs({ extname: '.hbs' })); // v5.3.4
// app.set('view engine', 'hbs'); // v5.3.4

// Update to 6.0.X
const handlebars = exphbs.create({ extname: '.hbs',});
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');


// Connection Pool
const db = mysql.createPool({
    connectionLimit : 100,
    port            : 3306 ,
    host            :'localhost',
    user            : 'root' ,
    password        : 'ibtihel06#' ,
    database        : 'upload'
});

db.getConnection( (err,connection) => {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server as ID :' + connection.threadId);
})

// Multer Upload Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,  __dirname + '/upload/' )  //__basedir +
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
    }
});
const upload = multer({ storage: storage });

app.get('', (req, res) => {
    // connection.query('SELECT * FROM user WHERE id = "1"', (err, rows) => {
    //   if (!err) {
    //     res.render('index', { rows });
    //   }
    // });

    res.render('index');
});


app.post('/', upload.single("uploadfile"), (req, res) => {
  
  console.log(res);

  // Use mv() to place file on the server
//   sampleFile.mv(uploadPath, function (err) {
//     if (err) return res.status(500).send(err);

//       connection.query('UPDATE user SET image = ? WHERE id ="1"', [sampleFile.name], (err, rows) => {
//         if (!err) {
//           res.redirect('/');
//         } else {
//           console.log(err);
//         }
//       });
//     });
});

app.listen(port, () => console.log(`Listening on port ${port}`));