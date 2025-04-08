const MysqlService = require("../service/mysqlService");
const Account = require("./account");
const Produit = require("./product");

class Command {
    id;
    statut;
    listProduct = [];
    static service = new MysqlService("Command", ['id', 'idAccount', 'statut']);

    constructor(id, statut) {
        this.id = id;
        this.statut = statut;
    }

    static async loadCart(account) {
        const data = await Command.service.getCart(account.id);
        const command = new Command('panier');
        data.forEach((product) => {
            command.listProduct.push({
                data: new Produit(product.name, product.urlImg, product.description, product.price, product.category),
                quantity: product.quantity           
            })
        })
        return command;
    }

    static async loadPanierById(idAccount) {
        const data = await Command.service.getCart(idAccount);
        const command = new Command('panier');
        data.forEach((product) => {
            command.listProduct.push({
                data: new Produit(product.name, product.urlImg, product.description, product.price, product.category),
                quantity: product.quantity           
            })
        })
        return command;
    }

    static async getById(id) {
        const data = await Command.service.getById(id);
        console.log(data);
        const command = new Command(data.id, data.statut);
        // await Command.loadPanierById(1);
        return command;
    }


    static async getAll() {
        const data = await Command.service.getAll();
            
        const commands = await Promise.all(
            data.map(async (item) => {
            const command = new Command(item.id, item.statut);
            const products = await Command.service.getCommand(item.id);
    
            products.forEach((product) => {
                command.listProduct.push({
                    data: new Produit(product.id, product.name, product.urlImg, product.description, product.price, product.idCategory),
                    quantity: product.quantity
                });
            });
    
            return command;
        }));
    
        return commands;
    }
    

    async addProduct(idProduct, quantity) {
        const result = await Command.service.addProductToCommand(this.id, idProduct, quantity);
        return result;
    }

    async removeProduct(idProduct) {
        const result = await Command.service.removeProductToCommand(this.id, idProduct);
        return result;
    }

    async editNumberProduct(idProduct, number) {
        const result = await Command.service.editNumberProductToCommand(this.id, idProduct, number);
        return result;
    }

    static async add(idUser) {
        const result = await Command.service.add({
            idCompte: idUser,
        })
        const command = new Command(result.insertId, "cart");
        return command;
    }

    static async update(id, data) {
        const result = await Command.service.update(id, data);
        return result;
    }

    static async delete(id) {
        const result = await Command.service.delete(id);
        return result;
    }

    get price() {
        let total = 0;
        this.listProduct.forEach((product) => {
            total += (product.data.price)*product.quantity;
        })
        return total;
    }

}

module.exports = Command;