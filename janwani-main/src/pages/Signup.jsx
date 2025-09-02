import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Reusable Input Component
function Input({ type = "text", placeholder, value, onChange, className = "" }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 ${className}`}
    />
  );
}

export default function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  // Send OTP API Call
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.mobile) {
      alert("Please fill all required fields!");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8080/api/auth/send-otp", {
        fullName: form.fullName,
        email: form.email,
        mobile: form.mobile,
      });
      alert(res.data.message || "OTP sent successfully!");
      setStep(2);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP API Call
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!form.otp) {
      alert("Please enter the OTP!");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8080/janwani/sent/otp", {
        email: form.email,
        otp: form.otp,
      });
      alert(res.data.message || "OTP verified successfully!");
      setStep(3);
    } catch (error) {
      alert(error.response?.data?.message || "Invalid OTP!");
    } finally {
      setLoading(false);
    }
  };

  // Final Registration
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!form.password || !form.confirmPassword) {
      alert("Please enter password and confirm it!");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8080/janwani/signup", {
        fullName: form.fullName,
        email: form.email,
        mobile: form.mobile,
        password: form.password,
      });

      alert(res.data.message || "Registration successful!");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-[360px] rounded-2xl shadow-lg bg-white p-6">
        <h2 className="text-xl font-bold text-center text-black">Sign Up</h2>
        <p className="text-sm text-gray-500 text-center mb-4">
          Please provide your credentials
        </p>

        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-3">
            <Input
              placeholder="Full Name"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            />
            <Input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <Input
              placeholder="Mobile Number"
              value={form.mobile}
              onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-lg py-2"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-3">
            <Input
              placeholder="Enter OTP"
              value={form.otp}
              onChange={(e) => setForm({ ...form, otp: e.target.value })}
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-lg py-2"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleSignup} className="space-y-3">
            <Input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-lg py-2"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
