const router = require('express').Router();
const { Auction } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const newAuction = await Auction.create({
            title: req.body.title,
            description: req.body.descr,
            date_end: req.body.endDate,
            time_end: req.body.endHour,
            starting_bid: req.body.startBid,
            current_bid: req.body.startBid,
            car_id: req.body.car,
            user_id: req.session.user_id,
        });
        res.status(200).json(newAuction);

    }   catch (err) {
        res.status(400).json(err);
    }
})

router.put('/:id', async (req, res) => {
    try {
        const bid = await Auction.update(
            {
                current_bid: req.body.bid
            },
            {
                where: {
                    id: req.params.id,
                },
            },
        );
        res.status(200).json(bid);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const auction = Auction.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (auction) {
            res.status(200).end();
        } res.status(404).end();
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;