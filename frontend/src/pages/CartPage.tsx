import { useCart } from "../context/Cart/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const {
    cartItems,
    totalAmount,
    updateItemInCart,
    removeItemInCart,
    clearCart,
  } = useCart();
  const Navigate = useNavigate();

  const handleQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      return;
    }
    updateItemInCart(productId, quantity);
  };

  const handleRemoveItem = (productId: string) => {
    removeItemInCart(productId);
  };

  const handleCheckOut = () => {
    Navigate("/checkout");
  };

  const renderCartItems = () => (
    <div className="d-flex flex-column gap-4">
      {cartItems.map((item) => (
        <div
          key={item.productId || Math.random()}
          className="d-flex flex-row justify-content-between align-items-center border rounded p-4"
          style={{ borderColor: "#f2f2f2" }}
        >
          <div className="d-flex flex-row align-items-center  gap-2">
            <img
              className="rounded rounded-2 me-3"
              src={item.image || ""}
              alt="Product"
              width={90}
            />
            <div>
              <h6>{item.title || "Product Title"}</h6>
              <p>
                {item.quantity || 0} X {item.unitPrice || 0} DT
              </p>
              <button
                className="btn btn-danger btn-sm"
                onClick={() =>
                  typeof handleRemoveItem === "function" &&
                  handleRemoveItem(item.productId)
                }
              >
                <i className="fa fa-trash"></i> Remove Item
              </button>
            </div>
          </div>
          <div
            className="btn-group"
            role="group"
            aria-label="Quantity controls"
          >
            <button
              className="btn btn-secondary"
              onClick={() =>
                typeof handleQuantity === "function" &&
                handleQuantity(item.productId, (item.quantity || 1) - 1)
              }
            >
              -
            </button>
            <button
              className="btn btn-secondary"
              onClick={() =>
                typeof handleQuantity === "function" &&
                handleQuantity(item.productId, (item.quantity || 1) + 1)
              }
            >
              +
            </button>
          </div>
        </div>
      ))}
      <div className="d-flex flex-row justify-content-between mt-4">
        <h4>Total Amount: {totalAmount?.toFixed(2) || "0.00"} DT</h4>
        <button
          className="btn btn-light shadow border"
          onClick={() =>
            typeof handleCheckOut === "function" && handleCheckOut()
          }
        >
          Go To Checkout <i className="fa fa-toggle-right"></i>
        </button>
      </div>
    </div>
  );

  return (
    <div className="container mt-4">
      <div className="d-flex flex-row align-items-center justify-content-between mb-3">
        <h1>My Cart</h1>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => typeof clearCart === "function" && clearCart()}
        >
          Clear Cart <i className="	fa fa-trash-o"></i>
        </button>
      </div>
      {cartItems?.length ? (
        renderCartItems()
      ) : (
        <p>Cart Is Empty, Please Start Shopping And Add Items First</p>
      )}
    </div>
  );
};
export default CartPage;
