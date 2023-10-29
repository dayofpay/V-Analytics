const express = require('express');
const app = express();
const PORT = 3000;
const handlebarsConfig_INIT = require('./config/handlebarsConfig');
const expressConfig_INIT = require('./config/expressConfig');
const mongooseConfig_INIT = require('./config/mongooseConfig');
const routes = require('./router');
mongooseConfig_INIT();
handlebarsConfig_INIT(app);
expressConfig_INIT(app,express);

app.use(routes);


app.listen(PORT,() => {
    console.log('Server is running on port ' + PORT);
})