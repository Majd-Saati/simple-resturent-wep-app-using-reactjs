import React,{useContext} from 'react'
import CartContext from '../../../store/cart-context';
import classes from './MealItem.module.css'
import MealItemForm from './MealItemForm';

export default function MeaiItem(props) {
  const cartCtx = useContext(CartContext);

  function addToCart(enterdAmountNum){
    cartCtx.addItem({
      id : props.id,
      name : props.name,
      amount : enterdAmountNum,
      price : props.price,


    })

  }

    const price = `$${props.price?.toFixed(2)}`;
  return (
    <li className={classes.meal}>
        <div>
            <h3>{props.name}</h3>
            <div className={classes.description}>{props.description}</div>
            <p className={classes.price}>{price}</p>
            </div>
        <div>
            <MealItemForm addToCart={addToCart} id={props.id} />
        </div>
    </li>
  )
}
