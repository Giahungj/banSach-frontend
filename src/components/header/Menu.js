import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useUser } from "../UserContext";

function Menu() {
    const { user, setUser } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("jwt");
                if (token) {
                    const response = await axios.get("http://localhost:4000/api/getUser", {
                        withCredentials: true,
                    });
                    if (response.data.user) {
                        setUser(response.data.user);
                    }
                }
            } catch (error) {
                console.error("Error fetching user:", error);
                setUser(null);
            }
        };

        fetchUser();
    }, [setUser]);

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:4000/api/logout", {}, { withCredentials: true });
            setUser(null);
            localStorage.removeItem("jwt");
            navigate("/login");
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    const list = [
        { link: "/home", content: "Trang chủ" },
        { link: "/product", content: "Sản phẩm" },
    ];

    const renderItem = list.map((ls, index) => (
        <li key={index} className="nav-item">
            <Link className="nav-link text-dark fw-bold" to={ls.link}>
                {ls.content}
            </Link>
        </li>
    ));

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <div className="container-fluid">
                <Link className="navbar-brand fw-bold text-dark" to="/">
                    React
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {renderItem}
                    </ul>
                    {user ? (
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link text-dark fw-bold" to={`/detail-user/${user.userid}`}>
                                    Xin chào: <a className="text-decoration-underline">{user.fullname}</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-outline-danger" onClick={handleLogout}>
                                    Đăng xuất
                                </button>
                            </li>
                        </ul>
                    ) : (
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="btn btn-dark" to="/login">
                                    Đăng nhập
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Menu;
