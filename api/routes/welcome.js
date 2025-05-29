const express = require("express");
const router = express.Router();

router.get("/first", (req, res, next) => {
  res.status(200).json({
    status: true,
    msg: "Request success",
  });
});
module.exports = router;
