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
    static service;

    constructor(id, login, password, mail) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.mail = mail;
        service = new MysqlService("Account", ['login', 'mail', 'password']);
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
        AccountService.add({
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
        await AccountService.delete(this.id);
        delete this;
    }

    static async add(login, password, mail) {
        const result = await AccountService.add({
            login: login,
            password: MD5(password).toString(),
            mail: mail
        })
        const Account = new Account(result.insertId, login, MD5(password).toString(), mail);
        return Account;
    }

    static async testLogin(login, password) {
        const data = await AccountService.login(login, password);
        if(data < 1) return null;
        else return new Account(data[0].id, data[0].login, data[0].password, data[0].adresseMail);
    }

    static async removeById(id) {
        const data = await AccountService.delete(id);
    }

    static async updateById(id, body) {
        const result = await AccountService.update(id, body);
        return result;
    }

    static async getById(id) {
        const data = await AccountService.getById(id);
        const Account = new Account(data.id, data.login, data.password, data.mail);
        await Account.loadCart();
        console.log(data);
        return Account;
    }

    static async getAll() {
        const data = await AccountService.getAll();
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