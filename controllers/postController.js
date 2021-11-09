const { Post } = require("../models");

module.exports = {
    async getPosts (req, res) {
        const data = await Post.findAll({})
        return res.json(data)
    }
}