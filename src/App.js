import React, { useState } from "react";
import Cart from "./component/Cart/Cart";
import Header from './component/Layout/Header/Header';
import Meals from "./component/Meals/Meals";
import CartProvider from "./store/cartProvider";



function App() {
  const [ cartIsShown , setCartIsShown ]=useState(false);

  function showCartHandler(){
    setCartIsShown(true);
  }
  function hideCartHandler(){
    setCartIsShown(false);
  }


  return (
    <CartProvider>
      {cartIsShown && <Cart hideCartHandler={hideCartHandler}/>}
        <Header showCartHandler={showCartHandler} hideCartHandler={hideCartHandler}  />
        <main>
          <Meals />
        </main>
    </CartProvider>
  );
}

export default App;
