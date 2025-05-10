const express = require('express');
const router = express.Router();

router.get('/',(req,res,next) => {
res.status(200).json({
    message: 'This is the student get route',
})
})

router.post('/',(req,res,next) => {
    res.status(200).json({
        message: 'This is the student post ',
        body: req.body
    })
})
module.exports = router;
