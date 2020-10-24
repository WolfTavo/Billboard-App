//ENVIROMENT VARIABLE CONFIRMATION
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config(); //BRING MY VARIABLES
}

//CALL MODULES
const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

//INITIALIZATION
const app = express();
require('./db');

//SETTINGS
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views')); //pongo mi ruta hacia la carpeta views
app.engine('html', require('ejs').renderFile); // seteo mi motor como html pero usando ejs
app.set('view engine', 'ejs'); //mi motor de plantillas sera ejs
app.set('layout', 'layouts/layout.html'); //esta linea setea mi layout en conjunto con el modulo express-ejs-layout para que funcione como handlebars

//MIDDLEWARES
app.use(expressLayouts);
const mainRouter = require('./routes/main-route'); //llamado de ruta principal


//GLOBAL VARIABLES

//ROUTES
app.use('/', mainRouter);

//STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

//SERVER
app.listen(app.get('port'), () => {
    console.log('Server is working in.....', app.get('port'));
});