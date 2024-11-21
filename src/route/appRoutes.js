const express = require('express');
const AppController = require('../controller/appController.js');
const CompteController = require('../controller/compteController.js')

const router = express.Router();

router.get("/", AppController.home);
router.get("/listeProduits", AppController.listeProduits);
router.get("/login", AppController.login);

module.exports = router;