const connection = require('../../dbConnect');

class CommandeService {
    static tableName = "Commande";
    #con
    static tableStruct = ['id', 'idCompte', 'statut'];
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
    
    static async update(id, data) {
        const tmpListe = Object.keys(data)
        .filter(col => this.tableStruct.includes(col))
        .map(col => `${col}='${data[col]}'`);

        const [results, fields] = await connection.promise().query(
            'UPDATE `' + this.tableName + '` SET ' + tmpListe.join(", ") + ' WHERE id=?',
            [id]
        );
        return results;
    }

    static async add(data) {
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
        return results;
    }

    static async getPanierByCompte(id) {
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

    // static async getCommande(id) {
    //     const [results, fields] = await connection.promise().query(
    //         "SELECT c.id, pr.nom, pr.urlImage, pr.categorie, pr.description, pr.prix, p.nombre FROM `ProduitsCommande` p JOIN `Commande` c ON c.id = p.idCommande JOIN `Produit` pr ON pr.id = p.idProduit WHERE c.id=?",
    //         [id]
    //     );
    //     let panier = [];
    //     results.forEach((result) => {
    //         panier.push({
    //             nom: result.nom,
    //             urlImage: result.urlImage,
    //             description: result.description,
    //             prix: result.prix,
    //             categorie: result.categorie,
    //             nombre: result.nombre
    //         });
    //     })
    //     return panier;
    // }

    static async getCommande(id) {
        const [results] = await connection.promise().query(
            `SELECT pr.id, pr.nom, pr.urlImage, pr.categorie, pr.description, pr.prix, pc.nombre 
             FROM ProduitsCommande pc 
             JOIN Produit pr ON pr.id = pc.idProduit 
             WHERE pc.idCommande = ?`, 
            [id]
        );
    
        return results.map(result => ({
            id: result.id,
            nom: result.nom,
            urlImage: result.urlImage,
            description: result.description,
            prix: result.prix,
            categorie: result.categorie,
            nombre: result.nombre
        }));
    }
}

module.exports = CommandeService;