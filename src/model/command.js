const MysqlService = require("../service/mysqlService");
const Account = require("./account");
const Produit = require("./product");

class Command {
    id;
    compte;
    statut;
    listProduit = [];
    static service;

    constructor(id, compte, statut) {
        this.id = id;
        this.compte = compte;
        this.statut = statut;
        service = new MysqlService("Commande", ['id', 'idCompte', 'statut']);
    }

    static async loadPanier(compte) {
        const data = await service.getPanierByCompte(compte.id);
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
        const data = await service.getPanierByCompte(compteId);
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
        const data = await service.getById(id);
        const command = new Command(data.id, data.compte, data.statut);
        // await Command.loadPanierById(1);
        return command;
    }

    static async getAll() {
        const data = await service.getAll();
        return data.map(item => new Command(item.id, item.idCompte, item.statut));
    }

    static async update(id, data) {
        const result = await service.update(id, data);
        return result;
    }

    static async delete(id) {
        const result = await service.delete(id);
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