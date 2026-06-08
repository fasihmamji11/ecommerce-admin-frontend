import { useState } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { authService } from '../services/auth'
import '../styles/ResetPassword.css'


type FormValues = {
    password: string,
    confirm: string
}

const schema = yup.object({
    password: yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
    confirm: yup.string().oneOf([yup.ref('password')], 'Password must match').required('Confirm password'),
})

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token') || '';
    const navigate = useNavigate();
    
    const { 
        register,
        handleSubmit,
        formState: { errors, isSubmitting } 
    } = useForm<FormValues>({ resolver: yupResolver(schema) })
    
    const [message, setMessage] = useState<string | null>(null);
    const [serverError, setServerError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const onSubmit = async (data: FormValues) => {
        setMessage(null);
        setServerError(null);

        try {
            await authService.resetPassword(token, data.password);
            setMessage('Password reset successful! Redirecting to login...');
            setTimeout(() => navigate('/admin/login'), 1600)
        } catch (err: any) {
            setServerError(err?.response?.data?.message || 'Unable to reset password');
        }
    }

    // Invalid/Missing Token View
    if (!token) {
        return (
            <div className="reset-password-container">
                <div className="reset-password-background">
                    <div className="bg-circle circle-1"></div>
                    <div className="bg-circle circle-2"></div>
                    <div className="bg-circle circle-3"></div>
                </div>

                <div className="reset-password-content">
                    <div className="reset-password-card">
                        <div className="error-state">
                            <div className="error-icon">
                                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="12" y1="8" x2="12" y2="12"></line>
                                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                </svg>
                            </div>
                            <h1>Invalid or Missing Token</h1>
                            <p>The password reset link is invalid or has expired. Please request a new password reset link to continue.</p>
                            
                            <div className="error-actions">
                                <Link to="/admin/forgot-password" className="btn-primary">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                    </svg>
                                    Request New Link
                                </Link>
                                <Link to="/admin/login" className="btn-secondary">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="19" y1="12" x2="5" y2="12"></line>
                                        <polyline points="12 19 5 12 12 5"></polyline>
                                    </svg>
                                    Back to Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Reset Password Form View
    return (
        <div className="reset-password-container">
            <div className="reset-password-background">
                <div className="bg-circle circle-1"></div>
                <div className="bg-circle circle-2"></div>
                <div className="bg-circle circle-3"></div>
            </div>

            <div className="reset-password-content">
                <div className="reset-password-card">
                    {/* Header */}
                    <div className="reset-password-header">
                        <div className="icon-wrapper">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                        </div>
                        <h1>Set New Password</h1>
                        <p>Create a strong password for your admin account. Make sure it's at least 6 characters long.</p>
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
                    <form onSubmit={handleSubmit(onSubmit)} noValidate className="reset-password-form">
                        {/* New Password Field */}
                        <div className="form-group">
                            <label htmlFor="password">New Password</label>
                            <div className="input-wrapper">
                                <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                </svg>
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    className={errors.password ? 'input-error' : ''}
                                    placeholder="Enter new password"
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

                        {/* Confirm Password Field */}
                        <div className="form-group">
                            <label htmlFor="confirm">Confirm Password</label>
                            <div className="input-wrapper">
                                <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <input
                                    id="confirm"
                                    type={showConfirm ? 'text' : 'password'}
                                    className={errors.confirm ? 'input-error' : ''}
                                    placeholder="Confirm new password"
                                    {...register('confirm')}
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowConfirm(!showConfirm)}
                                    aria-label={showConfirm ? 'Hide password' : 'Show password'}
                                >
                                    {showConfirm ? (
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
                            {errors.confirm && (
                                <span className="error-message">{errors.confirm.message}</span>
                            )}
                        </div>

                        {/* Password Requirements */}
                        <div className="password-requirements">
                            <h4>Password Requirements:</h4>
                            <ul>
                                <li>At least 6 characters long</li>
                                <li>Include numbers and letters for better security</li>
                            </ul>
                        </div>

                        <button 
                            type="submit" 
                            className="reset-password-submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="spinner"></span>
                                    Resetting...
                                </>
                            ) : (
                                <>
                                    Reset Password
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="reset-password-footer">
                        <div className="divider"></div>
                        <Link to="/admin/login" className="back-to-login">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="19" y1="12" x2="5" y2="12"></line>
                                <polyline points="12 19 5 12 12 5"></polyline>
                            </svg>
                            Back to Login
                        </Link>
                    </div>
                </div>

                {/* Security Info Card */}
                <div className="info-card">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                    <div>
                        <h3>Secure Password Reset</h3>
                        <p>Your password is encrypted and stored securely. This reset link is valid for one-time use only.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}