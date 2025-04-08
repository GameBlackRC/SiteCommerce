import { Link, Outlet } from "react-router-dom";

const Admin = () => {
    return(
        <>
            <main className="main-admin">
                <aside className="aside-navbar">
                    <h3>Administration</h3>
                    <nav className="sidebar">
                        <Link to="/admin/gestion-produits">Produits</Link>
                        <Link to="/admin/gestion-commandes">Commandes</Link>
                        <Link to="/admin/gestion-categories">Catégories</Link>
                    </nav>
                </aside>
                <section className="section-admin">
                    <Outlet />
                </section>
            </main>
        </>
    );
};

export default Admin;