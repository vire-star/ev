// src/pages/ProfileSetup.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const ProfileSetup = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    vehicleType: '',
    chargingPreference: ''
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleCompleteProfile = () => {
    // Basic validation
    if (!formData.name || !formData.vehicleType) {
      toast.error('Please fill name and vehicle type')
      return
    }

    setLoading(true)

    // Update user in localStorage
    const stored = localStorage.getItem('user')
    if (stored) {
      const user = JSON.parse(stored)
      user.isProfileComplete = true
      user.profile = formData  // Save profile data
      localStorage.setItem('user', JSON.stringify(user))
    }

    setTimeout(() => {
      setLoading(false)
      toast.success('Profile setup complete! 🎉')
      navigate('/')
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-3xl">🚗</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Profile</h1>
            <p className="text-gray-600">Let's get you set up for EV charging</p>
          </div>

          <div className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input
                name="name"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100"
              />
            </div>

            {/* Vehicle Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Vehicle Type</label>
              <select
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100"
              >
                <option value="">Select your EV</option>
                <option value="tata-nexon">Tata Nexon EV</option>
                <option value="mg-zs">MG ZS EV</option>
                <option value="hyundai-kona">Hyundai Kona</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleCompleteProfile}
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 shadow-lg"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block mr-2"></div>
                  Saving...
                </>
              ) : (
                'Complete Setup & Continue'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileSetup
