import { Link } from "react-router-dom";

const Navbar = () => {
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
};

export default Navbar;