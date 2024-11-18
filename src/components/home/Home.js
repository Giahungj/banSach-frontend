import React from 'react';
import { useNavigate } from 'react-router-dom';  // Thêm useNavigate

function Home() {
  const navigate = useNavigate();  // Khai báo useNavigate

  // Hàm xử lý sự kiện khi người dùng nhấn nút "Xem Sách Ngay"
  const handleViewBooks = () => {
    navigate('/product');  // Điều hướng đến trang danh sách sản phẩm
  };

  return (
    <div className="banner-container">
      <div className="banner-content">
        <h1 className="display-4 fw-bold">Chào mừng đến với cửa hàng sách của chúng tôi!</h1>
        <p className="lead">Khám phá các cuốn sách yêu thích và tìm hiểu thêm về các chương trình khuyến mãi đặc biệt!</p>
        <button onClick={handleViewBooks} className="btn btn-light btn-lg">
          Xem Sách Ngay
        </button>
      </div>
    </div>
  );
}

export default Home;
