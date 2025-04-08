const express = require('express');
const AppController = require('../controller/appController.js');
const ApiController = require('../controller/apiController.js');
const productController = require('../controller/productController.js');
const auth = require('../middleware/auth')
const upload = require('../middleware/multer.js');

const router = express.Router();

router.get("/produits", auth, ApiController.getAllProduct);
router.post("/produits", auth, upload.single('urlImg'), ApiController.addProduct);
router.get("/produits/:id", auth, ApiController.getProduct);
router.delete("/produits/:id", auth, ApiController.deleteProduct);
router.patch("/produits/:id", auth, ApiController.updateProduct);

router.get("/categories/:id", auth, ApiController.getCategory);
router.get("/categories", auth, ApiController.getAllCategories);
router.post("/categories", auth, ApiController.addCategory);
router.delete("/categories/:id", auth, ApiController.deleteCategory);

router.post("/login", ApiController.login);
router.get("/login/:login", ApiController.login);
router.get("/accounts", auth, ApiController.getAllAccount);
router.get("/accounts/:id", auth, ApiController.clientAccount);
router.post("/accounts", ApiController.addAccount);
router.delete("/accounts/:id", auth, ApiController.removeAccount);
router.patch("/accounts/:id", auth, ApiController.updateAccount);

router.get("/commands", auth, ApiController.getAllCommand); //liste produit a check
router.post("/commands/:userID", auth, ApiController.addCommand); //liste produit a check
router.get("/commands/:id", auth, ApiController.commande);
router.post("/commands/:id/products/:idProduct", auth, ApiController.addProductToCommand);
router.delete("/commands/:id/products/:idProduct", auth, ApiController.removeProductToCommand);
router.patch("/commands/:id/products/:idProduct", auth, ApiController.editNumberProductToCommand);
router.patch("/commands/:id", auth, ApiController.editCommand);
router.delete("/commands/:id", auth, ApiController.deleteCommand);

module.exports = router;