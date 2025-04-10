import React, { useState, useEffect } from "react";
import { fetchCategories, fetchProducts } from "../services/api";
import ProductItem from "../components/ProductItem";
import { useNavigate, Link } from "react-router-dom";

const Product = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
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

    const navigate = useNavigate();

    const filteredProducts = selectedCategory
        ? products.filter(product => product.category.id === parseInt(selectedCategory))
        : products;

    if (loading) {
        return <div>Chargements des produits...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    const isLogin = !user || !token;

    return (
        <>
            <main className="main-product">
                <h1>Produits</h1>
                <aside className="aside-filtres">
                    <label htmlFor="filtres">Filtrer</label>

                    <select name="filtres" id="filtres" value={selectedCategory} onChange={(element) => setSelectedCategory(element.target.value)}>
                        <option value="">Toutes les catégories</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </aside>
                <section className="product-content">
                    {filteredProducts.map((product) => (
                        <ProductItem key={product.id} product={product} />
                    ))}
                </section>
            </main>
        </>
    );
};

export default Product;