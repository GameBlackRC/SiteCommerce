import { Link } from "react-router-dom";

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if(!user || !token) {
        return (
            <nav>
                <ul>
                    <li><Link to='/'>Accueil</Link></li>
                    <li><Link to='/produits'>Produits</Link></li>
                    <li><Link to='/login'>Se connecter</Link></li>
                    <li><Link to='/panier'>Panier</Link></li>
                </ul>
            </nav>
        );
    }
    return (
        <nav>
            <ul>
                <li><Link to='/'>Accueil</Link></li>
                <li><Link to='/produits'>Produits</Link></li>
                <li><Link to='/logout'>Se deconnecter</Link></li>
                <li><Link to='/panier'>Panier</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;