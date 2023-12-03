import { useRef , useState } from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
  const [isValid , setAmountValid]=useState(true)
  const amountInputRef = useRef();
  const submitHandler = e =>
  {
    e.preventDefault()
 

    const enteredAmount = amountInputRef.current.value;
    const enterdAmountNum = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 || 
      enterdAmountNum < 1 ||
      enterdAmountNum > 5 
    ){
    setAmountValid(false)
    return;
  }
    props.onAddToCart(enterdAmountNum);
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label='Amount'
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>+ Add</button>
      {!isValid && <p>Please Enter A Valid Amount From 1 : 5</p>    }
    </form>
  );
};

export default MealItemForm;