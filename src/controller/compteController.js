const Compte = require('../model/compte');
const db = require('../dbConnect.js');

class CompteController {
    
    static affiche(req, res) {
        const id = req.params.id;
        Compte.getById(db, id).then(compte => {
            res.render("compteClient", {compte: compte })
        });
    }

    static creationCompte(req, res) {
        Compte.creationCompte(db);
        res.redirect('/panier');
    }

    static loginCompte(req, res) {
        Compte.connexionCompte(db);
        res.redirect("/");
    }
    
    static setLogin(req, res) {
        Compte.modificationCompte(db, id);
        res.redirect(`/compte/${id}`);
    }

    static setAdresseMail(req, res) {
        Compte.setAdresseMail(db, id);
        res.redirect(`/compte/${id}`);
    }
}

module.exports = CompteController;