const connection = require('./../../dbConnect');

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
    async update(id, data) {
        const tmpListe = this.tableStruct.map(col => `${col}='${data[col]}'`)

        const [results, fields] = await connection.query(
            'UPDATE `' + this.tableName + '` SET ' + tmpListe.join(", ") + ' WHERE id=?',
            [id]
        );

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
    static async getPanier(id) {
        const [results, fields] = await connection.promise().query(
            "SELECT c.id, pr.nom, pr.urlImage, pr.categorie, pr.description, pr.prix, p.nombre FROM `ProduitsCommande` p JOIN `Commande` c ON c.id = p.idCommande JOIN `Produit` pr ON pr.id = p.idProduit WHERE c.idCompte=? AND c.statut = 'panier'",
            [id]
        );
        let panier = [];
        results.forEach((result) => {
            for (var i = 0; i < result.nombre; i++) panier.push({
                nom: result.nom,
                urlImage: result.urlImage,
                description: result.description,
                prix: result.prix,
                categorie: result.categorie
            });
        })
        return panier;
    }

}

module.exports = CompteService;