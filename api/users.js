const express = require('express');
const usersRouter = express.Router();
const { getAllUsers, getUserByUsername, createUser, getUserById, updateUser } = require('../db');
require('dotenv').config(); 
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env; 

//to get all the registered users
usersRouter.get('/', async (req, res) => {
    try {
        const users = await getAllUsers();
        res.send({ users });
    } catch({name, message}) {
        next({name, message});
    }
});

//login api
usersRouter.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
    // request must have both
    if (!username || !password) {
        next({
            name: "MissingCredentialsError",
            message: "Please supply both a username and password"
        });
    }
    try {
        const user = await getUserByUsername(username);
    
        if (user && user.password == password) {
            // create token & return to user
            const token = jwt.sign(
                {id: user.id, username}, 
                JWT_SECRET, 
                {expiresIn: '1w'}
            );
             res.send({ message: "you're logged in!", token });
        } else {
            next({ 
                name: 'IncorrectCredentialsError', 
                message: 'Username or password is incorrect'
            });
        }
    } catch({name, message}) {
        next({name, message});
    }
});

//register api
usersRouter.post('/register', async (req, res, next) => {
    const { username, password, name, location } = req.body;
    try {   
        const _user = await getUserByUsername(username);
        //if the user already exists
        if(_user) {
            next({
                name: 'UserExistsError',
                message: 'A user by that username already exists'
            })
        }
        const user = createUser({
            username,
            password,
            name,
            location
        });
        //create a token 
        const token = jwt.sign({
            id: user.id,
            username
        }, JWT_SECRET, {expiresIn: '1w'});
        res.send({ message: "you're logged in!", token });
    } catch({name, message}) {
        next({name, message});
    }
});

//to deactivate the user
usersRouter.delete('/:userId', async (req, res, next) => {
    const { userId } = req.params;
    try {
        const user = await getUserById(userId);
        if(user && user.id === req.user.id) {
            const updatedUser = await updateUser(user.id, { active: false });
            res.send({ user: updatedUser });
        } else {
            next(user ? {
                name: "UnauthorizedUserError",
                message: "You cannot delete a user which is not yours"
            } : {
                name: "UserNotFoundError",
                message: "That user does not exist"
            })
        }
    } catch(error) {
        next(error);
    }
});

module.exports = usersRouter;