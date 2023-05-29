import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import classes from './Modal.module.css'

function Backdrop(props){
  return <div className={classes.backdrop} onClick={props.hideCartHandler }>

    </div>
}
function ModalOverlay(props){
    return <div className={classes.modal} >
        <div className={classes.content}>
            {props.children}
        </div>
    </div>
}

const portalEle = document.getElementById('overlays');
export default function Modal(props) {
  return (
    <Fragment>
        {ReactDOM.createPortal( <Backdrop hideCartHandler={props.hideCartHandler}/> , portalEle)}
        {ReactDOM.createPortal( <ModalOverlay >{props.children}</ModalOverlay> , portalEle)}
  
      
    </Fragment>
  )
}
