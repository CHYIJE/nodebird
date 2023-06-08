const express = require('express');

const { isLoggedIn } = require('../middlewares');
const { follow } = require('../controllers/user');


const router = express.Router();

router.post('/:id/follow', isLoggedIn, follow);
router.post('/:id/followCancle', isLoggedIn, async(req, res, next) => {
    try {
        console.log(req.user.id, req.params.id);
        const user = await User.findOne({where: { nick: req.params.id } });
        await user.removeFollower(parseInt(req.user.id));
        res.send('success');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;