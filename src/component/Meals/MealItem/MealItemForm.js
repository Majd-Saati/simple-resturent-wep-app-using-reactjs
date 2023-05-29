import React , { useState,useRef} from 'react'
import Input from '../../Ui/Input'
import classes from './MealItemForm.module.css'

export default function MealItemForm(props) {
  const [amountIsValid , setAmountIsValid] = useState(true)
  const amountInptRef = useRef();

  function submitHandler(e){
    e.preventDefault();

    const enterdAmount = amountInptRef.current.value;
    const enterdAmountNum = +enterdAmount;


    if(enterdAmountNum.length === 0 || enterdAmountNum<1 || enterdAmountNum>5){
      setAmountIsValid(false);
      return;
    }

    props.addToCart(enterdAmountNum);

  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
        <Input
            ref={amountInptRef} 
            label="Amount"
            input ={{
            id : "amount_"+props.id,
            type:"number",
            min : "1",
            max : "5",
            step :"1",
            defaultValue :'1'
        }} />
        <button>+ Add</button>
        {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  )
}
