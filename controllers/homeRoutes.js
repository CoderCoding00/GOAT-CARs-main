const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
    try {
        res.render('homepage', {
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', async (req, res) => {
    try {
        if (req.session.logged_in) {
            await res.redirect('/');
            return;
        }
        res.render('login');
    } catch (err) {
        res.status(500).json(err);
    }
    
})

router.get('/profile', async (req, res) => {
    try {
        if (!req.session.logged_in) {
            res.redirect('/login');
            return;
        }

        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            
        });

        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;
