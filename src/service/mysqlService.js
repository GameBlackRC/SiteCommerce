const connection = require('../../dbConnect');
const MD5 = require('crypto-js/md5');

class MysqlService {
    tableName;
    tableStruct;
    constructor(tableName, tableStruct) {
        this.tableName = tableName;
        this.tableStruct = tableStruct;
    }
    async getAll() {
        const [results, fields] = await connection.promise().query(
            'SELECT * FROM `' + this.tableName + '`'
        );
        return results

    }
    async getById(id) {
        const [results, fields] = await connection.promise().query(
            'SELECT * FROM `' + this.tableName + '` WHERE id=?',
            [id]
        );
        return results[0]

    }
    async update(id, data) {
        let tmpListe = [];
        let error;
        const tableStruct = this.tableStruct;
        Object.keys(data).forEach(key => {
            if(tableStruct.includes(key)) {
                if(key == "password") tmpListe.push(`${key}='${MD5(data[key]).toString()}'`);
                else tmpListe.push(`${key}='${data[key]}'`);
            } else {
                error = {"error": "Un champ n'est pas nommé correctement"}
            }
        });
        if(error == undefined) {
            const [results, fields] = await connection.promise().query(
                'UPDATE `' + this.tableName + '` SET ' + tmpListe.join(", ") + ' WHERE id=?',
                [id]
            );
            return {"sucess": "Mise à jour réussi"};
        } else return error;

    }
    async add(data) {
        console.log(data);

        const tmpListe = this.tableStruct.filter(col => data[col] != undefined).map(col => `'${data[col]}'`);
        const tableStruct = this.tableStruct.filter(col => data[col] != undefined);

        const [results, fields] = await connection.promise().query(
            'INSERT INTO `' + this.tableName + '` (' + tableStruct.join(', ') + ') VALUES(' + tmpListe.join(", ") + ')'
        );
        return results;

    }

    async delete(id) {
        const [results, fields] = await connection.promise().query(
            'DELETE FROM `' + this.tableName + '` WHERE id=?',
            [id]
        );
        return results

    }
    
    async login(login, password) {
        console.log(login, password);
        const [results, fields] = await connection.promise().query(
            "SELECT * FROM `" + this.tableName + "` WHERE mail=? AND password=?",
            [login, MD5(password).toString()]
        );
        return results;
    }
    async getCart(id) {
        const [results, fields] = await connection.promise().query(
            "SELECT c.id, pr.name, pr.urlImg, pr.idCategory, pr.description, pr.price, p.quantity FROM `ProductCommand` p JOIN `Command` c ON c.id = p.idCommand JOIN `Product` pr ON pr.id = p.idProduct WHERE c.idAccount=? AND c.statut = 'panier'",
            [id]
        );
        let cart = [];
        results.forEach((result) => {
            cart.push({
                name: result.nom,
                urlImg: result.urlImg,
                description: result.description,
                price: result.price,
                category: result.idCategory,
                quantity: result.quantity
            });
        })
        return cart;
    }

    async getCommand(id) {
        const [results, fields] = await connection.promise().query(
            "SELECT c.id, pr.id, pr.name, pr.urlImg, pr.idCategory, pr.description, pr.price, p.quantity FROM `ProductCommand` p JOIN `Command` c ON c.id = p.idCommand JOIN `Product` pr ON pr.id = p.idProduct WHERE c.id=?",
            [id]
        );
        let panier = [];
        results.forEach((result) => {
            panier.push({
                id: result.id,
                name: result.name,
                urlImg: result.urlImg,
                description: result.description,
                price: result.price,
                category: result.idCategory,
                quantity: result.quantity
            });
        })
        return panier;
    }

    async addProductToCommand(idCommand, idProduct, quantity) {
        const [results, fields] = await connection.promise().query(
            'INSERT INTO `ProductCommand` (idCommand, idProduct, quantity) VALUES(?, ?, ?)',
            [idCommand, idProduct, quantity]
        );
        return results;
    }

    async removeProductToCommand(idCommand, idProduct) {
        const [results, fields] = await connection.promise().query(
            'DELETE FROM `ProductCommand` WHERE idCommand=? AND idProduct=?',
            [idCommand, idProduct]
        );
        return results;
    }

    async editNumberProductToCommand(idCommand, idProduct, quantity) {
        const [results, fields] = await connection.promise().query(
            'UPDATE `ProductCommand` SET quantity=? WHERE idCommand=? AND idProduct=?',
            [quantity, idCommand, idProduct]
        );
        return results;
    }

}

module.exports = MysqlService;