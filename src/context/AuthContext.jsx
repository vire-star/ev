// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check localStorage on mount
    const storedUser = localStorage.getItem('evUser')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = (phone) => {
    const existingUser = localStorage.getItem(`user_${phone}`)
    
    if (existingUser) {
      const userData = JSON.parse(existingUser)
      setUser(userData)
      localStorage.setItem('evUser', JSON.stringify(userData))
      return { isNewUser: false, user: userData }
    }
    
    // New user - mark for profile setup
    const tempUser = { phone, isNewUser: true }
    setUser(tempUser)
    return { isNewUser: true, user: tempUser }
  }

  const completeProfile = (profileData) => {
    const userData = { ...user, ...profileData, isNewUser: false }
    setUser(userData)
    localStorage.setItem('evUser', JSON.stringify(userData))
    localStorage.setItem(`user_${user.phone}`, JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('evUser')
  }

  return (
    <AuthContext.Provider value={{ user, login, completeProfile, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
