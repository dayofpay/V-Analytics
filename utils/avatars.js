const gravatar = require('gravatar');


async function getAvatar(email){
    // Get user avatar ( Using gravatar api )

    return gravatar.url(email);
}


module.exports = {
    getAvatar : getAvatar,
}