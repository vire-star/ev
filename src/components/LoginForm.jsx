// src/components/LoginForm.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { useAuth } from '../context/AuthContext'
import { validateInput } from '../utils/validation'
import toast from 'react-hot-toast'
import { Phone, Mail, ArrowRight, ArrowLeft, Shield } from 'lucide-react'

const LoginForm = () => {
  const [loginType, setLoginType] = useState('phone')
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const [showOTP, setShowOTP] = useState(false)
  const [otp, setOtp] = useState(['', '', '', ''])
  const [loading, setLoading] = useState(false)
  
  
  const navigate = useNavigate()

  const handleSendOTP = (e) => {
    e.preventDefault()
    
    const validation = validateInput(input, loginType)
    
    if (!validation.isValid) {
      setError(validation.error)
      return
    }
    
    setLoading(true)
    setError('')
    
    // Simulate API delay
    setTimeout(() => {
      setShowOTP(true)
      setLoading(false)
      toast.success('OTP sent successfully! Use 1234')
    }, 1000)
  }

  const handleOTPChange = (index, value) => {
    if (isNaN(value)) return
    
    const newOTP = [...otp]
    newOTP[index] = value
    setOtp(newOTP)
    
    // Auto-focus next input
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus()
    }
    
    setError('')
  }

  const handleOTPKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus()
    }
  }

 const handleLogin = (e) => {
  e.preventDefault()

  const otpValue = otp.join('')

  if (otpValue.length !== 4) {
    setError('Please enter complete OTP')
    return
  }

  if (otpValue !== '1234') {
    setError('Invalid OTP. Please use 1234')
    return
  }

  setLoading(true)

  // Fake user object – yahan tum API se jo aata hai wo rakh sakte ho
  const userData = {
    identifier: input,          // phone/email
    loginType,
    isProfileComplete: false,   // yahi flag se decide hoga new / existing
  }

  // Save in localStorage
  localStorage.setItem('user', JSON.stringify(userData))

  // Ab condition ke basis pe navigate
  if (userData.isProfileComplete) {
    navigate('/home')           // existing user
  } else {
    navigate('/profile-setup')  // new user
  }

  setLoading(false)
}


  const resetForm = () => {
    setShowOTP(false)
    setOtp(['', '', '', ''])
    setError('')
    setInput('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-5xl">⚡</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight">EV Charge</h1>
              <p className="text-green-100 text-sm mt-2">
                {showOTP ? 'Verify your identity' : 'Welcome back!'}
              </p>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8">
            {!showOTP ? (
              /* Phone/Email Input Screen */
              <form onSubmit={handleSendOTP} className="space-y-6">
                {/* Login Type Selector */}
                <div className="flex gap-3 p-1 bg-gray-100 rounded-xl">
                  <button
                    type="button"
                    onClick={() => {
                      setLoginType('phone')
                      setInput('')
                      setError('')
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                      loginType === 'phone'
                        ? 'bg-white shadow-md text-green-600 scale-105'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Phone size={18} />
                    Phone
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginType('email')
                      setInput('')
                      setError('')
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                      loginType === 'email'
                        ? 'bg-white shadow-md text-green-600 scale-105'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Mail size={18} />
                    Email
                  </button>
                </div>

                {/* Input Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    {loginType === 'phone' ? 'Phone Number' : 'Email Address'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      {loginType === 'phone' ? (
                        <Phone size={20} className="text-gray-400" />
                      ) : (
                        <Mail size={20} className="text-gray-400" />
                      )}
                    </div>
                    <input
                      type={loginType === 'phone' ? 'tel' : 'email'}
                      value={input}
                      onChange={(e) => {
                        setInput(e.target.value)
                        setError('')
                      }}
                      placeholder={
                        loginType === 'phone'
                          ? 'Enter 10-digit mobile number'
                          : 'Enter your email address'
                      }
                      className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                        error
                          ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                          : 'border-gray-200 bg-white focus:border-green-500 focus:ring-4 focus:ring-green-100'
                      }`}
                      maxLength={loginType === 'phone' ? 10 : undefined}
                      autoFocus
                    />
                  </div>
                  {error && (
                    <p className="text-red-600 text-sm flex items-center gap-1 animate-shake">
                      <span className="text-lg">⚠️</span>
                      {error}
                    </p>
                  )}
                </div>

                {/* Send OTP Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending OTP...
                    </>
                  ) : (
                    <>
                      Send OTP
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>

                {/* Info Text */}
                <p className="text-center text-xs text-gray-500 mt-4">
                  We'll send a one-time password to verify your{' '}
                  {loginType === 'phone' ? 'number' : 'email'}
                </p>
              </form>
            ) : (
              /* OTP Verification Screen */
              <form onSubmit={handleLogin} className="space-y-6">
                {/* OTP Info */}
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center">
                    <Shield size={32} className="text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Enter Verification Code
                  </h3>
                  <p className="text-sm text-gray-600">
                    We sent a code to{' '}
                    <span className="font-semibold text-gray-900">{input}</span>
                  </p>
                </div>

                {/* OTP Input Boxes */}
                <div className="flex justify-center gap-3">
                  {[0, 1, 2, 3].map((index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      value={otp[index]}
                      onChange={(e) => handleOTPChange(index, e.target.value)}
                      onKeyDown={(e) => handleOTPKeyDown(index, e)}
                      maxLength={1}
                      className={`w-16 h-16 text-center text-2xl font-bold border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                        error
                          ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                          : otp[index]
                          ? 'border-green-500 bg-green-50 focus:ring-4 focus:ring-green-100'
                          : 'border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100'
                      }`}
                    />
                  ))}
                </div>

                {error && (
                  <p className="text-red-600 text-sm text-center flex items-center justify-center gap-1 animate-shake">
                    <span className="text-lg">⚠️</span>
                    {error}
                  </p>
                )}

                {/* Verify Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Verifying...
                    </>
                  ) : (
                    <>
                      Verify & Continue
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>

                {/* Resend & Change */}
                <div className="flex items-center justify-between text-sm">
                  <button
                    type="button"
                    onClick={() => {
                      toast.success('OTP resent! Use 1234')
                      setOtp(['', '', '', ''])
                      setError('')
                    }}
                    className="text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
                  >
                    Resend OTP
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="text-gray-600 hover:text-gray-900 font-medium flex items-center gap-1"
                  >
                    <ArrowLeft size={16} />
                    Change {loginType}
                  </button>
                </div>

                {/* Test Hint */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
                  <p className="text-xs text-yellow-800">
                    💡 <span className="font-semibold">Test OTP:</span> 1234
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 text-center border-t border-gray-200">
            <p className="text-xs text-gray-500">
              By continuing, you agree to our{' '}
              <a href="#" className="text-green-600 hover:underline">
                Terms
              </a>{' '}
              &{' '}
              <a href="#" className="text-green-600 hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Need help?{' '}
            <a href="#" className="text-green-600 hover:text-green-700 font-medium">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
