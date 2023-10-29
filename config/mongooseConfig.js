const mongoose = require('mongoose');
const settings = require('../config/database');
async function connect(){

    await mongoose.connect(`mongodb://${settings.HOST}:${settings.PORT}/${settings.DATABASE_NAME}`);
    console.log('Connection success !');

}


module.exports = connect