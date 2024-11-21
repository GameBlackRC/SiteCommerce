class Compte {
    id
    login
    adresseMail
    password
    panier

    constructor(login, password, adresseMail) {
        this.login = login
        this.password = password
        this.adresseMail = adresseMail
    }


}

module.exports = Compte