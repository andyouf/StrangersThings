const express = require('express');
const tagsRouter = express.Router();

const { getAllTags, getPostsByTagName } = require('../db');
//to get all the tags
tagsRouter.get('/', async (req, res, next) => {
    try {       
        const tags = await getAllTags();
        res.send({ tags });
    } catch({name, message}) {
        next({name, message});
    }
});

//to search the posts by tag name
tagsRouter.get('/:tagName/posts', async (req, res, next) => {
    try {  
        const { tagName } = req.params;
        const allPosts = await getPostsByTagName(tagName);
        // const allPosts = await getAllPosts();
        const posts = allPosts.filter((post) => {
            // the post is active, doesn't matter who it belongs to
            // the post is not active, but it belogs to the current user
            // none of the above are true
            return post.active || (req.user && post.author.id === req.user.id);
        })
        res.send({ posts });
    } catch({name, message}) {
        next({name, message});
    }
});

module.exports = tagsRouter;