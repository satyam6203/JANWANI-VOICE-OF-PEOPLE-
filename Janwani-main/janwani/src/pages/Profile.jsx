import { useState,navlink } from "react";
import { Link } from "react-router-dom";
import { Pencil, Bell, Mail, HelpCircle, LogOut, Trash2, Home, Ticket, User } from "lucide-react";
import Navbar from "../Components/Navbar";

// Card Component
function Card({ children, className = "" }) {
  return <div className={`rounded-xl bg-gray-100 px-4 py-3 flex justify-between items-center ${className}`}>{children}</div>;
}

// Button Component
function Button({ children, className = "", onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex justify-between items-center rounded-xl px-4 py-3 font-medium ${className}`}
    >
      {children}
    </button>
  );
}

// Profile Page
export default function Profile() {
  const [username] = useState("Username");

  const handleEditProfile = () => {};
  const handleNotifications = () => {};
  const handleSupport = () => {};
  const handleFAQ = () => {};
  const handleLogout = () => {};
  const handleDeleteAccount = () =>{};

  return (
    <div className="flex flex-col items-center min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="flex flex-col items-center mt-8">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-3xl">
          👤
        </div>
        <h2 className="mt-3 text-lg font-bold">{username}</h2>
      </div>

      {/* Options */}
      <div className=" flex flex-col gap-2 mt-6 space-y-3 w-[90%] max-w-sm">
        <Link to="/profile/editprofile" >
          <Card>
            <span>Edit Your Profile</span>
            <Pencil className="w-5 h-5 text-gray-500" onClick={handleEditProfile} />
          </Card>
        </Link>

        <Card>
          <span>Notifications</span>
          <Bell className="w-5 h-5 text-gray-500" onClick={handleNotifications} />
        </Card>

        <Card>
          <span>Support and Help</span>
          <Mail className="w-5 h-5 text-gray-500" onClick={handleSupport} />
        </Card>

        <Card>
          <span>FAQ's</span>
          <HelpCircle className="w-5 h-5 text-gray-500" onClick={handleFAQ} />
        </Card>

        <Button onClick={handleLogout} className="bg-orange-100 text-orange-500 hover:bg-orange-200">
          <span>Log out</span>
          <LogOut className="w-5 h-5" />
        </Button>

        <Button onClick={handleDeleteAccount} className="bg-red-100 text-red-500 hover:bg-red-200">
          <span>Delete My Account</span>
          <Trash2 className="w-5 h-5" />
        </Button>
      </div>

      {/* Bottom Navigation */}
      <Navbar />

    </div>
  );
}