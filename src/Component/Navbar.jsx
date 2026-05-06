import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'
import { useFinance } from '../Context/FinanceContext'

const Navbar = () => {
  const { user, logout } = useAuth()
  const { darkMode, toggleDarkMode } = useFinance()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-lg">
      <Link to="/dashboard" className="text-xl font-bold">
        💰 BudgetBuddy
      </Link>

      <div className="flex items-center gap-4">
        <Link to="/dashboard" className="hover:text-blue-200">
          Dashboard
        </Link>
        <Link to="/transactions" className="hover:text-blue-200">
          Transactions
        </Link>
        <Link to="/add" className="bg-white text-blue-600 px-3 py-1 rounded-lg font-bold hover:bg-blue-50">
          + Add
        </Link>

        <button
          onClick={toggleDarkMode}
          className="text-xl"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>

        <div className="flex items-center gap-2">
          <span className="text-sm">👤 {user?.username}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded-lg text-sm hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar