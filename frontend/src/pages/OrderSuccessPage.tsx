import { useNavigate } from "react-router-dom";

const OrderSuccessPage = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };

  return (
    <div className="container   d-flex flex-column align-items-center justify-content-center gap-3 text-center my-5">
      <i
        className="fa fa-check-circle"
        style={{ color: "green", fontSize: "120px" }}
        aria-hidden="true"
      ></i>
      <h1>Thanks for your order.</h1>
      <p>We started processing it, and we will get back to you soon.</p>
      <button
        className="btn btn-success"
        onClick={() => typeof handleHome === "function" && handleHome()}
      >
        Go to Home
      </button>
    </div>
  );
};

export default OrderSuccessPage;
