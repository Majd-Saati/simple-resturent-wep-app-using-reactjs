import React , {useContext} from 'react'
import CartIcon from '../../Cart/CartIcon';
import classes from './HeaderCartButton.module.css'
import CartContext from '../../../store/cart-context';
import { useEffect, useState } from 'react';


export default function HeaderCartButton(props) {
  const [btnIsHightLighted , setBtnIsHightLighted] = useState(false);
  const cartCtx = useContext(CartContext);
  const {items} = cartCtx
  
  const numberOfCartItems = items.reduce( (curNum , item ) =>{
    return curNum + item.amount;
  } , 0); 

  useEffect(()=>{
    if(items.length ===0){
      return;
    }
    setBtnIsHightLighted(true)

    const timer = setTimeout(() => {
      setBtnIsHightLighted(false)
    }, 300);
    return ()=>{
      clearTimeout(timer)
    }
  },[items])


  const btnClasses = `${classes.button} ${btnIsHightLighted ?classes.bump : ''}`
  return (
      <button className={btnClasses} onClick={props.onClick }>

        <span className={classes.icon}><CartIcon/></span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>

    </button>
  )
}
