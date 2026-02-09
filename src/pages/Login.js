import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
try {
      const res = await axios.post(
        "https://koma-backend-801z.onrender.com/api/auth/login", // Updated to live Render URL
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      navigate("/");
      window.location.reload();
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">Login</h2>

        <form onSubmit={submitHandler}>
          <input
            type="email"
            placeholder="Email"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="auth-button">
            Login
          </button>
        </form>

        <p className="auth-footer">
          Don’t have an account?{" "}
          <Link to="/signup">Signup</Link>
        </p>

       <a
  href="https://koma-backend-801z.onrender.com/api/auth/google"
  className="google-btn"
>
  <img
    src="https://developers.google.com/identity/images/g-logo.png"
    alt="Google"
    className="google-icon"
  />
  <span>Sign in with Google</span>
</a>

      </div>
    </div>
  );
}

export default Login;
