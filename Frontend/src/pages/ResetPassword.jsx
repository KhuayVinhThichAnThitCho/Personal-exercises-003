import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPasswordAPI } from "../services/authService";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Lấy email từ state mà trang ForgotPassword đã truyền sang
  const emailFromState = location.state?.email || "";

  const [formData, setFormData] = useState({
    email: emailFromState,
    otpCode: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await resetPasswordAPI(formData);
      alert(response.message || "Đặt lại mật khẩu thành công!");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "OTP không chính xác hoặc đã hết hạn");
    }
  };

  return (
    <div className="auth-box">
      <h2>Đặt lại mật khẩu</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" value={formData.email} disabled />
        <input 
          type="text" 
          placeholder="Nhập mã OTP 6 số" 
          onChange={(e) => setFormData({...formData, otpCode: e.target.value})} 
          required 
        />
        <input 
          type="password" 
          placeholder="Mật khẩu mới" 
          onChange={(e) => setFormData({...formData, newPassword: e.target.value})} 
          required 
        />
        <input 
          type="password" 
          placeholder="Xác nhận mật khẩu mới" 
          onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} 
          required 
        />
        <button type="submit">Xác nhận</button>
      </form>
    </div>
  );
};

export default ResetPassword;