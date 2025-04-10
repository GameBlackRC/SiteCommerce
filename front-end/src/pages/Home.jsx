import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
        <main className="main-home">
            <article>
                <h1>Site E-Commerce</h1>

                <h2>Bienvenue sur notre MarketPlace !</h2>
            </article>

            <aside>
                <img src={`/assets/marketplace.png`} alt="marketplace" />
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