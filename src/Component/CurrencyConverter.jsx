import { useState, useEffect } from 'react'

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1)
  const [rates, setRates] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('https://api.exchangerate-api.com/v4/latest/INR')
      .then(res => res.json())
      .then(data => {
        setRates(data.rates)
        setLoading(false)
      })
      .catch(() => {
        setError('API load nahi hui!')
        setLoading(false)
      })
  }, [])

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AED']

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <h3 className="text-lg font-bold mb-4">💱 Currency Converter (INR)</h3>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border rounded-lg px-4 py-2 w-full mb-4 focus:outline-none focus:border-blue-500"
        placeholder="Amount in INR"
      />

      {loading && <p className="text-gray-400">Loading rates...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {currencies.map(currency => (
            <div key={currency} className="bg-blue-50 rounded-lg p-3 text-center">
              <p className="text-sm text-gray-500">{currency}</p>
              <p className="font-bold text-blue-600">
                {(amount * rates[currency]).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CurrencyConverter