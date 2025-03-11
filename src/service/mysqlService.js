const connection = require('../../dbConnect');
const MD5 = require('crypto-js/md5');

class MysqlService {
    tableName;
    #con
    tableStruct;
    constructor(tableName, tableStruct) {
        this.tableName = tableName;
        this.tableStruct = tableStruct;
    }
    async getAll() {
        const [results, fields] = await this.#con.query(
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

        const tmpListe = this.tableStruct.map(col => `'${data[col]}'`)

        const [results, fields] = await connection.promise().query(
            'INSERT INTO `' + this.tableName + '` (' + this.tableStruct.join(', ') + ') VALUES(' + tmpListe.join(", ") + ')'
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
        const [results, fields] = await connection.promise().query(
            "SELECT * FROM `" + this.tableName + "` WHERE login=? AND password=?",
            [login, password]
        );
        return results;
    }
    async getCart(id) {
        const [results, fields] = await connection.promise().query(
            "SELECT c.id, pr.nom, pr.urlImage, pr.categorie, pr.description, pr.prix, p.nombre FROM `ProduitsCommande` p JOIN `Command` c ON c.id = p.idCommande JOIN `Produit` pr ON pr.id = p.idProduit WHERE c.idCompte=? AND c.statut = 'panier'",
            [id]
        );
        let cart = [];
        results.forEach((result) => {
            cart.push({
                nom: result.nom,
                urlImage: result.urlImage,
                description: result.description,
                prix: result.prix,
                categorie: result.categorie,
                nombre: result.nombre
            });
        })
        return cart;
    }

    static async getCommand(id) {
        const [results, fields] = await connection.promise().query(
            "SELECT c.id, pr.nom, pr.urlImage, pr.categorie, pr.description, pr.prix, p.nombre FROM `ProduitsCommande` p JOIN `Command` c ON c.id = p.idCommande JOIN `Produit` pr ON pr.id = p.idProduit WHERE c.id=?",
            [id]
        );
        let panier = [];
        results.forEach((result) => {
            panier.push({
                nom: result.nom,
                urlImage: result.urlImage,
                description: result.description,
                prix: result.prix,
                categorie: result.categorie,
                nombre: result.nombre
            });
        })
        return panier;
    }

}

module.exports = MysqlService;