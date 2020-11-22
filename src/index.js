const express = require ('express');
const morgan  = require('morgan');
const hbs = require('express-handlebars');
const { request } = require('express');
const path= require('path');
const multer = require('multer');
//Initializations
const app= express();

//Settings
app.set('port', process.env.PORT || 4000);
app.set('views',path.join(__dirname,'views')); //dice donde esta la carpeta views
app.engine('.hbs', hbs({
    defaultLayout:'main',//nombre del archivo principa;
    layoutsDir: path.join(app.get('views'),'layouts'),//layaouts esta en views
    partialsDir: path.join(app.get('views'),'partials'),//aqui van elementos reutilizables
    extname: '.hbs',//extension de handlebars
    helpers: require('./lib/handlebars')
}));
app.set('view engine','.hbs');
//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));//acepta los datos sencillos
app.use(express.json());
app.use(multer({dest: path.join(__dirname,'public/img/uploads')}).single('image'));

//Global Variables
app.use((req,res,next)=>{
    next();
})
//Routes
app.use(require('./routes'));
app.use(require('./routes/autentications'));
app.use('/lists',require('./routes/lists'));
app.use('/product',require('./routes/product'));
app.use('/user',require('./routes/users'));

//Public
app.use(express.static(path.join(__dirname, 'public')));
//Starting the server
app.listen(app.get('port'),()=>{
    console.log('Server on port', app.get('port'));
});
