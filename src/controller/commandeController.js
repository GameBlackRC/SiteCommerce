const Commande = require('../model/commande');

class commandeController {
    static commande(req, res) {
        res.render("commande");
    }

    static gestionCommandes(req, res) {
        const success = req.query.success;
        const error = req.query.error;

        Commande.getAll().then(commandes => {
            res.render("gestionCommandes", { title: `Site E-Commerce - Gestion Commandes`, commandes: commandes, success, error });
        });
    }

    static detailGestionCommandes(req, res) {
        const id = req.params.id;
        Commande.getById(id).then(commande => {
            res.render("detailGestionCommandes", { title: `Site E-Commerce - Gestion Commande ${commande.id}`, commande: commande});
        })
    }

    static deleteCommande(req, res) {
        const id = req.params.id;
        Commande.delete(id).then(() => {
            res.redirect("/gestion-commandes");
        })
    }

    static updateCommande(req, res) {
        const id = req.params.id;
        const data = { statut : req.body.statut };
        Commande.update(id, data).then(() => {
            res.redirect("/gestion-commandes");
        })
    }
}

module.exports = commandeController;