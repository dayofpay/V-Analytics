const User = require('../models/User');
const Site = require('../models/Sites');
// const jwt = require('jsonwebtoken');
// const config = require('../database/config');
async function createSite(siteData,userId) {
    try {
        // Check if the user already has the same site added to their account
        const user = await User.findById(userId).exec();
        if (!user) {
            return { error: 'User not found' };
        }

        const siteExists = user.sites.find(site => site.site_url === siteData.site_url);
        if (siteExists) {
            return { error: 'You have already added this site!' };
        }

        siteData.ownerId = userId; // Set the ownerId to the user's _id
        const site = await Site.create(siteData);

        // Add the created site to the user's sites array
        user.sites.push(site);
        await user.save();

        console.log('Site Created!');
        return site;
    } catch (error) {
        console.error('Error creating site:', error);
        return { error: 'An error occurred while creating the site' };
    }
}


async function getSitesByUser(userId) {
    try {
        const user = await User.findById(userId).exec();

        if (!user) {
            return { error: 'This user does not exist!' };
        }

        const siteList = await Site.find({ ownerId: userId }).exec();

        if (!siteList || siteList.length === 0) {
            return { error: 'This user doesn\'t have any sites' };
        }

        return siteList;
    } catch (error) {
        console.error('Error while trying to search user sites', error);

        return { error: 'An error occurred while trying to search user sites ...' };
    }
}


async function checkUserAccess(req,res){
    try {

        const siteId = req.params.id;
        const userId = req.user._id;

        const site = await Site.findOne({
            _id: siteId,
            ownerId: userId,
        }).exec();

        if (site) {

            console.log('User has access to the site:', site);
            return true;

        } else {

            console.log('User does not have access to the site');
            return false;

        }
    } catch (error) {
        console.error('Error checking site access:', error);

        res.status(500).json({ error: 'Internal Server Error' });
        return false;
    }
}


module.exports = {
    createSite: createSite,
    getSitesByUser : getSitesByUser,
    checkUserAccess : checkUserAccess
}
