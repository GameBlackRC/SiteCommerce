import { Link } from "react-router-dom";

const ProductItem = ({ product }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    let button = <button className="button cta" onClick={() => addToPanier(product.id)}>Ajouter au panier</button>;
    if (!user || !token) {
        button = <button className="button ctaDisable">Ajouter au panier</button>;
    }
    return (
        <>
            <Link to={`/produits/${product.id}`}>
                <div className="product-item">
                    <article>
                        <img src={product.urlImg} alt={product.name} />
                        <div className="article-infos">
                            <p>{product.name}</p>
                            <p>{product.price} €</p>
                        </div>
                    </article>

                    {button}
                </div>
            </Link>
        </>
    );
};

export default ProductItem;