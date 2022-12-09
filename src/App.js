import React, { useEffect, useState } from "react";
import "./App.css"
import Alert from "./components/Alert";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

import * as uuid from "uuid";
import { MdDangerous } from "react-icons/md";

const initialExpenses = localStorage.getItem('expenses')
  ? JSON.parse(localStorage.getItem('expenses'))
  : []

function App() {
  const [expenses,setExpenses] = useState(initialExpenses)
  const [charge,setCharge] = useState('')
  const [amount,setAmount] = useState('')
  const [alert,setAlert] = useState({show:false})
  const [id,setId] = useState(0)
  const [edit,setEdit] = useState(false)

  useEffect(()=>{
    console.log('render')
    localStorage.setItem('expenses',JSON.stringify(expenses))
  },[expenses])

  function handleCharge(e){
    setCharge(e.target.value)
  }
  function handleAmount(e){
    setAmount(e.target.value)
  }
  function handleAlert({type,text}){
    setAlert({show:true,type,text})
    setTimeout(()=>{
      setAlert({show:false})
    },3000)
  }

  function handleSubmit(e){
    e.preventDefault()
    if (charge!==''&& amount>0){
      if(edit){
        let tempExpense = expenses.map(item=>{
          return item.id===id?{...item,charge,amount}:item
        })
        setExpenses(tempExpense)
        setEdit(false)
        handleAlert({type:'success',text:'Item has been edited'})
      }else{
        const singleExpense = {id:uuid.v4(),charge:charge,amount:amount}
      setExpenses([...expenses,singleExpense])
      }
      
      handleAlert({type:'success',text:'Item added successfully!'})
      setCharge('')
      setAmount('')
      
    }else{
      handleAlert({type:'danger',text:'Check out your inputs'})
      setCharge('')
      setAmount('')
    }
  }
  function clearItems(){
    setExpenses([])
    handleAlert({type:'danger',text:'All items have been deleted!'})
  }
  function handleDelete(id){
    let tempExpenses = expenses.filter(item=>
      item.id!==id
    )
    setExpenses(tempExpenses)
    handleAlert({type:'danger',text:'Item deleted successfully'})
  }
  function handleEdit(id){
    let tempExpense = expenses.find(item=>item.id===id)
    let {charge,amount} = tempExpense
    setCharge(charge)
    setAmount(amount)
    setEdit(true)
    setId(id)
  }
  return (
    <>
    {alert.show && <Alert type={alert.type} text={alert.text} />}
      
      <ExpenseForm 
      handleCharge={handleCharge} 
      charge={charge} 
      handleAmount={handleAmount} 
      amount={amount}
      handleSubmit={handleSubmit}
      edit={edit}
      />
      <ExpenseList 
      expenses={expenses}
      clearItems={clearItems}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
      /> 
      <h1>Total Spending: ${expenses.reduce((acc,cur)=>{
        return acc+=parseInt(cur.amount)
      },0)}</h1>
    </>
  );
}

export default App;
