import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleLogin = (e) => {
        e.preventDefault()
        console.log('Login attempt:', { email, password })
    }

    return (
        <div className="min-h-screen min-w-screen bg-gray-50 flex items-center justify-center ">
            <div className="w-[320px] rounded-2xl shadow-lg p-6">
                {/* <div className="rounded-2xl p-6  shadow-2xl"> */}
                {/* Profile Image Placeholder */}
                <div className="flex justify-center mb-6">
                    <div className="w-30 h-25 bg-gray-200 rounded-lg flex items-center justify-center">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </div>
                </div>

                {/* Welcome Text */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl text-black  mb-1 font-bold">Welcome Back!</h1>
                    <p className="text-sm text-gray-500">Please provide your credentials</p>
                </div>

                {/* Login Form */}
                <div className="space-y-4">
                    {/* Email Input */}
                    <div>
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm pr-10"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Forgot Password */}
                    <div className="text-right">
                        <button
                            type="button"
                            className="text-sm text-orange-500 hover:text-orange-600 font-medium"
                        >
                            Forgot Password?
                        </button>
                    </div>

                    {/* Login Button */}
                    <button
                        onClick={handleLogin}
                        className="w-full bg-orange-400 hover:bg-orange-500 text-white font-medium py-3 rounded-lg transition-colors duration-200 shadow-md"
                    >
                        Login
                    </button>

                    {/* Sign Up Link */}
                    <div className="text-center mt-6">
                        <p className="text-sm text-gray-600">
                            Don't have account?{' '}
                            <Link to='/signup' >
                                <button
                                    className="text-orange-500 hover:text-orange-600 font-medium"
                                >
                                    Sign Up
                                </button>
                            </Link>
                        </p>
                    </div>
                </div>
                {/* </div> */}
            </div>
        </div>
    )
}

export default Login