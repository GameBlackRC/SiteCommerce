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

    connexion(login, password) {

    }


}

module.exports = Compte