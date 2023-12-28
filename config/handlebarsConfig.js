const handlebars = require('express-handlebars');
const Handlebars = require('handlebars')
const handlebarsConfig = (app) => {
     // > Handlebars config <

     Handlebars.registerHelper('eq', function (a, b, options) {
          return a === b;
     });
     app.engine('hbs', handlebars.engine({
          extname: '.hbs'
     }));

     app.set('view engine', 'hbs');

     app.set('views', 'views');



     // ! Handlebars config !
}


module.exports = handlebarsConfig;