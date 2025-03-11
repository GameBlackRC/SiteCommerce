const Commande = require('../model/commande');
const Compte = require('../model/compte');
const Produit = require('../model/produit');

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

    static async detailGestionCommandes(req, res) {
        const id = req.params.id;

        const commande = await Commande.getById(id);
        const compte = await Compte.getById(commande.idCompte);
        const produitsCommande = await Commande.getCommande(id);

        commande.listProduit = produitsCommande.map(data => ({
            produit: new Produit(data.id, data.nom, data.urlImage, data.categorie, data.description, data.prix),
            nombre: data.nombre
        }));

        res.render("detailGestionCommandes", {
            title: `Site E-Commerce - Gestion Commande ${commande.id}`,
            commande: commande,
            compte: compte
        });
        // Commande.getCommande(id).then(commande => {
        //     res.render("detailGestionCommandes", { title: `Site E-Commerce - Gestion Commande ${commande.id}`, commande: commande});
        // })
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