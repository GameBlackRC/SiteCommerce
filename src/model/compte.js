const CompteService = require('../service/compteService');
const connection = require('./../../dbConnect');
const Produit = require('./produit');
const MD5 = require('crypto-js/md5');

class Compte {
    id;
    login;
    adresseMail;
    password;
    panier = [];

    constructor(id, login, password, adresseMail) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.adresseMail = adresseMail;
    }

    getById(db) {
        const sql = 'SELECT * FROM user WHERE id=?'+ id;
    }

    creationCompte(db) {

    }

    connexionCompte(db, id) {

        const sql = 'SELECT * FROM user WHERE id=?' + id;
        db.connection.query(sql, (error) => {
            if(error) throw error;
        })
        db.connection.end();
        
    }

    setLogin(db, login) {
        const sql = 'UPDATE user SET login = '+ login + ' WHERE id=?'+ id;

        db.connection.query(sql, (error) => {
            if(error) throw error;
        })
        db.connection.end();
        
    }

    setAdresseMail(db, adresseMail) {
        const sql = 'UPDATE user SET email = '+ adresseMail +' WHERE id=?'+ id;

        db.connection.query(sql, (error) => {
            if(error) throw error;
        })
        db.connection.end();
    }
    get login() {
        return this.login;
    }

    get adresseMail() {
        return this.adresseMail;
    }

    get password() {
        return this.password;
    }

    get panier() {
        return this.panier;
    }

    async remove() {
        await CompteService.delete(this.id);
        delete this;
    }

    static async add(login, password, adresseMail) {
        const result = await CompteService.add({
            login: login,
            password: MD5(password).toString(),
            adresseMail: adresseMail
        })
        const compte = new Compte(result.insertId, login, MD5(password).toString(), adresseMail);
        return compte;
    }

    static async removeById(id) {
        const data = await CompteService.delete(id);
    }

    static async getById(id) {
        const data = await CompteService.getById(id);
        const compte = new Compte(data.id, data.login, data.password, data.adresseMail);
        await compte.loadPanier();
        return compte;
    }

    async loadPanier() {
        const data = await CompteService.getPanier(this.id);
        data.forEach((produit) => {
            this.panier.push(new Produit(produit.nom, produit.urlImage, produit.description, produit.prix, produit.categorie))
        })
    }

    get prixPanier() {
        let total = 0;
        this.panier.forEach((produit) => {
            total += produit.prix;
        })
        return total;
    }

}

module.exports = Compte