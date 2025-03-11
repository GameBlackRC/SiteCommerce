const Command = require('./command');
const Produit = require('./product');
const MD5 = require('crypto-js/md5');
const MysqlService = require('../service/mysqlService');

class Account {
    id;
    login;
    mail;
    password;
    commands = [];
    static service = new MysqlService("Account", ['login', 'mail', 'password']);

    constructor(id, login, password, mail) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.mail = mail;
    }

    json() {
        return {
            "id": this.id,
            "login": this.login,
            "mail": this.mail
        }
    }

    loadById(db) {
        const sql = 'SELECT * FROM user WHERE id=?'+ id;
    }

    creationAccount() {
        Account.service.add({
            login: this.login,
            mail: this.mail,
            password: this.password
        })
    }

    loginAccount(db, id) {

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

    setMail(db, mail) {
        const sql = 'UPDATE user SET email = '+ mail +' WHERE id=?'+ id;

        db.connection.query(sql, (error) => {
            if(error) throw error;
        })
        db.connection.end();
    }
    get login() {
        return this.login;
    }

    get mail() {
        return this.mail;
    }

    get password() {
        return this.password;
    }

    get commands() {
        return this.commands;
    }

    async remove() {
        await Account.service.delete(this.id);
        delete this;
    }

    static async add(login, password, mail) {
        const result = await Account.service.add({
            login: login,
            password: MD5(password).toString(),
            mail: mail
        })
        const account = new Account(result.insertId, login, MD5(password).toString(), mail);
        return account;
    }

    static async testLogin(login, password) {
        const data = await Account.service.login(login, password);
        if(data < 1) return null;
        else return new Account(data[0].id, data[0].login, data[0].password, data[0].adresseMail);
    }

    static async removeById(id) {
        const data = await Account.service.delete(id);
    }

    static async updateById(id, body) {
        const result = await Account.service.update(id, body);
        return result;
    }

    static async getById(id) {
        const data = await Account.service.getById(id);
        const account = new Account(data.id, data.login, data.password, data.mail);
        await account.loadCart();
        console.log(data);
        return account;
    }

    static async getAll() {
        const data = await Account.service.getAll();
        return data.map(item => new Account(item.id, item.login, item.password, item.adresseMail));
    }

    async loadCart() {
        const data = await Command.loadCart(this);
        this.commands.push(data);
    }

    get cartPrice() {
        this.commands.forEach((command) => {
            if(command.statut == "cart") return command.prix;
        })
        return 0;
    }

}

module.exports = Account;