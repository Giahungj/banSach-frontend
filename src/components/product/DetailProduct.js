import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  // Thêm useNavigate
import axios from 'axios';
import { formatPrice } from '../../utils/utils';  // Hàm định dạng giá

const ProductDetail = () => {
    const { id } = useParams();  // Lấy id sản phẩm từ URL
    const navigate = useNavigate();  // Khai báo useNavigate
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Hàm lấy dữ liệu chi tiết sản phẩm
        const fetchProductDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/detail-product/${id}`);
                console.log('Dữ liệu trả về từ API:', response.data);
                setProduct(response.data);
                setLoading(false);
            } catch (err) {
                setError('Không thể tải chi tiết sản phẩm.');
                setLoading(false);
            }
        };

        fetchProductDetail();
    }, [id]);  // useEffect sẽ chạy lại khi id thay đổi

    if (loading) {
        return <div>Đang tải chi tiết sản phẩm...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!product) {
        return <div>Sản phẩm không tồn tại.</div>;
    }

    // Hàm quay lại trang trước
    const handleGoBack = () => {
        navigate('/product');  // Điều hướng về trang danh sách sản phẩm
    };

    return (
        <div className="container my-4">
            <div className="card shadow-lg">
                <div className="row g-0">
                    <div className="col-md-6">
                        <img 
                            src={`http://localhost:4000/uploads/${product.hinhanh}`} 
                            alt={product.tenSP} 
                            className="img-fluid rounded-start"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                    </div>
                    <div className="col-md-6">
                        <div className="card-body">
                            <h1 className="mb-4" style={{ fontSize: '2rem', color: '#333' }}>Thông tin sản phẩm</h1>
                            <div className="p-4 mb-3 border border-dark rounded-3 shadow-sm" style={{ backgroundColor: '#f9f9f9' }}>
                                {/* Tên sản phẩm */}
                                <div className="mb-3">
                                    <p className="card-text fw-bold text-start" style={{ fontSize: '1.25rem' }}>
                                        <strong>Tên sách: </strong>{product.tenSP}
                                    </p>
                                    <hr/>
                                </div>
                                
                                {/* Thể loại */}
                                <div className="mb-3">
                                    <p className="card-text fw-bold text-start" style={{ fontSize: '1.15rem' }}>
                                        <strong>Thể loại: </strong>{product.tenNhom}
                                    </p>
                                    <hr />
                                </div>
                                 
                                {/* Mô tả */}
                                <div className="mb-3">
                                    <p className="card-text fw-bold text-start" style={{ fontSize: '1.15rem' }}>
                                        <strong>Mô tả: </strong>{product.mota}
                                    </p>
                                    <hr />
                                </div>
                                 
                                {/* Giá */}
                                <div className="mb-3">
                                    <p className="card-text fw-bold text-start" style={{ fontSize: '1.25rem' }}>
                                        <strong>Giá: </strong><span className="text-danger">{formatPrice(product.gia)}</span>
                                    </p>
                                    <hr />
                                </div>
                            </div>
                            
                            {/* Nút quay lại */}
                            <div className="d-flex justify-content-center mt-4">
                                <button onClick={handleGoBack} className="btn btn-secondary">Quay lại danh sách sản phẩm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
