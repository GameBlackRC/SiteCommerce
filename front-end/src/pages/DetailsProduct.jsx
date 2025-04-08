import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { fetchProductById } from "../services/api";

const DetailsProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProductById(id);
                setProduct(data);
            } catch (error) {
                setError("Erreur lors du chargement du produit.");
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, [id]);

    if (loading) {
        return <div>Chargements des produits...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    if (!product) {
        return <div>Produit introuvable.</div>
    }

    return (
        <>
            <main className="main-details-product">
                <h1>Détails du Produit</h1>
                <section className="section-details-product">
                    <article>
                        <img src={`http://localhost:3000/${product.urlImg}`} alt={product.name} />

                        <aside>
                            <h2>{product.name}</h2>

                            <h3>Catégorie</h3>
                            <p>{product.category.name}</p>

                            <h3>Prix</h3>
                            <p>{product.price} €</p>

                            <button className="button cta" onClick={() => addToPanier(product.id)}>Ajouter au panier</button>
                        </aside>
                    </article>
                    <Link to="/produits" className="">Retour à la liste</Link>
                </section>
            </main>
        </>
    );
};

export default DetailsProduct;