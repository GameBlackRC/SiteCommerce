const connection = require('../../dbConnect');

class ProduitService {
    static tableName = "Produit";
    #con
    static tableStruct = ['nom', 'urlImage', 'categorie', 'description', 'prix'];
    constructor() {

    }

    static async getAll() {
        const [result, fields] = await connection.promise().query(
            'SELECT * FROM `' + this.tableName + '`'
        );
        return result;
    }

    static async getById(id) {
        const [result, fields] = await connection.promise().query(
            'SELECT * FROM `' + this.tableName + '` WHERE id=?',
            [id]
        );
        return result[0];
    }

    static async add(data) {
        const tmpListe = this.tableStruct.map(col => `${col}='${data[col]}'`)

        const [result, fields] = await connection.promise().query(
            'INSERT INTO `' + this.tableName + '` (' + this.tableStruct.join(', ') + ') VALUES(' + tmpListe.join(", ") + ')'
        );
        return result;
    }

    static async delete(id) {
        const [result, fields] = await connection.promise().query(
            'DELETE FROM `' + this.tableName + '` WHERE id= ?',
            [id]
        );
        return result;
    }

}

module.exports = ProduitService;