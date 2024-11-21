
class AppController {
    static home(req, res) {
        res.render("home", {title: "Site E-Commerce - Accueil"});
    };
    static listeProduits(req, res) {
        res.render("listeProduits");
    };
    static login(req, res) {
        res.render("login");
    };
};

module.exports = AppController;