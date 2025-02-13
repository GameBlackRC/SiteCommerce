const Compte = require("../model/compte");
const Produit = require('../model/produit');

class AppController {
    static home(req, res) {
        Compte.getById(1).then(compte => {
            res.render("home", {title: "Site E-Commerce - Accueil", compte: compte, prix: compte.prixPanier});
        })
    };
    static listeProduits(req, res) {
        Produit.getAll().then(produits => {
            res.render("listeProduits", {title: "Site E-Commerce - Produits", produits: produits});
        })
    };
    static login(req, res) {
        res.render("login");
    };

    static commande(req, res) {
        res.render("commande");
    }

    static compteClient(req, res) {
        res.render("compteClient");
    }

    static panier(req, res) {
        res.render("panier");
    }
};

module.exports = AppController;