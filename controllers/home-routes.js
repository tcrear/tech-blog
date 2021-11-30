const router = require('express').Router();
const { Post, User, Comment } = require('../models');


router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [User],
        });
        
        const posts = postData.map((post) => post.get({ plain: true }));
        
        res.render('all-posts', {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/posts/:id', async (req, res) => {
  try {
      const postData = await Post.findByPk(req.params.id, {
          include: [
            User,

              {
                  model: Comment,
                  attributes: ['body', 'user_id', 'date_created'],
                  include: [User],
              },
          ],
      });
      
      const post = postData.get({ plain: true });
      res.render('single-post', {
        post,
        logged_in: req.session.logged_in,
    });


  } catch (err) {
      res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/dashboard');
      return;
    }
  
    res.render('login');
  });

  router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/dashboard');
      return;
    }
    res.render('sign-up');
  });

module.exports = router;