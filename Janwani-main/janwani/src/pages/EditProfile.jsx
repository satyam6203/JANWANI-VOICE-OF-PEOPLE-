import React, { useState } from "react";
import { ArrowLeft } from 'lucide-react'
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";


export default function EditProfile() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone: "",
        state: "",
        district: "",
    });

    const navigate = useNavigate();

    const goBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate("/profile"); // fallback route if no history
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        console.log("Profile Saved:", formData);
        alert("Profile saved!");
    };

    return (
        <div className="flex  justify-center  h-screen bg-white">
            <div className="bg-white p-3 rounded-2xl  w-90 mt-4">
                <div className="  flex justify-between ">
                    <div className="flex justify-center gap-2 ">
                        <div className="flex items-center h-7 "><div className="h-10 w-10 bg-gray-400 rounded-3xl"></div></div>
                        <h2 className="text-lg bg-white font-medium mb-6">Edit Profile</h2>
                    </div>

                    <div onClick={goBack} className="mt-1"><ArrowLeft /></div>
                </div>
                <input
                    type="text"
                    name="username"
                    placeholder="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full p-4 mb-3 border rounded-md bg-[#F0F0F0] border-none"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="user@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-4 mb-3 border rounded-md bg-[#F0F0F0]  border-none"
                />

                <input
                    type="text"
                    name="phone"
                    placeholder="9086345xx2"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-4 mb-3 border rounded-md bg-[#F0F0F0]  border-none"
                />

                <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full p-4 mb-3 border rounded-md bg-[#F0F0F0]  border-none"
                />

                <input
                    type="text"
                    name="district"
                    placeholder="District"
                    value={formData.district}
                    onChange={handleChange}
                    className="w-full p-4 mb-3 border rounded-md bg-[#F0F0F0]  border-none"
                />

                <button
                    onClick={handleSave}
                    className="w-26 ml-58 mt-3 bg-[#FFA21F33] text-[#FFA21F] font-semibold py-2 rounded-md hover:bg-orange-300" rounded-md
                >
                    Save
                </button>
            </div>
            <Navbar />
        </div>


    );
}