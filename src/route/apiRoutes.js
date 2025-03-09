const express = require('express');
const AppController = require('../controller/appController.js');
const ApiController = require('../controller/apiController.js');
const produitController = require('../controller/produitController.js');

const router = express.Router();

router.get("/", AppController.home);
router.get("/produits", produitController.listeProduits);
router.get("/login/:login/:password", ApiController.login);
router.get("/commande/:id", ApiController.commande);
router.get("/compte/:id", ApiController.compteClient);
router.post("/compte", ApiController.addClient);
router.delete("/compte/:id", ApiController.removeClient);
router.patch("/compte/:id", ApiController.updateClient);
router.post("/test", ApiController.test);
router.get("/panier/:id", AppController.panier);

module.exports = router;