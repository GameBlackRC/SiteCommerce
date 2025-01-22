const Commande = require("../model/commande");
const Compte = require("../model/compte");

class ApiController {
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

    static commande(req, res) {
        const id = req.params.id
        Commande.getById(id).then(commande => {
            res.status(200).json(commande)
        })
    }

    static compteClient(req, res) {
        const id = req.params.id
        Compte.getById(id).then(compte => {
            res.status(200).json(compte)
        })
    }

    static panier(req, res) {
        res.render("panier");
    }
};

module.exports = ApiController;