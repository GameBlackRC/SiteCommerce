import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProductById } from "../services/api";

const GestionProductDetails = () => {
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
    
    return(
        <>
            <main className="main-details-product">
                <h1>Détails du Produit</h1>
                <section className="section-details-product">
                    <article>
                        <img src={`http://localhost:3000${product.urlImg}`} alt={product.name} />

                        <aside>
                            <h2>{product.name}</h2>

                            <h3>Catégorie</h3>
                            <p>{product.category.name}</p>

                            <h3>Prix</h3>
                            <p>{product.price} €</p>
                        </aside>
                    </article>
                    <Link to="/admin/gestion-produits" className="">Retour à la gestion</Link>
                </section>
            </main>
        </>
    );
};

export default GestionProductDetails;