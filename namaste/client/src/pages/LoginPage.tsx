import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';

const LoginPage: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate("/");
        console.log('Login attempted with:', formData);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Left Side - Image */}
            <div className="hidden lg:flex lg:w-1/2 bg-blue-900 relative">
                <div className="absolute inset-0 bg-opacity-30"></div>
                <img
                    src="/green-leaves-frame-on-green-background-trendy-origami-paper-cut-style-vector-illustration.webp"
                    alt="NAMASTE Healthcare System"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center p-12">
                    <div className="text-center text-white">
                        <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-4xl">🏥</span>
                        </div>
                        <h2 className="text-4xl font-bold mb-4 text-slate-600">Welcome to NAMASTE</h2>
                        <p className="text-xl mb-2 text-slate-900">राष्ट्रीय आयुर्वेद मानक और शब्दावली विनिमय</p>
                        <p className="text-lg text-slate-600">National Ayurveda Medical Standards & Terminology Exchange</p>
                        {/* <div className="mt-8 text-sm text-blue-100">
                            <p>✓ FHIR R4 Compliant</p>
                            <p>✓ WHO ICD-11 Integrated</p>
                            <p>✓ Government Approved</p>
                        </div> */}
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    {/* Government Header */}
                    <div className="text-center mb-8">
                        <Link to="/" className="inline-block mb-4">
                            <div className="flex items-center justify-center">
                                <div className="w-12 h-12 bg-orange-100 rounded flex items-center justify-center mr-3">
                                    <span className="text-orange-600 font-bold text-xl">🇮🇳</span>
                                </div>
                                <div className="text-left">
                                    <h1 className="text-lg font-bold text-gray-900">Government of India</h1>
                                    <p className="text-sm text-gray-600">Ministry of AYUSH</p>
                                </div>
                            </div>
                        </Link>
                        <div className="h-px bg-gray-200 mb-6"></div>
                    </div>

                    <Card className="border border-gray-200 shadow-lg">
                        <CardHeader className="text-center">
                            <CardTitle className="text-2xl font-bold text-gray-900">
                                Sign In
                            </CardTitle>
                            <p className="text-gray-600 mt-2">
                                Access your NAMASTE Healthcare account
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Email Field */}
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                </div>

                                {/* Password Field */}
                                <div className="space-y-2">
                                    <label htmlFor="password" className="text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <input
                                            id="password"
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            required
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                            placeholder="Enter your password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Remember Me and Forgot Password */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="remember-me"
                                            name="remember-me"
                                            type="checkbox"
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                            Remember me
                                        </label>
                                    </div>
                                    <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                                        Forgot password?
                                    </a>
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-base font-medium border-0"
                                >
                                    Sign In
                                </Button>
                            </form>

                            {/* Divider */}
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or</span>
                                </div>
                            </div>

                            {/* Sign Up Link */}
                            <div className="text-center">
                                <p className="text-sm text-gray-600">
                                    Don't have an account?{' '}
                                    <Link to="/sign-up" className="font-medium text-blue-600 hover:text-blue-500">
                                        Create account
                                    </Link>
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Footer */}
                    <div className="mt-8 text-center text-xs text-gray-500">
                        <p>© 2025 Government of India. All rights reserved.</p>
                        <p className="mt-1">Secured by Digital India Initiative</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
