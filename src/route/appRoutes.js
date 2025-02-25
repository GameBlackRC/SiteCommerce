const express = require('express');
const AppController = require('../controller/appController.js');
const CompteController = require('../controller/compteController.js');

const router = express.Router();

router.get("/", AppController.home);
router.get("/produits", AppController.listeProduits);
router.get("/produits/:id", AppController.detailProduit);
router.get("/login", AppController.login);
router.get("/commande", AppController.commande);
router.get("/compte/:id", AppController.compteClient);
router.get("/panier/:id", AppController.panier);
// router.post("/modification", CompteController.modification);

module.exports = router;