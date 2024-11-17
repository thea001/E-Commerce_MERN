import { useCart } from "../context/Cart/CartContext";

import { useRef } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";

const CheckoutPage = () => {
  const { cartItems, totalAmount } = useCart();
  const { token } = useAuth();
  const addressRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleConfirmOrder = async () => {
    const address = addressRef.current?.value;

    if (!address) return;

    const response = await fetch(`${BASE_URL}/cart/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ address }),
    });

    if (!response.ok) {
      const errorMessage = await response.text(); // Log the error message
      console.error("Checkout error:", response.status, errorMessage);
      return;
    }

    navigate("/order-success");
  };

  const renderCartItems = () => (
    <div
      className="d-flex flex-column gap-2 border rounded p-2"
      style={{ borderColor: "#f2f2f2" }}
    >
      {cartItems.map((item, index) => (
        <div
          key={item.productId || index}
          className="d-flex flex-row justify-content-between align-items-center w-100 p-3"
        >
          <div className="d-flex flex-row align-items-center gap-2 w-100">
            <img
              src={item.image || ""}
              alt="Product"
              className="rounded-2 me-2"
              width={90}
            />
            <div className="d-flex flex-row align-items-center justify-content-between w-100">
              <h6>{item.title || "Product Title"}</h6>
              <p>
                {item.quantity || 0} X {item.unitPrice || 0} DT
              </p>
            </div>
          </div>
        </div>
      ))}
      <div>
        <p className="text-end">
          Total Amount: {totalAmount?.toFixed(2) || "0.00"} DT
        </p>
      </div>
    </div>
  );

  return (
    <div className="container my-5 d-flex flex-column gap-2">
      <div className="d-flex flex-row justify-content-between mb-2">
        <h1>
          Checkout <i className="fa fa-check-square-o text-success"></i>
        </h1>
      </div>
      <div className="form-group">
        <label htmlFor="address">Delivery Address:</label>
        <input
          ref={addressRef || null}
          type="text"
          id="address"
          name="address"
          className="  input"
          placeholder="Enter your delivery address"
        />
      </div>
      {renderCartItems()}
      <button
        className="btn btn-success  w-100 mt-3"
        onClick={() =>
          typeof handleConfirmOrder === "function" && handleConfirmOrder()
        }
      >
        Pay Now
      </button>
    </div>
  );
};
export default CheckoutPage;
