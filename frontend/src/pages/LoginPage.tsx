import { useRef, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [error, setError] = useState("");

  const emailRef = useRef<HTMLInputElement>(null);
  const PasswordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async () => {
    const email = emailRef.current?.value;
    const password = PasswordRef.current?.value;

    //Validation data
    if (!email || !password) {
      setError("Check Submited data");
      return;
    }

    //Make the call to api to create the user
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      setError("Unable to Login User, please try difference creadientials !");
    }
    const data = await response.json();
    const token = data.token;
    const role = data.role;
    if (!token) {
      setError("Incorrect token");
      return;
    }

    login(email, token, role);
    if (token) navigate("/");
  };

  return (
    <div className="container d-flex justify-content-center p-3 my-5">
      <div className="card p-5 py-5 w-50">
        <h1>Login To Your Account</h1>
        {/* Email Input */}
        <div className="form-group mt-3">
          <label className="form-label" htmlFor="email"></label>
          Email:
          <input
            ref={emailRef || null}
            id="email"
            name="email"
            type="email"
            className="input"
            placeholder="Enter your email"
          />
        </div>
        {/* Password Input */}
        <div className="form-group mt-3">
          <label className="form-label" htmlFor="password"></label>
          Password:
          <input
            ref={PasswordRef || null}
            id="password"
            name="password"
            type="password"
            className="input"
            placeholder="Enter your password"
          />
        </div>

        {/* Submit Button */}
        <button
          className="primary-btn mt-5"
          type="button"
          onClick={onSubmit || (() => {})}
        >
          Login
        </button>

        {/* Error Message */}
        {error && <p style={{ color: "red", marginTop: "8px" }}>{error}</p>}
        <a
          className="text-underline link text-danger text-center mt-5 cursor-pointer"
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/register");
          }}
        >
          Dont have account ?
        </a>
      </div>
    </div>
  );
};

export default LoginPage;
