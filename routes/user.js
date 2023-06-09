const express = require('express');
const { isLoggedIn } = require('../middlewares');
const { follow } = require('../controllers/user');
const { followCancle } = require('../controllers/user');

const router = express.Router();

// Follow a user
router.post('/:id/follow', isLoggedIn, follow);

// Unfollow a user
router.post('/:id/followCancle', isLoggedIn, followCancle);

module.exports = router;