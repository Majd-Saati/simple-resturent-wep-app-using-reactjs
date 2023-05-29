import React , {Fragment } from 'react'
import classes from './Header.module.css'
import mealasImg from './../../../assets/imgs/meals.jpg'
import HeaderCartButton from './HeaderCartButton'

export default function Header(props) {

  return<Fragment>


      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.showCartHandler} />
      </header>
    
    <div className={classes['main-image']}>
        <img src={mealasImg} alt='A table full of delicious food! ' />
    </div>
    </Fragment>

}
