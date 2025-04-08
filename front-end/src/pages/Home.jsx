import { Link } from "react-router-dom";
import marketPlace from '../../public/assets/marketplace.png';

const Home = () => {
    return (
        <>
        <main className="main-home">
            <article>
                <h1>Site E-Commerce</h1>

                <h2>Bienvenue sur notre MarketPlace !</h2>
            </article>

            <aside>
                <img src={marketPlace} alt="marketplace" />
                <section>
                    <Link to="/panier" className="button">Voir son panier</Link>
                    <Link to="/produits" className="button">Voir les produits</Link>
                </section>
            </aside>
        </main>        
        </>
    );
};

export default Home;