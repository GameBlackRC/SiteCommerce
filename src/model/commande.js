const CommandeService = require("../service/commandeService");
const Compte = require("./compte");
const Produit = require("./produit");

class Commande {
    id;
    idCompte;
    statut;
    listProduit = [];

    constructor(id, compte, statut) {
        this.id = id;
        this.idCompte = compte;
        this.statut = statut;
    }

    static async loadPanier(compte) {
        const data = await CommandeService.getPanierByCompte(compte.id);
        const commande = new Commande('panier');
        data.forEach((produit) => {
            commande.listProduit.push({
                data: new Produit(produit.nom, produit.urlImage, produit.description, produit.prix, produit.categorie),
                nombre: produit.nombre           
            })
        })
        return commande;
    }

    static async loadPanierById(compteId) {
        const data = await CommandeService.getPanierByCompte(compteId);
        const commande = new Commande('panier');
        data.forEach((produit) => {
            commande.listProduit.push({
                data: new Produit(produit.nom, produit.urlImage, produit.description, produit.prix, produit.categorie),
                nombre: produit.nombre           
            })
        })
        return commande;
    }

    static async getById(id) {
        const data = await CommandeService.getById(id);
        const commande = new Commande(data.id, data.idCompte, data.statut);
        // await Commande.loadPanierById(1);
        return commande;
    }

    static async getAll() {
        const data = await CommandeService.getAll();
        return data.map(item => new Commande(item.id, item.idCompte, item.statut));
    }

    // static async getCommande(id) {
    //     const data = await CommandeService.getById(id);
    //     const commande = new Commande(data.id, data.compte, data.statut);
    //     console.log(commande);
    //     return commande;
    // }

    static async getCommande(id) {
        const data = await CommandeService.getCommande(id);
        return data.map(item => ({
            nom: item.nom,
            urlImage: item.urlImage,
            description: item.description,
            prix: item.prix,
            categorie: item.categorie,
            nombre: item.nombre
        }));
    }

    static async update(id, data) {
        const result = await CommandeService.update(id, data);
        return result;
    }

    static async delete(id) {
        const result = await CommandeService.delete(id);
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

module.exports = Commande;