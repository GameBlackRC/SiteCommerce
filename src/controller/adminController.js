const Commande = require('../model/commande');

class commandeController {
    static admin(req, res) {
        res.render("admininistration");
    }
}

module.exports = commandeController;