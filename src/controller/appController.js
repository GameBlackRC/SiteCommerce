const Account = require("../model/account");
const Product = require('../model/product');

class AppController {
    static home(req, res) {
        Account.getById(1).then(account => {
            res.render("home", { title: "Site E-Commerce - Accueil", account: account, prix: account.prixPanier });
        })
    };

    static admin(req, res) {
        res.render("administration", { title: "Site E-Commerce - Administration"});
    };

    static panier(req, res) {
        res.render("panier");
    }
};

module.exports = AppController;