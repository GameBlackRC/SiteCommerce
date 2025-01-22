const CompteService = require('../service/compteService');
const connection = require('./../../dbConnect');
const Commande = require('./commande');
const Produit = require('./produit');
const MD5 = require('crypto-js/md5');

class Compte {
    id;
    login;
    adresseMail;
    password;
    commandes = [];

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

    get commandes() {
        return this.commandes;
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
        const data = await Commande.loadPanier(this);
        this.commandes.push(data);
    }

    get prixPanier() {
        this.commandes.forEach((commande) => {
            if(commande.statut == "panier") return commande.prix;
        })
        return 0;
    }

}

module.exports = Compte