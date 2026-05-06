import { useFinance } from '../Context/FinanceContext'
import { useAuth } from '../Context/AuthContext'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import CurrencyConverter from '../Component/CurrencyConverter'

const Dashboard = () => {
  const { getTotalIncome, getTotalExpense, getBalance, transactions } = useFinance()
  const { user } = useAuth()

  const data = [
    { name: 'Income', value: getTotalIncome() },
    { name: 'Expense', value: getTotalExpense() },
  ]

  const COLORS = ['#22c55e', '#ef4444']

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2">
        Welcome, {user?.username}! 👋
      </h2>
      <p className="text-gray-500 mb-6">Here's your financial overview</p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-green-100 rounded-xl p-5">
          <p className="text-green-600 font-medium">Total Income</p>
          <p className="text-3xl font-bold text-green-700">
            ₹{getTotalIncome().toLocaleString()}
          </p>
        </div>
        <div className="bg-red-100 rounded-xl p-5">
          <p className="text-red-600 font-medium">Total Expense</p>
          <p className="text-3xl font-bold text-red-700">
            ₹{getTotalExpense().toLocaleString()}
          </p>
        </div>
        <div className="bg-blue-100 rounded-xl p-5">
          <p className="text-blue-600 font-medium">Balance</p>
          <p className="text-3xl font-bold text-blue-700">
            ₹{getBalance().toLocaleString()}
          </p>
        </div>
      </div>

      {/* Chart */}
      {transactions.length > 0 ? (
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h3 className="text-lg font-bold mb-4">Income vs Expense</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                {data.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow p-6 text-center text-gray-400">
          No transactions yet. Add some! 💸
        </div>
      )}

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-bold mb-4">Recent Transactions</h3>
        {transactions.length === 0 ? (
          <p className="text-gray-400 text-center">No transactions found</p>
        ) : (
          transactions.slice(-5).reverse().map(t => (
            <div key={t.id} className="flex justify-between items-center py-2 border-b">
              <div>
                <p className="font-medium">{t.description}</p>
                <p className="text-sm text-gray-400">{t.category} • {t.date}</p>
              </div>
              <p className={`font-bold ${t.type === 'income' ? 'text-green-600' : 'text-red-500'}`}>
                {t.type === 'income' ? '+' : '-'}₹{Number(t.amount).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
      <CurrencyConverter />
    </div>
    
  )
}

export default Dashboard