// import { useState } from 'react';
// import { RiDeleteBin3Line } from "react-icons/ri";
// import './CartContents.css'; // We'll create this CSS file
import { useState } from 'react';
import { RiDeleteBin3Line } from "react-icons/ri";
import './cartContent.css';

const CartContents = () => {
    const [cartProducts, setCartProducts] = useState([
        {
            productId: 1,
            name: "Tshirt",
            size: "M",
            color: "Red",
            quantity: 1,
            price: 15,
            image: "https://picsum.photos/200?random=1",
        },
        {
            productId: 2,
            name: "Jeans",
            size: "L",
            color: "Blue",
            quantity: 1,
            price: 25,
            image: "https://picsum.photos/200?random=2",
        },
    ]);

    const handleQuantityChange = (productId, change) => {
        setCartProducts(prevProducts => 
            prevProducts.map(product => 
                product.productId === productId 
                    ? { 
                        ...product, 
                        quantity: Math.max(1, product.quantity + change) 
                      } 
                    : product
            )
        );
    };

    const handleRemoveItem = (productId) => {
        setCartProducts(prevProducts => 
            prevProducts.filter(product => product.productId !== productId)
        );
    };

    return (
        <div className="cart-container">
            {cartProducts.length === 0 ? (
                <p className="empty-cart-message">Your cart is empty</p>
            ) : (
                cartProducts.map((product) => (
                    <div key={product.productId} className="cart-item">
                        <div className="item-details">
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                className="product-image" 
                            />
                            <div className="product-info">
                                <h3 className="product-name">{product.name}</h3>
                                <p className="product-attributes">
                                    Size: {product.size} | Color: {product.color}
                                </p>
                                <div className="quantity-controls">
                                    <button 
                                        className="quantity-btn" 
                                        onClick={() => handleQuantityChange(product.productId, -1)}
                                        disabled={product.quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <span className="quantity">{product.quantity}</span>
                                    <button 
                                        className="quantity-btn" 
                                        onClick={() => handleQuantityChange(product.productId, 1)}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="item-actions">
                            <p className="product-price">
                                ${(product.price * product.quantity).toFixed(2)}
                            </p>
                            <button 
                                className="remove-btn" 
                                onClick={() => handleRemoveItem(product.productId)}
                                aria-label="Remove item"
                            >
                                <RiDeleteBin3Line className="delete-icon"/>
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default CartContents;