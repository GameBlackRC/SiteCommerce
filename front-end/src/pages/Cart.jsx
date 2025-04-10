import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import React, { useState, useEffect } from "react";
import { fetchProductsInCart } from "../services/api";

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

    const [total, setTotal] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const productsData = await Promise.all([
                    fetchProductsInCart(user.id)
                ]);
                setProducts(productsData[0].listProduct);
                setTotal(0);
                for (let i = 0; i < productsData[0].listProduct.length; i++) {
                    setTotal((prevTotal) => parseFloat(prevTotal + (productsData[0].listProduct[i].data.price * productsData[0].listProduct[i].quantity)));
                }
            } catch (error) {
                setError("Erreur lors du chargement des données.");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) {
        return <div>Chargements des produits...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <>
            <main className="main-cart">
                <h1>Panier</h1>
                <section className="cart-section">
                    <section className="cart-content">
                        {products.map((product) => (
                            <CartItem key={product.data.name} product={product} />
                        ))}
                    </section>
                    <aside className="aside-cart">
                        <h3>Total de la commande</h3>
                        <p>Total : {total} €</p>
                        <button className="button cta">Passer au paiement</button>
                    </aside>
                </section>
            </main>
        </>
    );
};

export default Cart;