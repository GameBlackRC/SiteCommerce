import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { fetchCategories, fetchProducts, addProduct } from "../services/api";
import GestionProductItem from "../components/GestionProductItem";

const gestionProduct = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [categoriesData, productsData] = await Promise.all([
                    fetchCategories(),
                    fetchProducts()
                ]);

                setCategories(categoriesData);
                setProducts(productsData);
            } catch (error) {
                setError("Erreur lors du chargement des données.");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const handleSubmit = async (element) => {
        element.preventDefault();

        const formData = new FormData(element.target);

        await addProduct(formData);
        setProducts(await fetchProducts());
        
        element.target.reset();
    };

    if (loading) {
        return <div>Chargements des données...</div>
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

                    <section className="gestion-form-content">
                        <h2>Créer un nouveau produit</h2>
                        <form className="gestion-form" onSubmit={handleSubmit} encType="multipart/form-data">
                            <label htmlFor="name">Nom du produit</label>
                            <input type="text" name="name" id="name" required />

                            <label htmlFor="urlImg">Image du produit</label>
                            <label htmlFor="urlImg" className="urlImg-button">Insérez un fichier</label>
                            <input type="file" name="urlImg" id="urlImg" accept="image/*" required />

                            <label htmlFor="category">Catégorie du produit</label>
                            <select id="category" name="category" required>
                                {categories.map((category) => (
                                    <option key={category.id} id={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>

                            <label htmlFor="price">Prix du produit</label>
                            <input type="number" name="price" id="price" min="0" required />

                            <label htmlFor="description">Description du produit</label>
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