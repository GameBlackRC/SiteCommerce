class Produit {
    id
    nom
    urlImage
    categorie
    description
    prix

    constructor(nom, urlImage, description, statut) {
        this.nom = nom
        this.urlImage = urlImage
        this.description = description
        this.prix = 0
    }

}

module.exports = Produit