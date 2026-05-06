import { createContext, useContext, useState, useEffect } from 'react'

const FinanceContext = createContext()

export const useFinance = () => useContext(FinanceContext)

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions')
    return saved ? JSON.parse(saved) : []
  })

  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
  }, [transactions])

  const addTransaction = (transaction) => {
    setTransactions([...transactions, { 
      ...transaction, 
      id: Date.now() 
    }])
  }

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id))
  }

  const getTotalIncome = () =>
    transactions.filter(t => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount), 0)

  const getTotalExpense = () =>
    transactions.filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount), 0)

  const getBalance = () => getTotalIncome() - getTotalExpense()

  const toggleDarkMode = () => setDarkMode(!darkMode)

  return (
    <FinanceContext.Provider value={{
      transactions,
      addTransaction,
      deleteTransaction,
      getTotalIncome,
      getTotalExpense,
      getBalance,
      darkMode,
      toggleDarkMode
    }}>
      {children}
    </FinanceContext.Provider>
  )
}