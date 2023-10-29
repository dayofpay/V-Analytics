const router = require("express").Router();
const User = require('../models/User');
const middlewares = require('../middlewares/auth');

router.post('/seen', middlewares.protectedRoute, async (req, res) => {
  try {

    const user = await User.findById(req.user._id).exec();

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }


    await user.updateOne({ $set: { notifications: [] } });

    return res.status(200).json({ message: 'All notifications removed' });
  } catch (error) {
    console.error('Error removing notifications:', error);
    return res.status(500).json({ error: 'An error occurred while removing notifications' });
  }
});

module.exports = router;
