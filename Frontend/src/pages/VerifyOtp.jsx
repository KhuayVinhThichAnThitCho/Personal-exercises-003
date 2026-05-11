import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOtpAPI } from "../services/authService";

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";
  const [otp, setOtp] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      await verifyOtpAPI({ email, otp });
      alert("Kích hoạt tài khoản thành công! Bạn có thể đăng nhập.");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Mã OTP không đúng");
    }
  };

  return (
    <div>
      <h2>Xác thực tài khoản</h2>
      <p>Mã OTP đã được gửi đến: <b>{email}</b></p>
      <form onSubmit={handleVerify}>
        <input type="text" placeholder="Nhập 6 số OTP" onChange={(e) => setOtp(e.target.value)} />
        <button type="submit">Xác thực</button>
      </form>
    </div>
  );
};

export default VerifyOtp;