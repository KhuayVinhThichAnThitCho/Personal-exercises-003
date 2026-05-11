import { useState } from "react";
import { forgotPasswordAPI } from "../services/authService";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPasswordAPI({ email });
      alert("Mã OTP đã được gửi vào email!");
      navigate("/reset-password", { state: { email } });
    } catch (error) {
      alert(error.response?.data?.message || "Email không tồn tại");
    }
  };

  return (
    <div>
      <h2>Quên Mật Khẩu</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Nhập email của bạn" onChange={(e) => setEmail(e.target.value)} required />
        <button type="submit">Gửi yêu cầu</button>
      </form>
    </div>
  );
};

export default ForgotPassword;