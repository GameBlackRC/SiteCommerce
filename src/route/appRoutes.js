const express = require('express');
const AppController = require('../controller/appController.js');
const AccountController = require('../controller/accountController.js');
const productController = require('../controller/productController.js');
const commandController = require('../controller/commandController.js');

const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/assets');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const router = express.Router();

router.get("/", AppController.home);
router.get("/produits", productController.listeProduits);
router.get("/produits/:id", productController.detailProduit);
router.get("/login", AppController.login);
router.get("/administration", AppController.admin);
router.get("/commande", commandController.commande);
router.get("/account/:id", AppController.clientAccount);
router.get("/panier/:id", AppController.panier);
router.get("/sign-up", AppController.signUp);
router.get("/gestion-produits", productController.gestionProduits);
router.get("/gestion-produits/:id", productController.detailGestionProduits);
router.post("/gestion-produits", upload.single('urlImage'), productController.addProduit);
router.delete("/gestion-produits/:id", productController.deleteProduit);
router.get("/gestion-commandes", commandController.gestionCommandes);
router.get("/gestion-commandes/:id", commandController.detailGestionCommandes);
router.post("/gestion-commandes/:id", commandController.updateCommande);
router.delete("/gestion-commandes/:id", commandController.deleteCommande);
// router.post("/modification", CompteController.modification);

module.exports = router;