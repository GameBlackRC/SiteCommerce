const express = require('express');
const AppController = require('../controller/appController.js');
const ApiController = require('../controller/apiController.js');
const productController = require('../controller/productController.js');

const router = express.Router();

router.get("/", AppController.home);
router.get("/produits", productController.listeProduits);
router.post("/produits", productController.listeProduits);
router.get("/produits/:id", productController.listeProduits);
router.delete("/produits/:id", productController.listeProduits);
router.patch("/produits/:id", productController.listeProduits);
router.get("/login/:login/:password", ApiController.login);
router.get("/commands", ApiController.getAllCommand); //liste produit a check
router.post("/commands/:userID", ApiController.commande); //liste produit a check
router.get("/commands/:id", ApiController.commande);
router.patch("/commands/:id", ApiController.commande);
router.delete("/commands/:id", ApiController.commande);
router.get("/accounts", ApiController.getAllAccount);
router.get("/accounts/:id", ApiController.clientAccount);
router.post("/accounts", ApiController.addClient);
router.delete("/accounts/:id", ApiController.removeClient);
router.patch("/accounts/:id", ApiController.updateClient);
router.post("/test", ApiController.test);
router.get("/paniers", AppController.panier);
router.get("/paniers/:id", AppController.panier);

module.exports = router;