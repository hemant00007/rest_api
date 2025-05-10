const express = require('express');
const router = express.Router();

router.get('/',(req,res,next) => {
res.status(200).json({
    message: 'This is the faculty  get route',
})
});

router.post('/',(req,res,next) => {
    res.status(200).json({
        message: 'This is the faculty post ',
        body: req.body
    })
});
module.exports = router;
