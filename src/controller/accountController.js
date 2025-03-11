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

    static clientAccount(req, res) {
        const id = req.params.id;
        Account.getById(id).then(account => {
            res.render("account", { account: account })
        });
    }

    static login(req, res) {
        res.render("login");
    };

    static signUp(req, res) {
        res.render("signUp");
    }
}

module.exports = AccountController;