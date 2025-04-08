import { Link } from "react-router-dom";

const GestionProductItem = ({ product }) => {
    return (
        <>
            <Link to={`/admin/gestion-produits/${product.id}`}>
                <div className="product-item">
                    <article>
                        <img src={`http://localhost:3000/${product.urlImg}`} alt={product.name} />
                        <div className="article-infos">
                            <p>{product.name}</p>
                            <p>{product.price} €</p>
                        </div>
                    </article>
                </div>
            </Link>
        </>
    );
};

export default GestionProductItem;