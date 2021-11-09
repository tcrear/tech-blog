const router = require("express").Router();

router.get('/', (req, res) => {
    res.render('homepage')
})
router.get('/profile', (req, res) => {
    res.render('profile')
})

module.exports = router;