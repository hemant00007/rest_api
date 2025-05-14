const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/signup',(req,res,next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err){
            return res.status(500).json({
                error: err
            })
        }else {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                username: req.body.username,
                password: hash,
                phone: req.body.phone,
                email: req.body.email,
                userType: req.body.userType
            })
            user.save()
            .then(result =>{
                res.status(201).json({
                    status: true,
                    message: 'User created successfully',
                })
            })
            .catch(err => {
                res.status(500).json({
                    error:err
                })
            })

        }
    })
})
router.post('/login',(req,res,next) => {
    User.find({username: req.body.username})
    .exec()
    .then(user => {
        if(user.length < 1){
            return res.status(401).json({
                status: false,
                message: 'user not found'
            })
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if(!result){
            
                return res.status(401).json({
                    status: false,
                    message: 'Wrong password'
                })
            }
            if(result){
                const token = jwt.sign({
                    username: user[0].username,
                    userType: user[0].userType,
                    email:user[0].email
                }, 'secret', {
                    expiresIn: '1h'
                })
                return res.status(200).json({
                    status: true,
                    message: 'Login successful',
                    userId: user[0].username,
                    token: token,
                    userType: user[0].userType,
                })
            }
            res.status(401).json({
                status: false,
                message: 'Auth failed'
            })
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
})



module.exports = router;