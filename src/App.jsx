import { useEffect, useState } from 'react'
import { CgPlayListAdd } from "react-icons/cg";
import { MdModeEditOutline } from "react-icons/md";
import "./App.css"
import { MdDelete } from "react-icons/md";


const getEmoji = (category) => {
  switch(category){
    case "beauty": return "💅";
    case "bills": return "📄";
    case "education": return "🎓";
    case "electronics": return "💻";
    case "entertainment": return "🎬";
    case "food": return "🍔";
    case "health": return "💊";
    case "shopping": return "🛍️";
    case "social": return "🎉";
    case "tax": return "💸";
    case "telephone": return "📱";
    case "transportation": return "🚌";
    default: return "❓";
  }
}

function App() {
  //income handing
  const [totalIncome, settotalIncome] = useState(
    ()=> JSON.parse(localStorage.getItem("totalIncome")) || 0);
  const [incomeAmount, setincomeAmount] = useState("")

  const updateIncome = ()=> {
    if(incomeAmount){
      settotalIncome(totalIncome + Number(incomeAmount))
      setincomeAmount("")
    }
    else {
      alert("Incomplete details")
    }
  }

  const deleteIncome = ()=> {
    if(totalIncome !== 0){
      settotalIncome(0)
    }
  }

  //expense handing
  const [totalExpense, settotalExpense] = useState(
    ()=> JSON.parse(localStorage.getItem("totalExpense")) || 0);
  const [expenseCategory, setexpenseCategory] = useState("")
  const [expenseAmount, setexpenseAmount] = useState("")
  const [expenses, setexpenses] = useState(
    ()=> JSON.parse(localStorage.getItem("expenses")) || []);

  useEffect(()=>{
    localStorage.setItem("totalIncome", JSON.stringify(totalIncome));
  }, [totalIncome]);
  
  useEffect(()=>{
    localStorage.setItem("totalExpense", JSON.stringify(totalExpense));
  }, [totalExpense]);

  useEffect(()=>{
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const updateExpenses = ()=> {
    if(expenseCategory && expenseAmount){
      setexpenses([...expenses, {id:Date.now(), category: expenseCategory, amount: Number(expenseAmount)}]);
      settotalIncome(totalIncome - Number(expenseAmount))
      settotalExpense(totalExpense + Number(expenseAmount))
      setexpenseAmount("")
      setexpenseCategory("")
    }
    else {
      alert("Incomplete details")
    }
  }

  const handleDelete = (e, id, amount)=> {
    let newExpenses = expenses.filter(item=> {
      return item.id !== id
    });
    setexpenses(newExpenses)
    settotalIncome(totalIncome + amount)
    settotalExpense(totalExpense - amount)
  }

    const handleEdit = (e, id, amount)=> {
      let selected = expenses.filter(item => item.id === id)
      setexpenseAmount(selected[0].amount)
      setexpenseCategory(selected[0].category)
      let newExpenses = expenses.filter(item=> {
        return item.id !== id
      });
      setexpenses(newExpenses) 
      settotalIncome(totalIncome + amount)
      settotalExpense(totalExpense - amount)
    }

  return (
    <>
      <div className="main p-2 h-screen flex flex-col items-center bg-gradient-to-r from-blue-200 to-blue-300">
        <h1 className='text-4xl font-bold p-2'>Track expenses</h1>

        <div className="Expense-income w-full h-24 flex justify-around m-2 p-2 text-xl font-bold">
          <div className="expense flex flex-col w-2/5 border-solid border-2 rounded-lg border-black flex justify-center items-center">
            <p>Expenses</p>
            <p>₹{totalExpense}</p>
          </div>
          <div className="income flex flex-col w-2/5 border-solid border-2 rounded-lg border-black flex justify-center items-center">
            <p>Balance</p>
            <p>₹{totalIncome}</p>
          </div>
        </div>

        <div className="add-income flex flex-col gap-3 w-full h-auto m-2 p-2 text-xl font-base border-solid border-2 rounded-lg border-black">
          <div className="add flex justify-center gap-3">
              <select className="w-2/4 rounded">
                <option value="">Select Income</option>
                <option value="grant">🎁 Grant</option>
                <option value="salary">💵 Salary</option>
              </select>
              <input className='w-2/5 rounded' type="number" value={incomeAmount} onChange={(e)=> setincomeAmount(e.target.value)}/>
          </div>
          <div className="buttons flex justify-center gap-3">
            <button className="px-4 py-1 bg-gray-500 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={updateIncome}><CgPlayListAdd /></button>
            <button className="px-4 py-1 bg-gray-500 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={deleteIncome}><MdDelete /></button>
          </div>
        </div>

        <div className="add-expense flex flex-col gap-3 w-full h-auto m-2 p-2 text-xl font-base border-solid border-2 rounded-lg border-black">
          <div className="add flex justify-center gap-3">
              <select className="w-2/4 rounded" value={expenseCategory} onChange={(e) => setexpenseCategory(e.target.value)}>
                <option value="">Select Expense</option>
                <option value="beauty">💅 Beauty</option>
                <option value="bills">📄 Bills</option>
                <option value="education">🎓 Education</option>
                <option value="electronics">💻 Electronics</option>
                <option value="entertainment">🎬 Entertainment</option>
                <option value="food">🍔 Food</option>
                <option value="health">💊 Health</option>
                <option value="shopping">🛍️ Shopping</option>
                <option value="social">🎉 Social</option>
                <option value="tax">💸 Tax</option>
                <option value="telephone">📱 Telephone</option>
                <option value="transportation">🚌 Transportation</option>
              </select>
              <input type="number" value={expenseAmount} onChange={(e)=> setexpenseAmount(e.target.value)} className="w-2/5 rounded"/>
          </div>
          <button className="self-center w-2/8 px-4 py-1 bg-gray-500 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={updateExpenses}><CgPlayListAdd /></button>
        </div>

        <div className="expense-list add-expense flex-1 flex flex-col gap-3 w-full h-auto m-2 p-2 text-xl font-base border-solid border-2 rounded-lg border-black overflow-scroll scrollbar-hide">
            {expenses.map(exp => {
              return <div key={exp.id} className='flex mu-2'>
                <span className='ml-2 mr-2 w-7'>{getEmoji(exp.category)}</span>
                <span className='mr-2 flex-1'>{exp.amount}</span>
                <div className="flex justify-center gap-3 w-2/8">
                  <button onClick={(e) => {handleEdit(e, exp.id, exp.amount)}}><MdModeEditOutline /></button>
                  <button onClick={(e) => {handleDelete(e, exp.id, exp.amount)}}><MdDelete /></button>
                </div>
              </div>
            })}
        </div>
      </div>
    </>
  )
}

export default App
