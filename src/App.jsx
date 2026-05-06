import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './Context/AuthContext'
import { FinanceProvider } from './Context/FinanceContext'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './Component/Navbar'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import Transactions from './Pages/Transactions'
import AddTransaction from './Pages/AddTransaction'

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()
  return user ? children : <Navigate to="/" />
}

const AppRoutes = () => {
  const { user } = useAuth()
  return (
    <>
      {user && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
        <Route path="/transactions" element={
          <ProtectedRoute><Transactions /></ProtectedRoute>
        } />
        <Route path="/add" element={
          <ProtectedRoute><AddTransaction /></ProtectedRoute>
        } />
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <FinanceProvider>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <AppRoutes />
          </div>
        </FinanceProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App