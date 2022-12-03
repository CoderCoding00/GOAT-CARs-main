const router = require('express').Router();
// const { Merchandise } = require('../models');
const { Merchandise, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
      // Get all projects and JOIN with user data
      const merchandiseData = await Merchandise.findAll({
        
      });
  
      // Serialize data so the template can read it
      const merchandises = merchandiseData.map((merchandise) => merchandise.get({ plain: true }));
      
      // Pass serialized data and session flag into template
      res.render('merchandise', { 
        merchandises,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/merchandise-buy', withAuth, async (req, res) => {
    try {
        res.render('merchandise-buy', {
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;