const Compte = require("../model/compte");
const Produit = require('../model/produit');

class AppController {
    static home(req, res) {
        Compte.getById(1).then(compte => {
            res.render("home", { title: "Site E-Commerce - Accueil", compte: compte, prix: compte.prixPanier });
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

    static compteClient(req, res) {
        const id = req.params.id;
        Compte.getById(id).then(compte => {
            res.render("compteClient", { compte: compte })
        });
    }
};

module.exports = AppController;