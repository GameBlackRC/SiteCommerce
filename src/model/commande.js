const CommandeService = require("../service/commandeService");
const Compte = require("./compte");
const Produit = require("./produit");

class Commande {
    listProduit = [];
    statut;
    compte;

    constructor(compte, statut) {
        this.statut = statut;
        this.compte = compte;
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
        console.log(data);
        const commande = new Commande(1, data.statut);
        await Commande.loadPanierById(1);
        return commande;
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