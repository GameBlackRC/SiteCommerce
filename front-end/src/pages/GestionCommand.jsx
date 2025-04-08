import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { fetchCommands } from "../services/api";

const GestionCommand = () => {
    const [commands, setCommands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadCommands();
    }, []);

    const loadCommands = async () => {
        try {
            const data = await fetchCommands();
            setCommands(data);
        } catch (error) {
            setError("Erreur lors du chargement des commandes.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Chargements des commandes...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <>
            <main className="main-gestion-command">
                <h1>Gestion des commandes</h1>

                <h2>Liste des commandes</h2>
                <section className="list-command">
                    {commands.map((command) => (
                        <article key={command.id}>
                            <h3>{command.id}</h3>
                            <h3>{command.statut}</h3>
                            {command.listProduct.map((product, index) => (
                                <div key={index}>
                                    <p>{product.data.name}</p>
                                    <p>{product.data.price}</p>
                                    <p>Quantité : {product.quantity}</p>
                                </div>
                            ))}
                        </article>
                    ))}
                </section>
            </main>
        </>
    );
};

export default GestionCommand;