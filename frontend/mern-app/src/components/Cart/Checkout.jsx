import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import PayPalButton from './PayPalButton';
import './Checkout.css'; // We'll create this CSS file

const Checkout = () => {
  const navigate = useNavigate();
  const [checkoutId, setCheckoutId] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const cart = {
    products: [
      {
        id: 1,
        name: "Stylish Jacket",
        size: "M",
        color: "Black",
        price: 120,
        image: "https://picsum.photos/600/800?random=1",
      },
      {
        id: 2,
        name: "Casual Sneakers",
        size: "42",
        color: "White",
        price: 75,
        image: "https://picsum.photos/600/800?random=2",
      },
    ],
    totalPrice: 195,
  };

  const handleCreateCheckout = (e) => {
    e.preventDefault();
    // Validate all fields are filled
    for (const key in shippingAddress) {
      if (!shippingAddress[key]) {
        alert(`Please fill in the ${key} field`);
        return;
      }
    }
    setCheckoutId(Math.floor(Math.random() * 10000)); // Generate a random checkout ID
  };

  // const handlePaymentSuccess = (details) => {
  //   console.log("Payment Successful", details);
  //   navigate("/order-confirmation");
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="checkout-container">
      {/* Left Section */}
      <div className="checkout-form-section">
        <h2 className="checkout-title">Checkout</h2>
        <form onSubmit={handleCreateCheckout}>
          <h3 className="section-title">Contact Details</h3>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              value="user@example.com" 
              className="form-input"
              disabled
            />
          </div>

          <h3 className="section-title">Delivery</h3>
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                className="form-input"
                required
                value={shippingAddress.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                className="form-input"
                required
                value={shippingAddress.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Address</label>
            <input 
              type="text" 
              name="address"
              value={shippingAddress.address}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                className="form-input"
                required
                value={shippingAddress.city}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Postal Code</label>
              <input
                type="text"
                name="postalCode"
                className="form-input"
                required
                value={shippingAddress.postalCode}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Country</label>
            <input 
              type="text" 
              name="country"
              value={shippingAddress.country}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Phone</label>
            <input 
              type="tel" 
              name="phone"
              value={shippingAddress.phone}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>
          
          <div className="payment-section">
            {!checkoutId ? (
              <button type="submit" className="payment-button">
                Continue to Payment
              </button>
            ) : (
              // <div className="paypal-container">
              //   <h3 className="section-title">Pay with PayPal</h3>
              //   <PayPalButton 
              //     amount={cart.totalPrice}
              //     onSuccess={handlePaymentSuccess} 
              //     onError={(err) => {
              //       console.error("Payment failed:", err);
              //       alert("Payment failed. Please try again.");
              //     }}
              //   />
              // </div>
              <div>
                Hello
              </div>
            )}
          </div>
        </form>
      </div>
      
      {/* Right Section */}
      <div className="order-summary-section">
        <h3 className="section-title">Order Summary</h3>
        <div className="products-list">
          {cart.products.map((product) => (
            <div key={product.id} className="product-item">
              <div className="product-info">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="product-image"
                />
                <div className="product-details">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-attribute">Size: {product.size}</p>
                  <p className="product-attribute">Color: {product.color}</p>
                </div>
              </div>
              <p className="product-price">${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
        
        <div className="price-row">
          <p>Subtotal</p>
          <p>${cart.totalPrice.toFixed(2)}</p>
        </div>
        
        <div className="price-row">
          <p>Shipping</p>
          <p>Free</p>
        </div>
        
        <div className="total-row">
          <p>Total</p>
          <p>${cart.totalPrice.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;