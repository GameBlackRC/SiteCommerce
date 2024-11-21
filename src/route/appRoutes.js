const express = require('express');
const AppController = require('../controller/appController.js');
const CompteController = require('../controller/compteController.js')

const router = express.Router();

router.get("/", AppController.home);
router.post("/connexion", CompteController.connexion());

module.exports = router;