import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { authService } from '../services/auth'
import { Link } from 'react-router-dom'
import '../styles/ForgotPassword.css'

type FormValues = {
    email: string
}

const schema = yup.object({ 
    email: yup.string().email('Invalid email').required('Email is required') 
})

export default function ForgotPassword() {
    const { 
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<FormValues>({ resolver: yupResolver(schema) });
    
    const [message, setMessage] = useState<string | null>(null);
    const [serverError, setServerError] = useState<string | null>(null);

    const onSubmit = async (data: FormValues) => {
        setMessage(null);
        setServerError(null);
        try {
            await authService.requestPasswordReset(data.email);
            setMessage('If that email exists, a password reset link was sent.');
        } catch (err: any) {
            setServerError(err?.response?.data?.message || 'Unable to process request. Try again later.')
        }
    }

    return (
        <div className="forgot-password-container">
            <div className="forgot-password-background">
                {/* Animated background elements */}
                <div className="bg-circle circle-1"></div>
                <div className="bg-circle circle-2"></div>
                <div className="bg-circle circle-3"></div>
            </div>

            <div className="forgot-password-content">
                <div className="forgot-password-card">
                    {/* Header with icon */}
                    <div className="forgot-password-header">
                        <div className="icon-wrapper">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                <line x1="12" y1="17" x2="12.01" y2="17"></line>
                            </svg>
                        </div>
                        <h1>Forgot Password?</h1>
                        <p>No worries! Enter your email address and we'll send you a link to reset your password.</p>
                    </div>

                    {/* Success Message */}
                    {message && (
                        <div className="alert-message alert-success">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                            <span>{message}</span>
                        </div>
                    )}

                    {/* Error Message */}
                    {serverError && (
                        <div className="alert-message alert-error">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                            <span>{serverError}</span>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} noValidate className="forgot-password-form">
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

                        <button 
                            type="submit" 
                            className="forgot-password-submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="spinner"></span>
                                    Sending...
                                </>
                            ) : (
                                <>
                                    Send Reset Link
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="22" y1="2" x2="11" y2="13"></line>
                                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                    </svg>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="forgot-password-footer">
                        <div className="divider">
                            <span>OR</span>
                        </div>
                        <Link to="/admin/login" className="back-to-login">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="19" y1="12" x2="5" y2="12"></line>
                                <polyline points="12 19 5 12 12 5"></polyline>
                            </svg>
                            Back to Login
                        </Link>
                    </div>
                </div>

                {/* Additional Info Card */}
                <div className="info-card">
                    <div className="info-item">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        <div>
                            <h3>Secure Reset</h3>
                            <p>Your password reset link is encrypted and valid for 1 hour</p>
                        </div>
                    </div>
                    <div className="info-item">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        <div>
                            <h3>Need Help?</h3>
                            <p>Contact system administrator for immediate assistance</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}