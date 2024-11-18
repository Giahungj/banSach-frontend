import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        fullname: "",
        address: "",
        sex: "",
        email: "",
        role: "user",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:4000/api/register", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setMessage("Created successfully");
            navigate("/login");
        } catch (error) {
            setMessage(
                error.response ? error.response.data.message : "An error occurred"
            );
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="card shadow-sm p-4" style={{ width: "30rem" }}>
                <h2 className="text-center mb-4">Create Account</h2>
                {message && (
                    <div className="alert alert-danger text-center" role="alert">
                        {message}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                            Username
                        </label>
                        <input
                            value={formData.username}
                            onChange={handleChange}
                            type="text"
                            id="username"
                            name="username"
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            value={formData.password}
                            onChange={handleChange}
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="fullname" className="form-label">
                            Full Name
                        </label>
                        <input
                            value={formData.fullname}
                            onChange={handleChange}
                            type="text"
                            id="fullname"
                            name="fullname"
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">
                            Address
                        </label>
                        <input
                            value={formData.address}
                            onChange={handleChange}
                            type="text"
                            id="address"
                            name="address"
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="sex" className="form-label">
                            Sex
                        </label>
                        <select
                            value={formData.sex}
                            onChange={handleChange}
                            id="sex"
                            name="sex"
                            className="form-select"
                        >
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Register
                    </button>
                </form>
                <p className="text-center mt-3">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
}
