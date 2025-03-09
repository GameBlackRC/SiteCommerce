const connection = require('./../../dbConnect');
const MD5 = require('crypto-js/md5');

class CompteService {
    static tableName = "Compte";
    #con
    static tableStruct = ['login', 'adresseMail', 'password'];
    constructor() {
    }
    async getAll() {
        const [results, fields] = await this.#con.query(
            'SELECT * FROM `' + this.tableName + '`'
        );
        return results

    }
    static async getById(id) {
        const [results, fields] = await connection.promise().query(
            'SELECT * FROM `' + this.tableName + '` WHERE id=?',
            [id]
        );
        return results[0]

    }
    static async update(id, data) {
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
            return {"sucess": "Mise à jour du compte réussi"};
        } else return error;

    }
    static async add(data) {
        console.log(data);

        const tmpListe = this.tableStruct.map(col => `'${data[col]}'`)

        const [results, fields] = await connection.promise().query(
            'INSERT INTO `' + this.tableName + '` (' + this.tableStruct.join(', ') + ') VALUES(' + tmpListe.join(", ") + ')'
        );
        return results;

    }

    static async delete(id) {
        const [results, fields] = await connection.promise().query(
            'DELETE FROM `' + this.tableName + '` WHERE id=?',
            [id]
        );
        return results

    }
    
    static async login(login, password) {
        const [results, fields] = await connection.promise().query(
            "SELECT * FROM `" + this.tableName + "` WHERE login=? AND password=?",
            [login, password]
        );
        return results;
    }
    static async getPanier(id) {
        const [results, fields] = await connection.promise().query(
            "SELECT c.id, pr.nom, pr.urlImage, pr.categorie, pr.description, pr.prix, p.nombre FROM `ProduitsCommande` p JOIN `Commande` c ON c.id = p.idCommande JOIN `Produit` pr ON pr.id = p.idProduit WHERE c.idCompte=? AND c.statut = 'panier'",
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

module.exports = CompteService;