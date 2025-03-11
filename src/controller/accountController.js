const Account = require('../model/account');

class AccountController {
    
    static affiche(req, res) {
        const id = req.params.id;
        Account.getById(id).then(Account => {
            res.render("account", {Account: Account})
        });
    }

    static addAccount(req, res) {
        //Account.creationAccount(db);
        res.redirect('/panier');
    }

    static loginAccount(req, res) {
        //Account.connexionAccount(db);
        res.redirect("/");
    }
    
    static setLogin(req, res) {
        //Account.modificationAccount(db, id);
        res.redirect(`/account/${id}`);
    }

    static setMail(req, res) {
        //Account.setAdresseMail(db, id);
        res.redirect(`/account/${id}`);
    }
}

module.exports = AccountController;