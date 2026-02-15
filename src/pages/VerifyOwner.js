import React, { useState } from 'react';
import axios from 'axios';
import "../styles/verifyOwner.css";

function VerifyOwner() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    aadhaarNumber: '',
  });
  const [files, setFiles] = useState({
    idCard: null,
    landTaxDoc: null
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!files.idCard || !files.landTaxDoc) return alert("Please upload both required documents.");

    setLoading(true);
    setMessage("Submitting details for AI cross-verification...");

    try {
      const token = localStorage.getItem("token");
      
      // 1. Prepare Multipart Form Data for both files
      const uploadData = new FormData();
      uploadData.append("idCard", files.idCard);
      uploadData.append("landTaxDoc", files.landTaxDoc);
      uploadData.append("fullName", formData.fullName);
      uploadData.append("phone", formData.phone);
      uploadData.append("aadhaarNumber", formData.aadhaarNumber);

      // 2. Submit to your updated verification endpoint
      const res = await axios.post("https://koma-backend-801z.onrender.com/api/auth/verify-full", uploadData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Verification failed. Check your details and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-page">
      <div className="verify-card">
        <h2>🛡️ Trust & Safety Verification</h2>
        <p>Complete your profile to become a Verified Owner and list properties.</p>
        
        <form onSubmit={handleSubmit} className="verify-form">
          <div className="input-group">
            <input type="text" name="fullName" placeholder="Full Name (as per ID)" onChange={handleInputChange} required />
            <input type="tel" name="phone" placeholder="Phone Number" onChange={handleInputChange} required />
            <input type="text" name="aadhaarNumber" placeholder="12-Digit Aadhaar Number" onChange={handleInputChange} required />
          </div>

          <div className="file-section">
            <div className="file-box">
              <label>Govt ID Card (Aadhaar/PAN)</label>
              <input type="file" name="idCard" accept="image/*" onChange={handleFileChange} required />
            </div>
            
            <div className="file-box">
              <label>Land Tax / Property Deed</label>
              <input type="file" name="landTaxDoc" accept="image/*" onChange={handleFileChange} required />
            </div>
          </div>
          
          <button type="submit" disabled={loading} className="verify-btn">
            {loading ? "AI Analyzing Documents..." : "Submit for Verification"}
          </button>
        </form>

        {message && (
          <p className={`status-msg ${message.includes('failed') ? 'error' : 'success'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default VerifyOwner;