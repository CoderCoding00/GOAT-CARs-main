const router = require('express').Router();
const { Car } = require('../../models');
// const withAuth = require('../../utils/auth');

router.get('/', (req,res) => {
    Car.findAll().then((carData) => {
        res.json(carData);
    })
})

// Create a new car
router.post('/', async (req, res) => {
    try {
        const carData = await Car.create({
            year: req.body.year,
            make: req.body.make,
            model: req.body.model,
            value: req.body.value,
            image: req.body.cloudinaryUrl,
            description: req.body.description,
            user_id: req.session.user_id,
        });
        
        res.status(200).json(carData);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.post('/bulk', (req, res) => {
    Car.bulkCreate(req.body)
        .then((newCar) => {
            res.json(newCar);
        })
        .catch((err) => {
            res.json(err);
        });
});

router.delete('/:id', async (req, res) => {
    try {
        const car = Car.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (car) {
            res.status(200).end();
        }  res.status(404).end();
} catch (err) {
            res.status(500).json(err);
    }
})

module.exports = router;
