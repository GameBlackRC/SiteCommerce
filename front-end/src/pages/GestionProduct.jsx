import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { fetchProducts } from "../services/api";
import GestionProductItem from "../components/GestionProductItem";

const gestionProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
            } catch (error) {
                setError("Erreur lors du chargement des produits.");
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    if (loading) {
        return <div>Chargements des produits...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <>
            <main className="main-gestion-product">
                <h1>Gestion des produits</h1>
                <section className="gestion-product-content">
                    <aside>
                        <p>Nombres de produits</p>
                        <strong>{products.length}</strong>
                    </aside>

                    <section>
                        <h2>Créer un nouveau produit</h2>
                        <form className="main-form" method="POST" action="/gestion-produits" encType="multipart/form-data">
                            <label for="nom">Nom du produit</label>
                            <input type="text" name="nom" id="nom" required />

                            <label for="urlImg">Image du produit</label>
                            <input type="file" name="urlImg" id="urlImg" accept="image/*" required />

                            <label for="categorie">Nom du produit</label>
                            <input type="text" name="categorie" id="categorie" required />

                            <label for="prix">Prix du produit</label>
                            <input type="number" name="prix" id="prix" min="0" required />

                            <label for="description">Description du produit</label>
                            <textarea id="description" name="description" required></textarea>

                            <input type="submit" value="Ajouter" />
                        </form>

                        <h2>Liste des produits</h2>
                        <section className="list-product">
                            {products.map((product) => (
                                <GestionProductItem key={product.id} product={product} />
                            ))}
                        </section>
                    </section>

                </section>
            </main>
        </>
    );
};

export default gestionProduct;