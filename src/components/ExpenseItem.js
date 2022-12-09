import React from 'react';
import {MdEdit, MdDelete} from 'react-icons/md'
const ExpenseItem = ({expense,handleEdit,handleDelete}) => {
    const {id,charge,amount} = expense;
    return (
        <>
            <li className='item'>
                <div className='info'>
                    <span className='expense'>{charge}</span>
                    <span className='amount'>${amount}</span>
                    <MdEdit className='edit-btn' onClick={()=>handleEdit(id)}/>
                    <MdDelete className='clear-btn' onClick={()=>handleDelete(id)}/>
                </div>
            </li>
        </>
    );
};

export default ExpenseItem;