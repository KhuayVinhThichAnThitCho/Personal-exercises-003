import { useState } from "react";
import { registerAPI } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerAPI(formData);
      alert("Đăng ký thành công! Hãy kiểm tra Email nhận OTP.");
      navigate("/verify-otp", { state: { email: formData.email } });
    } catch (error) {
      alert(error.response?.data?.message || "Lỗi đăng ký");
    }
  };

  return (
    <div className="auth-container">
      <h2>Đăng Ký</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Họ tên" onChange={(e) => setFormData({...formData, name: e.target.value})} required />
        <input type="email" placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
        <input type="password" placeholder="Mật khẩu" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
        <input type="password" placeholder="Xác nhận mật khẩu" onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} required />
        <button type="submit">Đăng Ký</button>
      </form>
    </div>
  );
};

export default Register;