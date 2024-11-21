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

}

module.exports = Compte