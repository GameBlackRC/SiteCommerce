import { Link } from "react-router-dom";

const ProductItem = ({ product }) => {
    return (
        <>
            <Link to={`/produits/${product.id}`}>
                <div className="product-item">
                    <article>
                        <img src={`http://localhost:3000/${product.urlImg}`} alt={product.name} />
                        <div className="article-infos">
                            <p>{product.name}</p>
                            <p>{product.price} €</p>
                        </div>
                    </article>

                    <button className="button cta" onClick={() => addToPanier(product.id)}>Ajouter au panier</button>
                </div>
            </Link>
        </>
    );
};

export default ProductItem;