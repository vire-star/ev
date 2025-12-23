// src/pages/Home.jsx
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Zap, CreditCard, Settings, LogOut, Search } from 'lucide-react'

const Home = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({})        // ← null se {} 
  const [isLoading, setIsLoading] = useState(true)  // ← NEW
  const [showChargePoints, setShowChargePoints] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) {
      const userData = JSON.parse(stored)
      setUser(userData)
      setIsLoading(false)  // ← IMMEDIATE loading false
    } else {
      setIsLoading(false)
      navigate('/', { replace: true })
    }
  }, [navigate])

 if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-200 border-t-green-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-semibold text-gray-700">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

if (!user?.isProfileComplete) {
  navigate('/login', { replace: true })
  return null  
}
  // Mock charge points data
  const chargePoints = [
    { id: 1, name: 'Tata Power - Sector 62', distance: '1.2 km', status: 'available', power: '30kW', price: '₹15/kWh' },
    { id: 2, name: ' StatiOn - MG Road', distance: '2.8 km', status: 'busy', power: '60kW', price: '₹18/kWh' },
    { id: 3, name: 'ChargeZone - DLF Cyber City', distance: '4.1 km', status: 'available', power: '50kW', price: '₹16/kWh' },
    { id: 4, name: 'Zeon - Golf Course Road', distance: '5.6 km', status: 'available', power: '120kW', price: '₹20/kWh' },
  ]

 const handleLogout = () => {
 localStorage.removeItem('user')
 navigate('/login')
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">EV Charge</h1>
                <p className="text-sm text-gray-600 capitalize">
                  {user.profile?.vehicleType.replace('-', ' ')} • {user.profile?.name}
                </p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-all font-medium"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <button
            onClick={() => setShowChargePoints(true)}
            className="group bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all border border-gray-100 hover:border-green-200"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform">
              <MapPin size={24} className="text-white" />
            </div>
            <h3 className="font-bold text-lg mb-1 text-gray-900">Find CPO</h3>
            <p className="text-sm text-gray-600">Nearby stations</p>
          </button>

          <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Zap size={24} className="text-white" />
            </div>
            <h3 className="font-bold text-lg mb-1 text-gray-900">My Sessions</h3>
            <p className="text-sm text-gray-600">Active charging</p>
          </div>

          <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <CreditCard size={24} className="text-white" />
            </div>
            <h3 className="font-bold text-lg mb-1 text-gray-900">Payments</h3>
            <p className="text-sm text-gray-600">Transaction history</p>
          </div>

          <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Settings size={24} className="text-white" />
            </div>
            <h3 className="font-bold text-lg mb-1 text-gray-900">Settings</h3>
            <p className="text-sm text-gray-600">Profile & preferences</p>
          </div>
        </div>

        {/* Charge Points Modal */}
        {showChargePoints && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl">
              {/* Header */}
              <div className="sticky top-0 bg-white/100 backdrop-blur border-b border-gray-200 p-6 rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-2xl flex items-center justify-center">
                      <Search size={20} className="text-white" />
                    </div>
                    <div>
                      <h2 className="font-bold text-2xl text-gray-900">Nearby Charge Points</h2>
                      <p className="text-sm text-gray-600">4 stations found</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowChargePoints(false)}
                    className="p-2 hover:bg-gray-200 rounded-xl transition-all"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* List */}
              <div className="p-6 space-y-4">
                {chargePoints.map((point) => (
                  <div key={point.id} className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl hover:shadow-md transition-all border">
                    <div className={`w-3 h-3 rounded-full ${point.status === 'available' ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg text-gray-900 truncate">{point.name}</h3>
                      <p className="text-sm text-gray-600">{point.distance} away</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-xl text-green-600">{point.power}</div>
                      <div className="text-xs text-gray-500">{point.price}</div>
                    </div>
                    <button className="ml-4 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl">
                      Start
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
