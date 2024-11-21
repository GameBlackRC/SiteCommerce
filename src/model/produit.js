class Produit {
    nom
    urlImage
    categorie
    description
    prix

    constructor(nom, urlImage, description, prix, categorie) {
        this.nom = nom;
        this.urlImage = urlImage;
        this.description = description;
        this.prix = prix;
        this.categorie = categorie;
    }

}

module.exports = Produit