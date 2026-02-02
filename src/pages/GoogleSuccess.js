import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/googleSuccess.css";

const GoogleSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/");
      window.location.reload(); 
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="login-success-container">
        <div className="loader"></div>
        <p className="loading-text">Logging you in with Google...</p>
    </div>
  );
};

export default GoogleSuccess;