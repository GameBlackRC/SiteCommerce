const CartItem = () => {
    return (
        <>
            <article className="cart-item">
                <div className="div-infos">
                    <img src='../assets/image.jpg' alt='Produits' />
                    <p>Nom</p>
                    <p>10 €</p>
                </div>

                <div className="div-quantity">
                    <button className="button cta">-</button>
                    <span>1</span>
                    <button className="button cta">+</button>
                </div>

                <div className="div-total">
                    <p>Total €</p>
                </div>

                <div className="div-delete">
                    <button className="button cta">x</button>
                </div>
            </article>
        </>
    );
};

export default CartItem;