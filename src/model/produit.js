const connection = require('../../dbConnect');
const ProduitService = require('../service/produitService');

class Produit {
    id
    nom
    urlImage
    categorie
    description
    prix

    constructor(id, nom, urlImage, categorie, description, prix) {
        this.id = id;
        this.nom = nom;
        this.urlImage = urlImage;
        this.categorie = categorie;
        this.description = description;
        this.prix = prix;

    }

    static async getById(id) {
        console.log('DATA ID ' + id)
        const data = await ProduitService.getById(id);
        const produit = new Produit(data.id, data.nom, data.urlImage, data.categorie, data.description, data.prix);
        return produit;
    }

    static async getAll() {
        const data = await ProduitService.getAll();
        return data.map(item => new Produit(item.id, item.nom, item.urlImage, item.categorie, item.description, item.prix));
    }

    static async add(data) {
        const result = await ProduitService.add(data);
        const produit = new Produit(data.id, data.nom, data.urlImage, data.categorie, data.description, data.prix);
        return produit;
    }
    static async delete(id) {
        const result = await ProduitService.delete(id);
        return result;
    }

    static async update(id, data) {
        const result = await ProduitService.update(id, data);
        return result;
    }
}

module.exports = Produit