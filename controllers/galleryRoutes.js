const router = require('express').Router();
const {Car} = require('../models');

router.get('/', async (req, res) => {
    try {
      // Get all cars inventory and JOIN with user data
      const carData = await Car.findAll({
      });

      // Serialize cardata so the template can read it
      const cars = carData.map((car) => car.get({ plain: true }));
      
      // Pass serialized data and session into template
      res.render('gallery', { 
        cars, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;