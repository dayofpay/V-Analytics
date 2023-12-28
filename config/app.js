const APP_CONFIG = {
    'LOCALES' : {
        'ERRORS' : {
            INVALID_PASSWORD : 'Invalid username or password!',
        },
        'MESSAGES' : {

        }
    },
    'SECURITY' : {
        PROXY_CHECK : true,
        IP_BLACKLIST: false,

        BLACKLIST_SETTINGS : {
            BANNED_IPS : ["::ffff:127.0.0.1"],
        }
    },
    'DEBUG' : {
        DEBUG_ENABLED : false,
        DEBUG_PREFIX : '[DEBUG]',
    }
}


module.exports = {APP_CONFIG:APP_CONFIG}