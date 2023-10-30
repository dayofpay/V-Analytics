const express = require('express');
const app = express();
const PORT = 3000;
const handlebarsConfig_INIT = require('./config/handlebarsConfig');
const expressConfig_INIT = require('./config/expressConfig');
const mongooseConfig_INIT = require('./config/mongooseConfig');
const routes = require('./router');
const dbConfig = require('./database/config')
mongooseConfig_INIT();
handlebarsConfig_INIT(app);
expressConfig_INIT(app, express);

app.use(routes);


app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);

    /// IMPORTANT SECURITY CHECK ///

    const defaultJsonWebToken = dbConfig.JWT.SECRET_TOKEN === 'SECRET_MESSAGE';

    if (defaultJsonWebToken) {
        console.warn(`[!] Important Security Notice: Before deploying this site in a production environment, it is crucial to replace the default JWT token with a highly secure and unique secret token that only you should be aware of. Failing to do so could pose a significant security risk. Protect your application by setting a strong, secret key.
        `);
        console.warn(`[!] Important Security Notice: Before deploying this site in a production environment, it is crucial to replace the default JWT token with a highly secure and unique secret token that only you should be aware of. Failing to do so could pose a significant security risk. Protect your application by setting a strong, secret key.
        `);
        console.warn(`[!] Important Security Notice: Before deploying this site in a production environment, it is crucial to replace the default JWT token with a highly secure and unique secret token that only you should be aware of. Failing to do so could pose a significant security risk. Protect your application by setting a strong, secret key.
        `);
        console.warn(`[!] Important Security Notice: Before deploying this site in a production environment, it is crucial to replace the default JWT token with a highly secure and unique secret token that only you should be aware of. Failing to do so could pose a significant security risk. Protect your application by setting a strong, secret key.
        `);
        console.warn(`[!] Important Security Notice: Before deploying this site in a production environment, it is crucial to replace the default JWT token with a highly secure and unique secret token that only you should be aware of. Failing to do so could pose a significant security risk. Protect your application by setting a strong, secret key.
        `);
        console.warn(`[!] Important Security Notice: Before deploying this site in a production environment, it is crucial to replace the default JWT token with a highly secure and unique secret token that only you should be aware of. Failing to do so could pose a significant security risk. Protect your application by setting a strong, secret key.
        `);
    }
})