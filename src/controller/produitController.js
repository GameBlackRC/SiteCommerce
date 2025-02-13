const Produit = require('../model/produit');

class ProduitController{

    static affiche(req, res) {
        const id = req.params.id;

        Produit.getById(id).then(produit => {
            res.render("detailProduit", { produit });
        })
    }
 
    static afficheAll(req, res) {
        const id = req.params.id;

        Produit.getAll().then( produits => {
            res.render('listeProduits', { produits });
        });
    }
}

module.exports = ProduitController;