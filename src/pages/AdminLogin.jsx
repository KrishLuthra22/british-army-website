import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
// import { BAOC_vertical_logo } from "../assets";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email === "admin@baoc.com" && password === "admin123") {
            alert("Login successful!");
            login();
            setEmail("");
            setPassword("");
            setError("");
            navigate("/");
        } else {
            setError("Invalid email or password");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-red-700 p-6">
            <div className="relative bg-white/95 backdrop-blur-md shadow-2xl rounded-3xl w-full max-w-md overflow-hidden border border-blue-100">
                {/* Accent Bar */}

                {/* Logo & Header */}
                <div className="flex flex-col items-center text-center py-8 px-6">
                    {/* <img
                        src={BAOCLogo}
                        alt="BAOC Logo"
                        className="w-20 h-20 mb-3 drop-shadow-md"
                    /> */}
                    <h1 className="text-3xl font-extrabold text-blue-900 tracking-tight">
                        Admin Portal
                    </h1>
                    <p className="text-gray-600 text-sm mt-1">
                        Secure login for authorized BAOC administrators
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-6">
                    <div className="mb-9
                    ">
                        <div className="mb-5">
                            <label className="block text-sm font-semibold text-blue-900 mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                className="w-full p-3 border border-blue-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-700 focus:outline-none text-gray-800 placeholder-gray-400 transition-all"
                                placeholder="admin@baoc.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mt-5">
                            <label className="block text-sm font-semibold text-blue-900 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                className="w-full p-3 border border-blue-200 rounded-lg bg-white focus:ring-2 focus:ring-red-700 focus:outline-none text-gray-800 placeholder-gray-400 transition-all"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {error && (
                            <p className="text-red-700 text-sm text-center font-medium">
                                {error}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-700 to-red-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:opacity-90 active:scale-[0.98] transition-all"
                    >
                        Login
                    </button>
                </form>

                {/* Footer */}
                <div className="text-center bg-gray-50/70 py-3 text-xs text-gray-500 border-t border-gray-200">
                    © 2025 BAOC Admin Portal · All Rights Reserved
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
