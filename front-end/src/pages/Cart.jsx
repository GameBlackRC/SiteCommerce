import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";

const Cart = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if (!user || !token) {
        return (
            <main className="main-cart">
                <h1>Panier</h1>
                <p>Veuillez vous connecter pour accéder à votre panier.</p>
                <Link to="/login" className="button">Se connecter</Link>
            </main>
        );
    }
    return (
        <>
            <main className="main-cart">
                <h1>Panier</h1>
                <section className="cart-section">
                    <section className="cart-content">
                        {[...Array(5)].map((_, index) => (
                            <CartItem key={index} />
                        ))}
                    </section>
                    <aside className="aside-cart">
                        <h3>Total de la commande</h3>
                        <p>Total €</p>
                        <button className="button cta">Passer au paiement</button>
                    </aside>
                </section>
            </main>
        </>
    );
};

export default Cart;