import { Link } from "react-router-dom";

const GestionProductItem = ({ product }) => {
    return (
        <>
            <Link to={`/gestion-produits/${product.id}`}>
                <div className="product-item">
                    <article>
                        <img src={product.urlImg} alt={product.name} />
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