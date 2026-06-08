import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../services/auth'
import '../styles/AdminLogin.css'



type FormValues = {
    email: string,
    password: string
}

const schema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
})

export default function AdminLogin() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        resolver: yupResolver(schema)
    })

    const [serverError, setServerError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data: FormValues) => {
        setServerError(null);
        try {
            data = {
                email: 'fasihmamji@gmail.com',
                password: '123456'
            }
            const response = await authService.login(data);
            if (response.res === 'success') {
                navigate('/admin/dashboard');
            }

        } catch (err: any) {
            setServerError(err?.response?.data?.message || 'Login failed. Please check credentials.');
        }
    }

    return (
        <div className="admin-login-container">
            <div className="admin-login-wrapper">
                {/* Left Side - Image Panel */}
                <div className="admin-login-image-panel">
                    <div className="admin-login-overlay">
                        <div className="admin-login-brand">
                            <div className="admin-login-brand-icon">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                    <rect width="40" height="40" rx="8" fill="white" fillOpacity="0.2" />
                                    <path d="M20 10L28 16V24L20 30L12 24V16L20 10Z" fill="white" />
                                </svg>
                            </div>
                            <h2>Homies Admin</h2>
                            <p>Streamline your e-commerce management</p>
                        </div>
                        <div className="admin-login-features">
                            <div className="feature-item">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <span>Real-time Analytics</span>
                            </div>
                            <div className="feature-item">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <span>Inventory Management</span>
                            </div>
                            <div className="feature-item">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <span>Secure & Reliable</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="admin-login-form-panel">
                    <div className="admin-login-form-container">
                        <div className="admin-login-header">
                            <div className="admin-login-logo">
                                <img
                                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=60"
                                    alt="MyStore Logo"
                                />
                            </div>
                            <h1>Welcome Back</h1>
                            <p>Sign in to access your admin dashboard</p>
                        </div>

                        {serverError && (
                            <div className="admin-login-alert">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="12" y1="8" x2="12" y2="12"></line>
                                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                </svg>
                                {serverError}
                            </div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} noValidate className="admin-login-form">
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <div className="input-wrapper">
                                    <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                        <polyline points="22,6 12,13 2,6"></polyline>
                                    </svg>
                                    <input
                                        id="email"
                                        type="email"
                                        className={errors.email ? 'input-error' : ''}
                                        placeholder="admin@example.com"
                                        {...register('email')}
                                    />
                                </div>
                                {errors.email && (
                                    <span className="error-message">{errors.email.message}</span>
                                )}
                            </div>

                            <div className="form-group">
                                <div className="label-row">
                                    <label htmlFor="password">Password</label>
                                    <Link to="/admin/forgot-password" className="forgot-link">
                                        Forgot Password?
                                    </Link>
                                </div>
                                <div className="input-wrapper">
                                    <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                    </svg>
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        className={errors.password ? 'input-error' : ''}
                                        placeholder="Enter your password"
                                        {...register('password')}
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    >
                                        {showPassword ? (
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                                <line x1="1" y1="1" x2="23" y2="23"></line>
                                            </svg>
                                        ) : (
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                <circle cx="12" cy="12" r="3"></circle>
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <span className="error-message">{errors.password.message}</span>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="admin-login-submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="spinner"></span>
                                        Signing in...
                                    </>
                                ) : (
                                    <>
                                        Sign In
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="admin-login-footer">
                            <p>Don't have an account? <span>Contact the system administrator</span></p>
                            <div className="admin-login-divider"></div>
                            <div className="admin-login-copyright">
                                <span>© {new Date().getFullYear()} Homies. All rights reserved.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}