const connection = require('../../dbConnect');
const MysqlService = require('../service/mysqlService');

class Product {
    id
    nom
    urlImage
    categorie
    description
    prix
    static service;

    constructor(id, nom, urlImage, categorie, description, prix) {
        this.id = id;
        this.nom = nom;
        this.urlImage = urlImage;
        this.categorie = categorie;
        this.description = description;
        this.prix = prix;
        service = new MysqlService("Produit", ['id', 'nom', 'urlImage', 'categorie', 'description', 'prix']);
    }

    static async getById(id) {
        const data = await service.getById(id);
        const produit = new Product(data.id, data.nom, data.urlImage, data.categorie, data.description, data.prix);
        return produit;
    }

    static async getAll() {
        const data = await service.getAll();
        return data.map(item => new Product(item.id, item.nom, item.urlImage, item.categorie, item.description, item.prix));
    }

    static async add(data) {
        const result = await service.add(data);
        const produit = new Product(data.id, data.nom, data.urlImage, data.categorie, data.description, data.prix);
        return produit;
    }
    static async delete(id) {
        const result = await service.delete(id);
        return result;
    }

}

module.exports = Product