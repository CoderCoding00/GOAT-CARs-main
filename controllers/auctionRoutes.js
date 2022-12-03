const router = require('express').Router();
const { User, Car, Auction } = require('../models');
// const io = require('../socket');
const withAuth = require('../utils/auth');

// Auction routes
router.get('/', async (req, res) => {
    try {


        const auctionData = await Auction.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Car,
                    attributes: [
                        'year',
                        'make',
                        'model',
                        'image'
                    ]
                },
            ]
        })
        const auctions = auctionData.map((auction) => auction.get({ plain: true }))
        res.render("auction", {
            auctions,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/new-auction', withAuth, async (req,res) => {
    try {
        const carData = await Car.findAll({
            where: { user_id: req.session.user_id },
        });
        const cars = carData.map((car) => car.get({ plain: true}))

        res.render('auction-new-post', {
            cars,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/bid/:id', withAuth, async (req,res) => {
    try {
        const auctionData = await Auction.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Car,
                    attributes: [
                        'year',
                        'make',
                        'model',
                        'value',
                        'image',
                    ],  
                },
            ],
        });
        const auction = auctionData.get({plain: true});
        
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password']},
        });

        const user = userData.get({ plain: true });

        res.render('auction-bid', {
            ...user,
            auction,
            logged_in: req.session.logged_in
        }) 
        
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;
