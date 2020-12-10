const express = require('express');
const postsRouter = express.Router();
const { requireUser } = require('./utils');
const { getAllPosts, createPost, getPostById, updatePost } = require('../db');

//to get all the active posts
postsRouter.get('/', async (req, res, next) => {
    try {
        const allPosts = await getAllPosts();
        const posts = allPosts.filter((post) => {
            // the post is active, doesn't matter who it belongs to
            // the post is not active, but it belogs to the current user
            // none of the above are true
            return post.active || (req.user && post.author.id === req.user.id);
        });
        res.send({ posts });
    } catch({name, message}) {
        next({name, message});
    }
});

//The loggedin user can only add the post 
postsRouter.post('/', requireUser, async (req, res, next) => {
    //to get the title, content and tags from the request body
    const { title, content, tags = '' } = req.body;
    //to get the array of tags
    const tagArr = tags.trim().split(/\s+/);
    //to create post data object 
    const postData = {};
    if(title) {
        postData.title = title;
    }
    if(content) {
        postData.content = content;
    }
    postData.authorId = req.user.id;
    if(tagArr.length) {
        postData.tags = tagArr;
    }
    try {
        const post = await createPost(postData);
        res.send({post});
    } catch({name, message}) {
        next({name, message});
    }
});

//to update the post data 
postsRouter.patch('/:postId', requireUser, async (req, res, next) => {
    const { postId } = req.params;
    const { title, content, tags } = req.body;
    const updateFields = {};
    if (tags && tags.length > 0) {
        updateFields.tags = tags.trim().split(/\s+/);
    }

    if (title) {
        updateFields.title = title;
    }

    if (content) {
        updateFields.content = content;
    }

    try {
        const originalPost = await getPostById(postId);
        //the update is possible only if the author of the post to be updated is the same as the logged in user
        if (originalPost.author.id === req.user.id) {
            const updatedPost = await updatePost(postId, updateFields);
            res.send({ post: updatedPost })
        } else {
            next({
                name: 'UnauthorizedUserError',
                message: 'You cannot update a post that is not yours'
            })
        }
    } catch({name, message}) {
        next({name, message});
    }
    
})

//to delete a post
postsRouter.delete('/:postId', requireUser, async (req, res, next) => {
    const { postId } = req.params;
    try {
        const post = await getPostById(postId);
        //the delete is possible only if the author of the post to be updated is the same as the logged in user
        if(post && post.author.id === req.user.id) {
            const updatedPost = await updatePost(post.id, { active: false });
            res.send({ post: updatedPost });
        } else {
            next(post ? {
                name: "UnauthorizedUserError",
                message: "You cannot delete a post which is not yours"
            } : {
                name: "PostNotFoundError",
                message: "That post does not exist"
            });
        }
    } catch({name, message}) {
        next({name, message});
    }
});

module.exports = postsRouter;