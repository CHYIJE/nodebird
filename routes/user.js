const express = require('express');
const { isLoggedIn } = require('../middlewares');
const { follow } = require('../controllers/user');
const { followCancle } = require('../controllers/user');
const { User } = require('../models');

const router = express.Router();

// Follow a user
router.post('/:id/follow', isLoggedIn, follow);

// Unfollow a user
router.post('/:id/followCancle', isLoggedIn, followCancle);


router.patch('/:id', isLoggedIn, async (req, res, next) => {
    try {
      console.log(req.user.id, req.params.id);
      const newNick = req.body.nick;
      const user = await User.update({ nick: newNick }, { where: { id: req.user.id } });
      res.send('success');
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

module.exports = router;