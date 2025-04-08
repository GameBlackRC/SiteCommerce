import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";

const Cart = () => {
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