// import { IoMdClose } from 'react-icons/io';
// import CartContents from '../../Cart/CartContent';
// import { useNavigate } from 'react-router-dom';
// import './CartDrawer.css'
// const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
//   const navigate = useNavigate();

//   const handleCheckout = () => {
//     toggleCartDrawer();
//     navigate("/checkout");
//   };

//   return (
//     <div className={`cart-drawer ${drawerOpen ? 'open' : ''}`}>
//       {/* Close Button */}
//       <div className="drawer-header">
//         <button 
//           onClick={toggleCartDrawer} 
//           className="close-button"
//           aria-label="Close cart drawer"
//         >
//           <IoMdClose className="close-icon" />
//         </button>
//       </div>

//       {/* Cart Content */}
//       <div className="cart-content">
//         <h2 className="cart-title">Your Cart</h2>
//         <CartContents />
//       </div>

//       {/* Checkout Button */}
//       <div className="checkout-footer">
//         <button 
//           onClick={handleCheckout}
//           className="checkout-button"
//         >
//           Checkout
//         </button>
//         <p className="checkout-note">
//           Shipping, taxes, and discount codes calculated at checkout.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default CartDrawer;
import { IoMdClose } from 'react-icons/io';
// import CartContents from '../Cart/CartContents';  // Fixed import path
import CartContents from '../../Cart/CartContent';
import { useNavigate } from 'react-router-dom';
import './CartDrawer.css';

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    toggleCartDrawer();
    navigate("/checkout");
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`cart-drawer-overlay ${drawerOpen ? 'active' : ''}`}
        onClick={toggleCartDrawer}
      />
      
      {/* Drawer */}
      <div className={`cart-drawer ${drawerOpen ? 'open' : ''}`}>
        {/* Close Button */}
        <div className="drawer-header">
          <button 
            onClick={toggleCartDrawer} 
            className="close-button"
            aria-label="Close cart drawer"
          >
            <IoMdClose className="close-icon" />
          </button>
        </div>

        {/* Cart Content */}
        <div className="cart-content">
          <h2 className="cart-title">Your Cart</h2>
          <CartContents />
        </div>

        {/* Checkout Button */}
        <div className="checkout-footer">
          <button 
            onClick={handleCheckout}
            className="checkout-button"
          >
            Checkout
          </button>
          <p className="checkout-note">
            Shipping, taxes, and discount codes calculated at checkout.
          </p>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;