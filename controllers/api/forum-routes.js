const router = require('express').Router();
const {Forum} = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        console.log(req.body);
        const newForum = await Forum.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newForum);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/comment', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            comment: req.body.comment,
            forum_id: req.body.forum,
            user_id: req.session.user_id,
        });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;
