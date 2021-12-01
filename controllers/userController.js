const router = require('express').Router();
const {UserModel} = require('../models');
const { UniqueConstraintError } = require('sequelize/lib/errors'); 
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

router.get('/test', (req, res) => {
    res.send('Practice test') 
});

router.post('/register', async (req, res) => {

    let {firstName, lastName, email, password} = req.body.user;

    try {
        const User = await UserModel.create({
            firstName,
            lastName,
            email,
            password: bcrypt.hashSync(password, 13),
        });

        let token = jwt.sign({id: User.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

        res.status(201).json({
            message: 'User has been successfully registered.',
            user: User,
            sessionToken: token
        });
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "This email has already been used.",
            });
        } else {
            res.status(500).json({
                message: "Failed to register new user.",
            });
        }
    }
});

router.post('/login', async (req, res) => {

    let {username, password} = req.body.user;

    try {
        let loginUser = await UserModel.findOne({
            where: {
                username: username,
            },
        });

        if (loginUser) {

            let passwordComparison = await bcrypt.compare(password, loginUser.password);
    
          if (passwordComparison) {

    let token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

            res.status(200).json({
              user: loginUser,
              message: "User has been successfully logged in.",
                sessionToken: token
            });
        } else {
                res.status(401).json({
                message: 'Incorrect username/password'
              })
        }
            } else {
                   res.status(401).json({
                   message: 'Incorrect username/password'
                });
            }
    } catch (error) {
        res.status(500).json({
            message: "Failed to log user in"
        })
    }
});


module.exports = router; 