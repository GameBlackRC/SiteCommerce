const MysqlService = require("../service/mysqlService");
const Account = require("./account");
const Produit = require("./product");

class Command {
    id;
    compte;
    statut;
    listProduit = [];
    static service = new MysqlService("Command", ['id', 'idCompte', 'statut']);

    constructor(id, compte, statut) {
        this.id = id;
        this.compte = compte;
        this.statut = statut;
    }

    static async loadCart(compte) {
        const data = await Command.service.getCart(compte.id);
        const command = new Command('panier');
        data.forEach((produit) => {
            command.listProduit.push({
                data: new Produit(produit.nom, produit.urlImage, produit.description, produit.prix, produit.categorie),
                nombre: produit.nombre           
            })
        })
        return command;
    }

    static async loadPanierById(compteId) {
        const data = await Command.service.getCart(compteId);
        const command = new Command('panier');
        data.forEach((produit) => {
            command.listProduit.push({
                data: new Produit(produit.nom, produit.urlImage, produit.description, produit.prix, produit.categorie),
                nombre: produit.nombre           
            })
        })
        return command;
    }

    static async getById(id) {
        const data = await Command.service.getById(id);
        const command = new Command(data.id, data.compte, data.statut);
        // await Command.loadPanierById(1);
        return command;
    }

    static async getAll() {
        const data = await Command.service.getAll();
        return data.map(item => new Command(item.id, item.idCompte, item.statut));
    }

    static async add(idUser) {
        const result = await Command.service.add({
            idCompte: idUser,
        })
        const user = await Account.getById(idUser);
        const command = new Command(result.insertId, user, "cart");
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

    get prix() {
        let total = 0;
        this.listProduit.forEach((produit) => {
            total += (produit.data.prix)*produit.nombre;
        })
        return total;
    }

}

module.exports = Command;