import { removeFromCart } from "../services/api";

const CartItem = ({ product, commandID }) => {
    const total = (product.quantity * product.data.price).toFixed(2);

    const handleRemoveFromCart = async () => {
        try {
            // Appel API pour retirer le produit de la commande
            await removeFromCart(commandID, product.data.id);

            window.location.reload();
        } catch (error) {
            console.error("Erreur lors de la suppression du produit :", error);
            alert("Une erreur est survenue lors de la suppression du produit.");
        }
    };

    return (
        <>
            <article className="cart-item">
                <div className="div-infos">
                    <img src={product.data.urlImg} alt={product.data.name} />
                    <p>{product.data.name}</p>
                    <p>{product.data.price} €</p>
                </div>

                <div className="div-quantity">
                    {/* <button className="button cta">-</button> */}
                    <span>Quantité : {product.quantity}</span>
                    {/* <button className="button cta">+</button> */}
                </div>

                <div className="div-total">
                    <p>Total : {total} €</p>
                </div>

                <div className="div-delete">
                    <button className="button cta" onClick={handleRemoveFromCart}>x</button>
                </div>
            </article>
        </>
    );
};

export default CartItem;