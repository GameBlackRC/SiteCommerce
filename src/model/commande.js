const CommandeService = require("../service/commandeService");
const Produit = require("./produit");

class Commande {
    listProduit = []
    statut

    constructor(statut) {
        statut = statut;
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

    get prix() {
        let total = 0;
        this.listProduit.forEach((produit) => {
            total += (produit.data.prix)*produit.nombre;
        })
        return total;
    }

}

module.exports = Commande;