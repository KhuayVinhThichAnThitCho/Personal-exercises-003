import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(loginUser({ email, password }));
    
    if (loginUser.fulfilled.match(resultAction)) {
      navigate(resultAction.payload.redirectUrl);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Mật khẩu" required />
      
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Đang xử lý..." : "Đăng nhập"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default Login;