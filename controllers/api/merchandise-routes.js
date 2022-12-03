const router = require('express').Router();
const { Merchandise } = require('../../models');
// const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Merchandise.findAll().then((merchandiseData) => {
        res.json(merchandiseData);
    })
})

router.post('/', (req,res) => {
    Merchandise.bulkCreate(req.body)
        .then((newMerchandise) => {
            res.json(newMerchandise);
        })
        .catch((err) => {
            res.json(err);
        });
});

module.exports = router;