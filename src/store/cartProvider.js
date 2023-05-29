import {useReducer} from "react";

import CartContext from "./cart-context";

const defaultCartState = {
    items : [],
    totalAmount : 0
}
function cartReduser (state , action){

    if(action.type ==='ADD'){
       
        const updatedtotalAmount = state.totalAmount + action.item.price * action.item.amount;
        const oldItemIdx = state.items.findIndex( (item) =>item.id === action.item.id)
        const  oldItem = state.items[oldItemIdx]
  
        let newItems;
        if(oldItem){
            newItems = [...state.items]
            const newItem ={...oldItem , amount : oldItem.amount + action.item.amount}
            newItems[oldItemIdx] = newItem
        }
        else{
            newItems = state.items.concat(action.item)
        }
        
        return {
            items :newItems , 
            totalAmount: updatedtotalAmount
        }
    }
    
    if(action.type ==='REMOVE'){
        const oldItemIdx = state.items.findIndex( (item) =>item.id === action.id)
        const  oldItem = state.items[oldItemIdx];
        const updatedtotalAmount = state.totalAmount - oldItem.price;
        let newItems;
        if(oldItem.amount ===1){
            newItems = state.items.filter(item => item.id !== action.id)
        }else{
            const newItem = {...oldItem , amount: oldItem.amount - 1};
            newItems = [...state.items]
            newItems[oldItemIdx] = newItem;
        }
        return {
            items : newItems,
            totalAmount : updatedtotalAmount
        }
    }
    if(action.type ==='CLEAR'){
        return defaultCartState;
    }
    return defaultCartState;
}


export default function CartProvider(props){
    const [cartState , dispatchCartAction] = useReducer(cartReduser , defaultCartState);

    function addItem(item){

        dispatchCartAction( {type: 'ADD', item :item });
    }; 
    function removeItem(id){
        dispatchCartAction( {type: 'REMOVE', id:id });
    }
    function clearCart(){
        dispatchCartAction({type:'CLEAR'})
    }
    
    const paramsContext = {
        items : cartState.items,
        totalAmount : cartState.totalAmount,
        addItem : addItem,
        removeItem : removeItem,
        clearCart :clearCart
    }
    
    return <CartContext.Provider value={paramsContext}>
        {props.children}
    </CartContext.Provider>
}