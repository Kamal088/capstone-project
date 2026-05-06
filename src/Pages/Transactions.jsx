import { useState } from 'react'
import { useFinance } from '../Context/FinanceContext'

const Transactions = () => {
  const { transactions, deleteTransaction } = useFinance()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('newest')

  const filtered = transactions
    .filter(t => {
      const matchSearch = t.description.toLowerCase().includes(search.toLowerCase())
      const matchFilter = filter === 'all' ? true : t.type === filter
      return matchSearch && matchFilter
    })
    .sort((a, b) => {
      if (sort === 'newest') return b.id - a.id
      if (sort === 'oldest') return a.id - b.id
      if (sort === 'highest') return Number(b.amount) - Number(a.amount)
      if (sort === 'lowest') return Number(a.amount) - Number(b.amount)
      return 0
    })

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">All Transactions</h2>

      {/* Search + Filter + Sort */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 flex-1 focus:outline-none focus:border-blue-500"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded-lg px-4 py-2 focus:outline-none"
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border rounded-lg px-4 py-2 focus:outline-none"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="highest">Highest Amount</option>
          <option value="lowest">Lowest Amount</option>
        </select>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-xl shadow">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 p-8">No transactions found</p>
        ) : (
          filtered.map(t => (
            <div key={t.id} className="flex justify-between items-center p-4 border-b hover:bg-gray-50">
              <div>
                <p className="font-medium">{t.description}</p>
                <p className="text-sm text-gray-400">{t.category} • {t.date}</p>
              </div>
              <div className="flex items-center gap-4">
                <p className={`font-bold ${t.type === 'income' ? 'text-green-600' : 'text-red-500'}`}>
                  {t.type === 'income' ? '+' : '-'}₹{Number(t.amount).toLocaleString()}
                </p>
                <button
                  onClick={() => deleteTransaction(t.id)}
                  className="text-red-400 hover:text-red-600 text-sm"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Transactions