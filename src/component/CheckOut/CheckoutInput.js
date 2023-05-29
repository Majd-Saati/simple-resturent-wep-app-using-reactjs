import React  from 'react'
import classes from './CheckOut.module.css'


 const  CheckoutInput = React.forwardRef((props,ref) => {
    
    return (
        <div className={classes.control}>
        <label htmlFor={props.id}>Your {props.label}</label>
        <input type={props.type} id={props.id} ref={ref}/>

      </div>
     
      )
      
})


export default CheckoutInput