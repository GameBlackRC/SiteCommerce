const CartItem = ({ product }) => {
    const total = product.quantity * product.data.price;
    return (
        <>
            <article className="cart-item">
                <div className="div-infos">
                    <img src={product.data.urlImg} alt={product.data.name} />
                    <p>{product.data.name}</p>
                    <p>{product.data.price} €</p>
                </div>

                <div className="div-quantity">
                    <button className="button cta">-</button>
                    <span>{product.quantity}</span>
                    <button className="button cta">+</button>
                </div>

                <div className="div-total">
                    <p>Total : {total} €</p>
                </div>

                <div className="div-delete">
                    <button className="button cta">x</button>
                </div>
            </article>
        </>
    );
};

export default CartItem;