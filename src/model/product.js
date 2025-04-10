const connection = require('../../dbConnect');
const MysqlService = require('../service/mysqlService');
const Category = require('./category');

class Product {
    id
    name
    urlImg
    idCategory
    description
    price
    static service = new MysqlService("Product", ['id', 'name', 'urlImg', 'idCategory', 'description', 'price']);

    constructor(id, name, urlImg, idCategory, description, price) {
        this.id = id;
        this.name = name;
        this.urlImg = urlImg;
        this.idCategory = idCategory;
        this.description = description;
        this.price = price;
    }

    json() {
        return {
            id: this.id,
            name: this.name,
            urlImg: this.urlImg,
            idCategory: this.idCategory,
            description: this.description,
            price: this.price
        }
    }

    static async getById(id) {
        const data = await Product.service.getById(id);
        const product = new Product(data.id, data.name, data.urlImg, data.idCategory, data.description, data.price);
        
        const category = await Category.getById(data.idCategory);
        product.category = category;

        return product;
    }

    static async getAll() {
        const data = await Product.service.getAll();
        const products = await Promise.all(data.map(async (item) => {
            const product = new Product(item.id, item.name, item.urlImg, item.idCategory, item.description, item.price);
            
            const category = await Category.getById(item.idCategory);
            product.category = category;
    
            return product;
        }));
    
        return products;
    }
    
    static async add(data) {
        const result = await Product.service.add(data);
        const produit = new Product(data.id, data.name, data.urlImg, data.idCategory, data.description, data.price);
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

    static async update(id, data) {
        const result = await Product.service.update(id, data);
        return result;
    }
}

module.exports = Product