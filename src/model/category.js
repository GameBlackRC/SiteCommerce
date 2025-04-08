const connection = require('../../dbConnect');
const MysqlService = require('../service/mysqlService');

class Category {
    id
    name
    static service = new MysqlService("Category", ['id', 'name']);

    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    static async getById(id) {
        const data = await Category.service.getById(id);
        const produit = new Category(data.id, data.name);
        return produit;
    }

    static async getAll() {
        const data = await Category.service.getAll();
        return data.map(item => new Category(item.id, item.name));
    }

    static async add(data) {
        const result = await Category.service.add(data);
        const produit = new Category(data.id, data.name);
        return produit;
    }
    static async delete(id) {
        const result = await Category.service.delete(id);
        return result;
    }
    static async updateById(id, body) {
        const result = await Category.service.update(id, body);
        return result;
    }
}

module.exports = Category