const Commande = require("../model/commande");
const Compte = require("../model/compte");
const Produit = require("../model/produit");

class ApiController {
    static home(req, res) {
        Compte.getById(2).then(compte => {
            compte.remove();
            res.render("home", {title: "Site E-Commerce - Accueil", compte: compte, prix: compte.prixPanier});
        })
    };
    
    static listeProduits(req, res) {
        res.render("listeProduits", {title : "Site E-Commerce - Produits"});
    };

    static login(req, res) {
        Compte.testLogin(req.params.login, req.params.password).then(compte => {
            if(compte == null) res.status(200).json({"error": "Nom d'utilisateur ou mot de passe invalide"})
            const testJSON = compte.json();
            res.status(200).json(testJSON);
        })
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

    static addClient(req, res) {
        Compte.add(req.body.login, req.body.password, req.body.adresseMail).then(compte => {
            //compte.creationCompte();
            res.status(200).json({"sucess": "Ajout de compte réussi"});
        })
    }

    static removeClient(req, res) {
        Compte.removeById(req.params.id).then(compte => {
            res.status(200).json({"sucess": "Suppression du compte réussi"});
        })
    }

    static updateClient(req, res) {
        Compte.updateById(req.params.id, req.body).then(result => {
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