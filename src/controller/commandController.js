const Commande = require('../model/commande');
const Compte = require('../model/compte');
const Produit = require('../model/produit');
const Command = require('../model/command');

class commandController {
    static commande(req, res) {
        res.render("commande");
    }

    static gestionCommandes(req, res) {
        const success = req.query.success;
        const error = req.query.error;

        Command.getAll().then(commands => {
            res.render("gestionCommandes", { title: `Site E-Commerce - Gestion Commandes`, commands: commands, success, error });
        });
    }

    static async detailGestionCommandes(req, res) {
        const id = req.params.id;
        Command.getById(id).then(command => {
            res.render("detailGestionCommandes", { title: `Site E-Commerce - Gestion Commande ${command.id}`, command: command});
        })
    }

    static deleteCommande(req, res) {
        const id = req.params.id;
        Command.delete(id).then(() => {
            res.redirect("/gestion-commandes");
        })
    }

    static updateCommande(req, res) {
        const id = req.params.id;
        const data = { statut : req.body.statut };
        Command.update(id, data).then(() => {
            res.redirect("/gestion-commandes");
        })
    }
}

module.exports = commandController;