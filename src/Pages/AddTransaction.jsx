import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFinance } from '../Context/FinanceContext'

const AddTransaction = () => {
  const { addTransaction } = useFinance()
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    type: '',
    amount: '',
    description: '',
    category: '',
    date: ''
  })
  const [error, setError] = useState('')

  const categories = {
    income: ['Salary', 'Freelance', 'Business', 'Investment', 'Other'],
    expense: ['Food', 'Transport', 'Shopping', 'Bills', 'Health', 'Other']
  }

  const handleNext = () => {
    if (step === 1 && !form.type) {
      setError('Please select a type!')
      return
    }
    if (step === 2 && (!form.amount || !form.description)) {
      setError('Please fill all fields!')
      return
    }
    setError('')
    setStep(step + 1)
  }

  const handleSubmit = () => {
    if (!form.category || !form.date) {
      setError('Please fill all fields!')
      return
    }
    addTransaction(form)
    navigate('/transactions')
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-2">Add Transaction</h2>

      {/* Step Indicator */}
      <div className="flex gap-2 mb-6">
        {[1, 2, 3].map(s => (
          <div key={s} className={`flex-1 h-2 rounded-full ${step >= s ? 'bg-blue-600' : 'bg-gray-200'}`} />
        ))}
      </div>

      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {/* Step 1 */}
      {step === 1 && (
        <div>
          <p className="font-medium mb-4">Step 1: Select Type</p>
          <div className="flex gap-4">
            <button
              onClick={() => setForm({...form, type: 'income'})}
              className={`flex-1 py-4 rounded-xl font-bold text-lg border-2 ${form.type === 'income' ? 'border-green-500 bg-green-50 text-green-600' : 'border-gray-200'}`}
            >
              💰 Income
            </button>
            <button
              onClick={() => setForm({...form, type: 'expense'})}
              className={`flex-1 py-4 rounded-xl font-bold text-lg border-2 ${form.type === 'expense' ? 'border-red-500 bg-red-50 text-red-600' : 'border-gray-200'}`}
            >
              💸 Expense
            </button>
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div>
          <p className="font-medium mb-4">Step 2: Amount & Description</p>
          <input
            type="number"
            placeholder="Amount (₹)"
            value={form.amount}
            onChange={(e) => setForm({...form, amount: e.target.value})}
            className="w-full border rounded-lg px-4 py-3 mb-4 focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({...form, description: e.target.value})}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
          />
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div>
          <p className="font-medium mb-4">Step 3: Category & Date</p>
          <select
            value={form.category}
            onChange={(e) => setForm({...form, category: e.target.value})}
            className="w-full border rounded-lg px-4 py-3 mb-4 focus:outline-none"
          >
            <option value="">Select Category</option>
            {categories[form.type]?.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({...form, date: e.target.value})}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
          />
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3 mt-6">
        {step > 1 && (
          <button
            onClick={() => setStep(step - 1)}
            className="flex-1 py-3 border-2 border-gray-300 rounded-lg font-medium"
          >
            Back
          </button>
        )}
        {step < 3 ? (
          <button
            onClick={handleNext}
            className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700"
          >
            Next →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="flex-1 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700"
          >
            Save Transaction ✓
          </button>
        )}
      </div>
    </div>
  )
}

export default AddTransaction