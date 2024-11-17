import { useRef, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [error, setError] = useState("");
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const PasswordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { login } = useAuth();

  const onSubmit = async () => {
    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = PasswordRef.current?.value;

    //Validation data
    if (!firstName || !lastName || !email || !password) {
      setError("Check Submited data");
      return;
    }

    //Make the call to api to create the user
    const response = await fetch(`${BASE_URL}/user/register`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    });

    if (!response.ok) {
      setError(
        "Unable to register user, please try difference creadientials !"
      );
    }

    const token = await response.json();

    if (!token) {
      setError("Incorrect token");
      return;
    }

    login(email, token);
    navigate("/");
  };

  return (
    <div className="container d-flex justify-content-center p-3 my-5">
      <div className="card p-5 py-5 w-50">
        <h1>Register New Account</h1>

        {/* Full Name Input */}
        <div className="form-group mt-3">
          <label className="form-label" htmlFor="fullName"></label>
          Full Name:
          <input
            ref={firstNameRef || null}
            id="fullName"
            name="fullName"
            type="text"
            className="input"
            placeholder="Enter your full name"
          />
        </div>

        {/* Last Name Input */}
        <div className="form-group mt-3">
          <label className="form-label" htmlFor="lastName"></label>
          Last Name:
          <input
            ref={lastNameRef || null}
            id="lastName"
            name="lastName"
            type="text"
            className="input"
            placeholder="Enter your last name"
          />
        </div>

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
          Register
        </button>

        {/* Error Message */}
        {error && <p style={{ color: "red", marginTop: "8px" }}>{error}</p>}
      </div>
    </div>
  );
};

export default RegisterPage;
