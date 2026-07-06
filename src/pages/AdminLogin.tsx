import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../services/auth'
import '../styles/AdminLogin.css'

type FormValues = {
  email: string
  password: string
}

const schema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email address')
    .required('Email is required')
    .max(254, 'Email is too long')
    .trim(),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(128, 'Password is too long')
    .required('Password is required'),
})

const MAX_ATTEMPTS = 5
const LOCKOUT_DURATION = 5 * 60 * 1000 // 5 minutes in ms

export default function AdminLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  })

  const [serverError, setServerError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [lockedUntil, setLockedUntil] = useState<number | null>(null)
  const [lockCountdown, setLockCountdown] = useState(0)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  // Load lockout from sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem('loginLockout')
    if (stored) {
      const until = parseInt(stored, 10)
      if (until > Date.now()) {
        setLockedUntil(until)
        setAttempts(MAX_ATTEMPTS)
      } else {
        sessionStorage.removeItem('loginLockout')
      }
    }
  }, [])

  // Countdown timer for lockout
  useEffect(() => {
    if (!lockedUntil) return
    const interval = setInterval(() => {
      const remaining = Math.max(0, lockedUntil - Date.now())
      setLockCountdown(Math.ceil(remaining / 1000))
      if (remaining === 0) {
        setLockedUntil(null)
        setAttempts(0)
        sessionStorage.removeItem('loginLockout')
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [lockedUntil])

  const isLocked = lockedUntil !== null && lockedUntil > Date.now()

  const onSubmit = async (data: FormValues) => {
    if (isLocked) return
    setServerError(null)

    try {
      const sanitizedData = {
        email: data.email.trim().toLowerCase(),
        password: data.password,
      }

      const response = await authService.login(sanitizedData)

      if (response.success) {
        setSuccess(true)
        setAttempts(0)
        sessionStorage.removeItem('loginLockout')
        setTimeout(() => navigate('/admin/dashboard'), 800)
      } else {
        handleFailedAttempt()
        setServerError('Invalid credentials. Please try again.')
      }
    } catch (err: any) {
      handleFailedAttempt()
      const msg = err?.response?.data?.message
      if (err?.response?.status === 429) {
        setServerError('Too many requests. Please wait and try again.')
      } else if (err?.response?.status === 401) {
        setServerError('Invalid email or password.')
      } else {
        setServerError(msg || 'Unable to sign in. Please try again later.')
      }
    }
  }

  const handleFailedAttempt = () => {
    const newAttempts = attempts + 1
    setAttempts(newAttempts)
    if (newAttempts >= MAX_ATTEMPTS) {
      const until = Date.now() + LOCKOUT_DURATION
      setLockedUntil(until)
      sessionStorage.setItem('loginLockout', String(until))
      setServerError(`Too many failed attempts. Try again in 5 minutes.`)
      reset()
    }
  }

  const remainingAttempts = MAX_ATTEMPTS - attempts

  return (
    <div className="al-root">
      <div className="al-card">
        {/* ── Left panel ── */}
        <aside className="al-side">
          <div className="al-side-inner">
            <div className="al-logo-mark">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <rect width="36" height="36" rx="10" fill="white" fillOpacity="0.15" />
                <path d="M18 8L27 13.5V22.5L18 28L9 22.5V13.5L18 8Z" fill="white" />
              </svg>
            </div>
            <h2 className="al-side-title">Homies<br />Admin</h2>
            <p className="al-side-sub">Your command centre for the store</p>

            <ul className="al-features">
              {['Real-time Analytics', 'Inventory Control', 'Order Tracking', 'Secure Access'].map(f => (
                <li key={f} className="al-feature">
                  <span className="al-feature-dot" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="al-side-glow" />
          </div>
        </aside>

        {/* ── Right panel ── */}
        <main className="al-form-panel">
          <div className="al-form-inner">
            <header className="al-header">
              <h1>Welcome back</h1>
              <p>Sign in to your admin dashboard</p>
            </header>

            {/* Error banner */}
            {serverError && !success && (
              <div className="al-alert al-alert--error" role="alert">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{serverError}</span>
              </div>
            )}

            {/* Success banner */}
            {success && (
              <div className="al-alert al-alert--success" role="status">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Signed in — redirecting…</span>
              </div>
            )}

            {/* Lockout countdown */}
            {isLocked && (
              <div className="al-lockout">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Account temporarily locked. Try again in <strong>{lockCountdown}s</strong>.
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off" className="al-form">
              {/* Email */}
              <div className={`al-field ${errors.email ? 'al-field--error' : ''}`}>
                <label htmlFor="email">Email address</label>
                <div className="al-input-wrap">
                  <svg className="al-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    autoComplete="email"
                    disabled={isLocked || isSubmitting || success}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    aria-invalid={!!errors.email}
                    {...register('email')}
                  />
                </div>
                {errors.email && (
                  <span id="email-error" className="al-error">{errors.email.message}</span>
                )}
              </div>

              {/* Password */}
              <div className={`al-field ${errors.password ? 'al-field--error' : ''}`}>
                <div className="al-label-row">
                  <label htmlFor="password">Password</label>
                  <Link to="/admin/forgot-password" className="al-forgot" tabIndex={isLocked ? -1 : 0}>
                    Forgot password?
                  </Link>
                </div>
                <div className="al-input-wrap">
                  <svg className="al-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    disabled={isLocked || isSubmitting || success}
                    aria-describedby={errors.password ? 'password-error' : undefined}
                    aria-invalid={!!errors.password}
                    {...register('password')}
                  />
                  <button
                    type="button"
                    className="al-eye"
                    onClick={() => setShowPassword(v => !v)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <span id="password-error" className="al-error">{errors.password.message}</span>
                )}
              </div>

              {/* Attempt warning */}
              {attempts > 0 && attempts < MAX_ATTEMPTS && !isLocked && (
                <p className="al-attempts">
                  {remainingAttempts} attempt{remainingAttempts !== 1 ? 's' : ''} remaining before lockout
                </p>
              )}

              <button
                type="submit"
                className="al-submit"
                disabled={isLocked || isSubmitting || success}
              >
                {isSubmitting ? (
                  <><span className="al-spinner" />Signing in…</>
                ) : success ? (
                  <><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>Signed in</>
                ) : (
                  <>Sign in<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg></>
                )}
              </button>
            </form>

            <footer className="al-footer">
              <p>No account? <span>Contact your system administrator</span></p>
              <p className="al-copy">© {new Date().getFullYear()} Homies. All rights reserved.</p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  )
}