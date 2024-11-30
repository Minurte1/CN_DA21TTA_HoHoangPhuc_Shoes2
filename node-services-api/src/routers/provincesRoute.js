const express = require("express");
const router = express.Router();

const { getProvincesAll } = require("../controllers/provincesController");

router.get("/provinces", getProvincesAll);

module.exports = router;
