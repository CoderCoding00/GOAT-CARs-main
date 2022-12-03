const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const forumRoutes = require('./forumRoutes');
const merchandiseRoutes = require('./merchandiseRoutes');
const galleryRoutes = require('./galleryRoutes')
const auctionRoutes = require('./auctionRoutes')

router.use('/', homeRoutes)
router.use('/api', apiRoutes);
router.use('/gallery',galleryRoutes)
router.use('/merchandise', merchandiseRoutes);
router.use('/forum', forumRoutes);
router.use('/auction', auctionRoutes)

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;