const express = require('express');
const AppController = require('../controller/appController.js');
const CompteController = require('../controller/compteController.js');
const produitController = require('../controller/produitController.js');
const commandeController = require('../controller/commandeController.js');

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
router.get("/produits", produitController.listeProduits);
router.get("/produits/:id", produitController.detailProduit);
router.get("/login", AppController.login);
router.get("/administration", AppController.admin);
router.get("/commande", commandeController.commande);
router.get("/compte/:id", AppController.compteClient);
router.get("/panier/:id", AppController.panier);
router.get("/sign-up", AppController.signUp);
router.get("/gestion-produits", produitController.gestionProduits);
router.get("/gestion-produits/:id", produitController.detailGestionProduits);
router.post("/gestion-produits", upload.single('urlImage'), produitController.addProduit);
router.delete("/gestion-produits/:id", produitController.deleteProduit);
router.get("/gestion-commandes", commandeController.gestionCommandes);
router.get("/gestion-commandes/:id", commandeController.detailGestionCommandes);
router.post("/gestion-commandes/:id", commandeController.updateCommande);
router.delete("/gestion-commandes/:id", commandeController.deleteCommande);
// router.post("/modification", CompteController.modification);

module.exports = router;