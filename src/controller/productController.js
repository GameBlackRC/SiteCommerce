const Product = require('../model/product');

class productController {
    static listeProduits(req, res) {
        Product.getAll().then(produits => {
            res.render('listeProduits', { title: "Site E-Commerce - Produits", produits: produits });
        })
    };

    static detailProduit(req, res) {
        const id = req.params.id;
        Product.getById(id).then(produit => {
            res.render("detailProduit", { title: `Site E-Commerce - Détails Produit ${produit.nom}`, produit: produit });
        })
    };

    static gestionProduits(req, res) {
        const success = req.query.success;
        const error = req.query.error;

        Product.getAll().then(produits => {
            res.render("gestionProduits", { title: `Site E-Commerce - Gestion Produits`, produits: produits, success, error });
        });
    }
    
    static detailGestionProduits(req, res) {
        const id = req.params.id;
        Product.getById(id).then(produit => {
            res.render("detailGestionProduits", { title: `Site E-Commerce - Gestion Produits ${produit.nom}`, produit: produit });
        });
    }

    static addProduit(req, res) {
        try {
            const data = {
                nom: req.body.nom,
                urlImage: req.file ? `/assets/${req.file.filename}` : null,
                categorie: req.body.categorie,
                description: req.body.description,
                prix: req.body.prix
            };

            Product.add(data).then(() => {
                res.redirect("/gestion-produits?sucess=Produit ajouté avec succès.");
            });

        } catch (error) {
            console.error(error);
            res.redirect("/gestion-produits?error=Erreur lors de l'ajout du produit.")
        }
    }

    static deleteProduit(req, res) {
        const id = req.params.id;
        Produit.delete(id).then(() => {
            res.redirect("/gestion-produits");
        })
    }

    static updateProduit(req, res) {
        const id = req.body.id;
        const data = {
            id: req.body.id,
            nom: req.body.nom,
            urlImage: req.file ? `/assets/${req.file.filename}` : null,
            categorie: req.body.categorie,
            description: req.body.description,
            prix: req.body.prix
        };

        Produit.update(id, data).then(() => {
            res.redirect(`/gestion-produits`);
        })
    }
}

module.exports = productController;