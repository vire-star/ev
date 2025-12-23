// src/utils/mockData.js
export const chargePoints = [
  { id: 1, name: 'MG Plaza Charging', location: 'Connaught Place, Delhi', type: 'Fast Charge', available: 3 },
  { id: 2, name: 'Tata Power Station', location: 'Cyber City, Gurgaon', type: 'Super Fast', available: 5 },
  { id: 3, name: 'Ather Grid Point', location: 'Indiranagar, Bangalore', type: 'Fast Charge', available: 2 },
  { id: 4, name: 'EESL Hub', location: 'Bandra West, Mumbai', type: 'Standard', available: 0 }
]

// src/components/FindCPO.jsx
import { chargePoints } from '../utils/mockData'
import { useNavigate } from 'react-router-dom'

const FindCPO = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm sticky top-0">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-3">
          <button onClick={() => navigate('/home')} className="text-2xl">←</button>
          <h1 className="text-xl font-bold">Find Charge Points</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
        {chargePoints.map((cp) => (
          <div key={cp.id} className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-gray-900">{cp.name}</h3>
                <p className="text-sm text-gray-600">{cp.location}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                cp.available > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {cp.available > 0 ? `${cp.available} Available` : 'Full'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>⚡ {cp.type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FindCPO
