import { Link, Outlet } from "react-router-dom";
import { isAdmin } from "../services/api";

const Admin = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if (!user || !token || !user.admin) {
        return (
            window.location.href = "/"
        );
    }
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