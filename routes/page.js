const express = require('express');
const { renderProfile, renderJoin, rederMain} = require('../controllers/page');

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = null;
    res.locals.followerCount = 0;
    res.locals.followerCount = 0;
    res.locals.followingIdList = [];
    next();
});

router.get('/profile', renderProfile);

router.get('/join', renderJoin);

router.get('/', rederMain);

module.exports = router;