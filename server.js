const express = require('express');
const exphbs = require('express-handlebars');
const fileUpload = require('express-fileupload');

const app = express();
const PORT = process.env.PORT || 5000 ;

//default option 
app.use(fileUpload());


//templating engine 
app.engine('hbs' , exphbs.engine({extname: '.hbs'}));
app.set('view engine', 'hbs');

app.get('', (req , res)=> {
    res.render('index');
})

app.listen(PORT , ()=> console.log(`Listening on port ${PORT}`));