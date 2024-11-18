import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useUser } from "../UserContext"; // Sử dụng Context

const UserDetail = () => {
    const { userid } = useParams();
    const { setUser } = useUser(); // Truy cập hàm setUser từ Context
    const [user, setLocalUser] = useState({
        fullname: "",
        email: "",
        sex: "",
        address: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/detail-user/${userid}`);
                setLocalUser(response.data.user);
                setLoading(false);
            } catch (err) {
                setError("Không thể tải thông tin người dùng.");
                setLoading(false);
            }
        };

        fetchUserDetail();
    }, [userid]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLocalUser((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Gửi yêu cầu cập nhật thông tin lên server
            await axios.post(`http://localhost:4000/api/detail-user/${userid}/update`, user);
            alert("Cập nhật thông tin thành công!");

            // Cập nhật thông tin trong Context
            setUser((prevState) => ({
                ...prevState,
                fullname: user.fullname,
            }));
        } catch (err) {
            console.error(err);
            alert("Có lỗi xảy ra khi cập nhật thông tin.");
        }
    };

    if (loading) return <div className="text-center">Đang tải thông tin người dùng...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container my-4">
            <h1 className="mb-4 text-center">Thông Tin Người Dùng</h1>
            <div className="card shadow-sm mx-auto" style={{ maxWidth: "600px" }}>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Họ và tên</label>
                            <input
                                type="text"
                                name="fullname"
                                className="form-control"
                                value={user.fullname}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                value={user.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Giới tính</label>
                            <select
                                name="sex"
                                className="form-select"
                                value={user.sex}
                                onChange={handleInputChange}
                            >
                                <option value="Male">Nam</option>
                                <option value="Female">Nữ</option>
                                <option value="Other">Khác</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Địa chỉ</label>
                            <input
                                type="text"
                                name="address"
                                className="form-control"
                                value={user.address}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Lưu Thay Đổi
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserDetail;
