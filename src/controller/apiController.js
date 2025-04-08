const Account = require("../model/account");
const Product = require("../model/product");
const Command = require("../model/command");
const Category = require("../model/category");
const MD5 = require('crypto-js/md5');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

class ApiController {
    static home(req, res) {
        Account.getById(2).then(account => {
            account.remove();
            res.render("home", {title: "Site E-Commerce - Accueil", account: account, prix: account.prixPanier});
        })
    };
    
    static listeProduits(req, res) {
        res.render("listeProduits", {title : "Site E-Commerce - Produits"});
    };

    static login(req, res) {
        if (req.body.name == "test" && req.body.mdp == "test") {
            const token = jwt.sign({ user: 'test' }, 'ma super clé');
            res.status(200).json({
                token
            })
        }
        else {
            res.status(401).json({
                err: "Utilisateur ou mot de passe incorrect"
            })
        }
    }

    static commande(req, res) {
        const id = req.params.id
        Command.getById(id).then(commande => {
            res.status(200).json(commande)
        })
    }

    static addProductToCommand(req, res) {
        Command.getById(req.params.id).then(command => {
            command.addProduct(req.params.idProduct, req.body.number).then(result => {
                if(result == null) return res.status(400).json({"err": "Erreur lors de l'ajout du produit"});
                else if(result['err'] != undefined) return res.status(400).json({"err": result['err']});
                res.status(200).json(result);
            })
        })
    }

    static removeProductToCommand(req, res) {
        Command.getById(req.params.id).then(command => {
            command.removeProduct(req.params.idProduct).then(result => {
                if(result == null) return res.status(400).json({"err": "Erreur lors de la suppression du produit"});
                else if(result['err'] != undefined) return res.status(400).json({"err": result['err']});
                res.status(200).json(result);
            })
        })
    }

    static editNumberProductToCommand(req, res) {
        Command.getById(req.params.id).then(command => {
            command.editNumberProduct(req.params.idProduct, req.body.number).then(result => {
                if(result == null) return res.status(400).json({"err": "Erreur lors de l'édition du produit"});
                else if(result['err'] != undefined) return res.status(400).json({"err": result['err']});
                res.status(200).json(result);
            })
        })
    }

    static addCommand(req, res) {
        Command.add(req.params.userID).then(command => {
            //account.creationAccount();
            res.status(200).json({"sucess": "Ajout de commande réussi"});
        })
    }

    static removeCommand(req, res) {
        Command.delete(req.params.id).then(command => {
            res.status(200).json({"sucess": "Suppression de la commande réussi"});
        })
    }

    static editCommand(req, res) {
        Command.update(req.params.id, req.body).then(result => {
            res.status(200).json(result);
        })
    }

    static deleteCommand(req, res) {
        Command.delete(req.params.id).then(result => {
            res.status(200).json(result);
        })
    }

    static getAllCommand(req, res) {
        Command.getAll().then(commands => {
            res.status(200).json(commands);
        })
    }

    static getProduct(req, res) {
        Product.getById(req.params.id).then(product => {
            return Category.getById(product.idCategory).then(category => {
                product.category = category;
                res.status(200).json(product);
            });
        });
    }
    

    static getAllProduct(req, res) {
        Product.getAll().then(products => {
            const productsWithCategory = products.map(async (product) => {
                const category = await Category.getById(product.idCategory);
                product.category = category;
                return product;
            });

            Promise.all(productsWithCategory).then(productsWithCategory => {
                res.status(200).json(productsWithCategory);
            })
        });
    }

    static addProduct(req, res) {
        Product.add(req.body).then(product => {
            res.status(200).json(product);
        })
    }

    static updateProduct(req, res) {
        Product.updateById(req.params.id, req.body).then(product => {
            res.status(200).json(product);
        })
    }

    static deleteProduct(req, res) {
        Product.delete(req.params.id).then(product => {
            res.status(200).json(product);
        })
    }

    static getCategory(req, res) {
        Category.getById(req.params.id).then(category => {
            res.status(200).json(category);
        })
    }

    static getAllCategories(req, res) {
        Category.getAll().then(categories => {
            res.status(200).json(categories);
        })
    }

    static addCategory(req, res) {
        Category.add(req.body).then(category => {
            res.status(200).json(category);
        })
    }

    static updateCategory(req, res) {
        Category.updateById(req.params.id, req.body).then(category => {
            res.status(200).json(category);
        })
    }

    static deleteCategory(req, res) {
        Category.delete(req.params.id).then(category => {
            res.status(200).json(category);
        })
    }

    static clientAccount(req, res) {
        const id = req.params.id
        Account.getById(id).then(account => {
            res.status(200).json(account)
        })
    }

    static getAllAccount(req, res) {
        Account.getAll().then(accounts => {
            res.status(200).json(accounts)
        })
    }

    static addAccount(req, res) {
        Account.add(req.body.login, req.body.password, req.body.mail).then(account => {
            //account.creationAccount();
            res.status(200).json({"sucess": "Ajout de compte réussi"});
        })
    }

    static removeAccount(req, res) {
        Account.removeById(req.params.id).then(account => {
            res.status(200).json({"sucess": "Suppression du compte réussi"});
        })
    }

    static updateAccount(req, res) {
        Account.updateById(req.params.id, req.body).then(result => {
            res.status(200).json(result);
        })
    }

    static panier(req, res) {
        res.render("panier");
    }

    static test(req, res) {
        console.log(req.body);
        res.status(200).json({"test":"t"});
    }
};

module.exports = ApiController;