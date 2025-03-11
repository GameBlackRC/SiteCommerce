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

    static login(req, res) {
        res.render("login");
    };

    static signUp(req, res) {
        res.render("signUp");
    }

    static panier(req, res) {
        res.render("panier");
    }

    static clientAccount(req, res) {
        const id = req.params.id;
        Account.getById(id).then(account => {
            res.render("account", { account: account })
        });
    }
};

module.exports = AppController;