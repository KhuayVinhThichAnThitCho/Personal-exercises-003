import { useState } from "react";
import { useSelector } from "react-redux";
import { editProfileAPI } from "../services/authService";

const EditProfile = () => {
  // Lấy thông tin user hiện tại từ Redux (nếu có)
  const { user } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
    avatar: user?.avatar || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await editProfileAPI(formData);
      alert("Cập nhật thông tin thành công!");
      console.log("Dữ liệu mới:", response.data);
      // Ở đây bạn có thể dispatch 1 action để cập nhật lại user trong Redux nếu muốn
    } catch (error) {
      // Backend của bạn trả về errors array từ express-validator
      const serverError = error.response?.data?.message || error.response?.data?.errors?.[0]?.msg;
      alert(serverError || "Cập nhật thất bại");
    }
  };

  return (
    <div className="profile-container">
      <h2>Chỉnh sửa hồ sơ</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Họ tên:</label>
          <input 
            type="text" 
            value={formData.name} 
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
          />
        </div>
        <div className="form-group">
          <label>Số điện thoại:</label>
          <input 
            type="text" 
            value={formData.phone} 
            onChange={(e) => setFormData({...formData, phone: e.target.value})} 
          />
        </div>
        <div className="form-group">
          <label>Địa chỉ:</label>
          <input 
            type="text" 
            value={formData.address} 
            onChange={(e) => setFormData({...formData, address: e.target.value})} 
          />
        </div>
        <button type="submit">Lưu thay đổi</button>
      </form>
    </div>
  );
};

export default EditProfile;