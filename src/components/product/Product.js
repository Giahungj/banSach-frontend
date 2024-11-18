import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formatPrice } from '../../utils/utils';
import { Link } from 'react-router-dom';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [groups, setGroups] = useState([]);  // Lưu trữ danh sách nhóm
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Lấy danh sách nhóm sản phẩm
    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/product/groups');  // API để lấy nhóm
                setGroups(response.data);
            } catch (err) {
                setError('Có lỗi khi tải nhóm sản phẩm.');
            }
        };

        fetchGroups();
    }, []);

    // Lấy tất cả sản phẩm khi component được mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/product');
                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                setError('Có lỗi khi tải sản phẩm.');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Xử lý khi chọn nhóm sản phẩm
    const handleGroupChange = async (idnhom) => {
        try {
            const response = await axios.get(`http://localhost:4000/api/product/group/${idnhom}`);
            setProducts(response.data);
        } catch (err) {
            setError('Có lỗi khi tải sản phẩm theo nhóm.');
        }
    };

    if (loading) {
        return <div>Đang tải sản phẩm...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container my-4">
            <h1 className="text-center mb-4">Danh Sách Sản Phẩm</h1>

            {/* Menu nhóm sản phẩm */}
            <div className="mb-4">
                <select onChange={(e) => handleGroupChange(e.target.value)} className="form-select">
                    <option value="">Chọn nhóm sản phẩm</option>
                    {groups.map(group => (
                        <option key={group.idnhom} value={group.idnhom}>{group.tenNhom}</option>
                    ))}
                </select>
            </div>

            <div className="row">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={product.masp}>
                            <div className="card h-100">
                                <img
                                    src={`http://localhost:4000/uploads/${product.hinhanh}`}
                                    alt={product.ten}
                                    className="card-img-top w-100"
                                    style={{ height: '400px', objectFit: 'cover' }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{product.ten}</h5>
                                    <h6 className="card-price text-danger">{formatPrice(product.gia)}</h6>
                                </div>
                                <Link to={`/detail-product/${product.masp}`} className="btn btn-primary">
                                    Xem Chi Tiết
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center">
                        <p>Không có sản phẩm nào!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Product;
