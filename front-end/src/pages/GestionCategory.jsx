import { Link } from "react-router-dom";
import React,  { useState, useEffect } from "react";
import { fetchCategories, addCategory, deleteCategory } from "../services/api";

const GestionCategory = () => {
    const [categories, setCategories] = useState([]);
    const [addedCategory, setAddedCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const data = await fetchCategories();
            setCategories(data);
        } catch (error) {
            setError("Erreur lors du chargement des catégories.");
        } finally {
            setLoading(false);
        }
    };

    const handleAddedCategory = async (element) => {
        element.preventDefault();
        if(addedCategory.trim() === '') return;

        try {
            await addCategory({ name : addedCategory });
            setAddedCategory("");
            loadCategories();
        } catch (error) {
            setError("Erreur lors de l'ajout de la catégorie.");
        }
    }

    const handleDeleteCategory = async (id) => {
        if (!window.confirm('Confirmer la suppression ?')) return;
        
        try {
            await deleteCategory(id);
            loadCategories();
        } catch (error) {
            setError(`Erreur lors de la suppresion de la catégorie ${id}.`);
        }
    }

    if (loading) {
        return <div>Chargements des catégories...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <>
            <main className="main-gestion-category">
                <h1>Gestion des catégories</h1>
                <section>
                    <h2>Créer une nouvelle catégorie</h2>
                    <form onSubmit={handleAddedCategory}>
                        <label for="category">Nom de la catégorie</label>
                        <input type="text" id="category" value={addedCategory} onChange={(element) => setAddedCategory(element.target.value)} />
                        <button className="button cta" type="submit">Ajouter</button>
                    </form>

                    <h2>Liste des catégories</h2>
                    <section>
                        {categories.map((category) => (
                            <article key={category.id}>
                                <h3>{category.name}</h3>
                                <button className="button cta" onClick={() => handleDeleteCategory(category.id)}>Supprimer</button>
                            </article>
                        ))}
                    </section>
                </section>
            </main>
        </>
    );
};

export default GestionCategory;