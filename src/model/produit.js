const connection = require('../../dbConnect');
const ProduitService = require('../service/produitService');

class Produit {
    id
    nom
    urlImage
    categorie
    description
    prix

    constructor(id, nom, urlImage, description, prix, categorie) {
        this.id = id;
        this.nom = nom;
        this.urlImage = urlImage;
        this.description = description;
        this.prix = prix;
        this.categorie = categorie;
    }

    static async getById(id) {
        const data = await ProduitService.getById(id);
        const produit = new Produit(data.id, data.nom, data.urlImage, data.categorie, data.description, data.prix);
        return produit;
    }

    static async getAll() {
        const data = await ProduitService.getAll();
    }

}

module.exports = Produit