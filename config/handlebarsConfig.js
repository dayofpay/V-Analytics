const handlebars = require('express-handlebars');

const handlebarsConfig = (app) =>{
     // > Handlebars config <
app.engine('hbs', handlebars.engine({ extname: '.hbs' }));

app.set('view engine', 'hbs');

app.set('views', 'views');



// ! Handlebars config !
}


module.exports = handlebarsConfig;