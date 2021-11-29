const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Post, User } = require('../models');


router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: { user_id: req.session.user_id },
        });
        
        const posts = postData.map((post) => post.get({ plain: true }));
        
        res.render('all-posts-admin', {
            posts,
            logged_in: req.session.logged_in,
            layout: "dashboard"
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/new', withAuth, (req, res) => {
    res.render('new-post', {
        layout: 'dashboard',
        logged_in: req.session.logged_in,
    });
});

router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
        });

        const post = postData.get({ plain: true });
        
        res.render('edit-post', {
            layout: 'dashboard',
            post,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;