import React from 'react';
import ExpenseItem from './ExpenseItem';
import {MdDelete} from 'react-icons/md'
const ExpenseList = ({expenses,handleEdit,handleDelete,clearItems}) => {
    return (
        <>
            <ul>
                {expenses.map(expense=>{
                    return <ExpenseItem key={expense.id} 
                    expense={expense} 
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    />
                })}
            </ul>
            {expenses.length>0 
            && <button className='btn' onClick={clearItems}>
                Clear expenses 
                <MdDelete/>
                </button>
            }
            
        </>
    );
};

export default ExpenseList;