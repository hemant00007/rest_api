const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    status: 200,
    msg: "this is dashboard page",
    time: "Time is 12:42 pm",
  });
});
module.exports = router;
