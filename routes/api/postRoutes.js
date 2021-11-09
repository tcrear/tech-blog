const router = require("express").Router();

const {
    getPosts
} = require('../../controllers/postController');

router.route('/').get(getPosts)

module.exports = router