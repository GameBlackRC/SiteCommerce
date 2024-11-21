const Compte = require("../model/compte");

class AppController {
    static home(req, res) {
        Compte.getById(2).then(compte => {
            compte.remove();
            res.render("home", {title: "Site E-Commerce - Accueil", compte: compte, prix: compte.prixPanier});
        })
    };
    static listeProduits(req, res) {
        res.render("listeProduits");
    };
    static login(req, res) {
        res.render("login");
    };
};

module.exports = AppController;