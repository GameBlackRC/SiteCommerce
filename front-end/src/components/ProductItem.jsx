import { Link } from "react-router-dom";
import { addToCart } from "../services/api";
import { useNavigate} from "react-router-dom";

const ProductItem = ({ product }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const handleAddToCart = async (product) => {
        try {
            // Appel API pour ajouter le produit au panier
            await addToCart(product.id);

            // Redirection vers la page panier
            navigate("/panier");
        } catch (error) {
            console.error("Erreur lors de l'ajout au panier :", error);
            alert("Une erreur est survenue lors de l'ajout au panier.");
        }
    };

    if (!user || !token) {
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
    
                        <button className="button ctaDisable">Ajouter au panier</button>
                    </div>
                </Link>
            </>
        );
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

                    <button className="button cta" onClick={() => handleAddToCart(product)}>Ajouter au panier</button>
                </div>
            </Link>
        </>
    );
};

export default ProductItem;