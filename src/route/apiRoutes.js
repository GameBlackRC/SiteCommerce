const express = require('express');
const AppController = require('../controller/appController.js');
const ApiController = require('../controller/apiController.js')

const router = express.Router();

router.get("/", AppController.home);
router.get("/listeProduits", AppController.listeProduits);
router.get("/login", AppController.login);
router.get("/commande/:id", ApiController.commande);
router.get("/compte/:id", ApiController.compteClient);
router.get("/panier/:id", AppController.panier);

module.exports = router;