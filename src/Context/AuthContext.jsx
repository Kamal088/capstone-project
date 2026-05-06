import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const login = (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      setUser({ username, role: 'admin' })
      return true
    }
    if (username === 'kamal' && password === '123') {
      setUser({ username, role: 'user' })
      return true
    }
    return false
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}