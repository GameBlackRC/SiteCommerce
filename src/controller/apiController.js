const Account = require("../model/account");
const Product = require("../model/product");
const Command = require("../model/command");

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
        Account.testLogin(req.params.login, req.params.password).then(account => {
            if(account == null) res.status(200).json({"error": "Nom d'utilisateur ou mot de passe invalide"})
            const testJSON = account.json();
            res.status(200).json(testJSON);
        })
    };

    static commande(req, res) {
        const id = req.params.id
        Command.getById(id).then(commande => {
            res.status(200).json(commande)
        })
    }

    static addCommand(req, res) {
        Command.add(req.params.userID).then(command => {
            //account.creationAccount();
            res.status(200).json({"sucess": "Ajout de commande réussi"});
        })
    }

    static getAllCommand(req, res) {
        Command.getAll().then(commands => {
            res.status(200).json(commands);
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

    static addClient(req, res) {
        Account.add(req.body.login, req.body.password, req.body.adresseMail).then(account => {
            //account.creationAccount();
            res.status(200).json({"sucess": "Ajout de compte réussi"});
        })
    }

    static removeClient(req, res) {
        Account.removeById(req.params.id).then(account => {
            res.status(200).json({"sucess": "Suppression du compte réussi"});
        })
    }

    static updateClient(req, res) {
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