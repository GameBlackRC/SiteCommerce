class Compte {
    login
    adresseMail
    password
    panier

    constructor(login, password, adresseMail) {
        this.login = login
        this.password = password
        this.adresseMail = adresseMail
    }

    setLogin(login) {
        this.login = login;
    }

    setAdresseMail(adresseMail) {
        this.adresseMail = adresseMail;
    }

}

module.exports = Compte