const express = require('express');
const app = express();
const studentRoutes = require('./api/routes/student');
const facultys = require('./api/routes/faculty');


app.use('/student', studentRoutes);
app.use('/faculty',facultys);


app.use((req, res, next) => {
    res.status(404).json({
       error: 'Not found'
    })
});
module.exports = app;