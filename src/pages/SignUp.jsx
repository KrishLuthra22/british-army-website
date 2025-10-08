import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addDocument, getMatchingData } from "@/Firebase";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const existingUsers = await getMatchingData('users', 'email', '==', email);
            if (existingUsers.length > 0) {
                alert("user already exist");
                return;
            }
            await addDocument('users', {
                name,
                email,
                password,
                role
            });
            alert("Sign up successful!");
            setName("");
            setEmail("");
            setPassword("");
            setRole("user");
            setError("");
            navigate("/admin");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-red-700 backdrop-blur-xl bg-opacity-40">
            <div className="max-w-md w-full bg-white backdrop-blur-md rounded-2xl shadow-2xl p-10 space-y-6 border border-gray-200">
                {/* Logo & Header */}
                < div className="flex flex-col items-center text-center py-6 px-4" >

                    < h1 className="text-3xl font-extrabold text-[#162e5e] tracking-tight" >
                        Admin Portal
                    </h1 >
                    <p className="text-gray-600 text-sm mt-1">
                        Secure login for authorized BAOC administrators
                    </p>
                </div >

                {/* Error Message */}
                {error && (
                    <p className="text-red-700 text-center font-medium">{error}</p>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-blue-900 mb-1">
                                Name
                            </label>
                            <Input
                                type="text"
                                className="w-full px-4 py-3 border border-blue-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-700 focus:outline-none text-gray-800 placeholder-gray-400 transition-all hover:shadow-md"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-blue-900 mb-1">
                                Email Address
                            </label>
                            <Input
                                type="email"
                                className="w-full px-4 py-3 border border-blue-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-700 focus:outline-none text-gray-800 placeholder-gray-400 transition-all hover:shadow-md"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-blue-900 mb-1">
                                Password
                            </label>
                            <Input
                                type="password"
                                className="w-full px-4 py-3 border border-blue-200 rounded-lg bg-white focus:ring-2 focus:ring-red-700 focus:outline-none text-gray-800 placeholder-gray-400 transition-all hover:shadow-md"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-blue-900 mb-1">
                                Role
                            </label>
                            <Select value={role} onValueChange={setRole}>
                                <SelectTrigger className="w-full px-4 py-3 border border-blue-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-700 focus:outline-none text-gray-800 transition-all hover:shadow-md">
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="user">User</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 text-white font-semibold rounded-xl bg-gradient-to-r from-[#a11827] to-[#d62b2b] shadow-lg hover:from-[#d62b2b] hover:to-[#a11827] hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a11827]"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-center text-sm text-gray-700">
                    Already have an account?{" "}
                    <span
                        className="text-[#a11827] font-medium hover:underline cursor-pointer"
                        onClick={() => navigate("/admin")}
                    >
                        Login
                    </span>
                </p>

                {/* Footer */}
                <div className="text-center bg-gray-50/70 py-1 text-xs text-gray-500">
                    © 2025 BAOC · All Rights Reserved
                </div>
            </div>
        </div>
    );
};

export default SignUp;
