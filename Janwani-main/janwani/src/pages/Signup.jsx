import { useState } from "react";
import { Link } from "react-router-dom";

// Card Component
function Card({ children, className = "" }) {
  return <div className={`bg-white ${className}`}>{children}</div>;
}

function CardContent({ children, className = "" }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

// Input Component
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

// Button Component
function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`rounded-2xl px-4 py-2 font-medium shadow-md transition-colors ${className}`}
    >
      {children}
    </button>
  );
}

// Checkbox Component
function Checkbox({ id, checked, onChange }) {
  return (
    <input
      id={id}
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="h-4 w-4 rounded border-gray-300 text-orange-400 focus:ring-orange-400"
    />
  );
}

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    accept: false,
  });

  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen bg-gray-50">
      <Card className="w-[320px] rounded-2xl shadow-lg bg-white p-6">
        <CardContent className="flex flex-col items-center space-y-4">
          {/* Profile Placeholder */}
          <div className="w-24 h-24 bg-gray-200 rounded-md" />

          {/* Title */}
          <h2 className="text-xl font-bold text-black">Join us!</h2>
          <p className="text-sm text-gray-500 -mt-2">
            Please Provide your credentials
          </p>

          {/* Form Inputs */}
          <Input
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <Input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Input
            type="password"
            placeholder="Password"
            className="border-orange-400 focus:ring-orange-400"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <Input
            type="password"
            placeholder="Confirm password"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          />

          {/* Terms Checkbox */}
          <div className="flex items-center space-x-2 w-full">
            <Checkbox
              id="terms"
              checked={form.accept}
              onChange={(val) => setForm({ ...form, accept: val })}
            />
            <label htmlFor="terms" className="text-sm">
              I accept <span className="text-blue-500 cursor-pointer">Terms & Conditions</span>
            </label>
          </div>

          {/* Register Button */}
          <Button className="w-full  bg-orange-400 hover:bg-orange-500 text-white">
            Register
          </Button>

          {/* Footer */}
          <p className="text-sm text-gray-500">
            Already have an account? 
            <Link to="/login" >
              <span className="text-orange-500 cursor-pointer">Login</span>
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}