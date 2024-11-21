const express = require('express');
const AppController = require('../controller/appController.js');

const router = express.Router();

router.get("/", AppController.home);

module.exports = router;