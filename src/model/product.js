const connection = require('../../dbConnect');
const MysqlService = require('../service/mysqlService');

class Product {
    id
    nom
    urlImage
    categorie
    description
    prix
    static service = new MysqlService("Produit", ['id', 'nom', 'urlImage', 'categorie', 'description', 'prix']);

    constructor(id, nom, urlImage, categorie, description, prix) {
        this.id = id;
        this.nom = nom;
        this.urlImage = urlImage;
        this.categorie = categorie;
        this.description = description;
        this.prix = prix;
    }

    static async getById(id) {
        const data = await Product.service.getById(id);
        const produit = new Product(data.id, data.nom, data.urlImage, data.categorie, data.description, data.prix);
        return produit;
    }

    static async getAll() {
        const data = await Product.service.getAll();
        return data.map(item => new Product(item.id, item.nom, item.urlImage, item.categorie, item.description, item.prix));
    }

    static async add(data) {
        const result = await Product.service.add(data);
        const produit = new Product(data.id, data.nom, data.urlImage, data.categorie, data.description, data.prix);
        return produit;
    }
    static async delete(id) {
        const result = await Product.service.delete(id);
        return result;
    }
    static async updateById(id, body) {
        const result = await Product.service.update(id, body);
        return result;
    }

}

module.exports = Product