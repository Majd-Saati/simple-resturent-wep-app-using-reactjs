import React, { useRef, useState } from "react";
import classes from "./CheckOut.module.css";
import CheckoutInput from "./CheckoutInput";

const Checkout = (props) => {
  const [nameIsValid, setNameIsValid] = useState(true);
  const [streetIsValid, setStreetIsValid] = useState(true);
  const [codeIsValid, setCodeIsValid] = useState(true);
  const [cityIsValid, setCityIsValid] = useState(true);

  const nameRef = useRef();
  const streetRef = useRef();
  const codeRef = useRef();
  const cityRef = useRef();
  function confirmHandler(e) {
    e.preventDefault();
    const userName = nameRef.current.value;
    const userStreet = streetRef.current.value;
    const userCode = codeRef.current.value;
    const userCity = cityRef.current.value;
    {
      userName.trim() === "" ? setNameIsValid(false) : setNameIsValid(true);
    }
    {
      userStreet.trim() === ""
        ? setStreetIsValid(false)
        : setStreetIsValid(true);
    }
    {
      userCode.trim().length === 5
        ? setCodeIsValid(true)
        : setCodeIsValid(false);
    }
    {
      userCity.trim() === "" ? setCityIsValid(false) : setCityIsValid(true);
    }

    const formIsValid =
      nameIsValid && streetIsValid && codeIsValid && cityIsValid;
    if (!formIsValid) {
      return;
    }
    const userData = {
      name: userName,
      street: userStreet,
      postal_Code: userCode,
      city: userCity,
    };
    props.onOrderConfirm(userData);
  }

  //submit code
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <CheckoutInput
        ref={nameRef}
        label="name"
        id="name"
        nameIsValid={nameIsValid}
      />
      {!nameIsValid && <p className={classes.error}>name must not be empty.</p>}

      <CheckoutInput
        ref={streetRef}
        label="street"
        id="street"
        streetIsValid={streetIsValid}
      />
      {!streetIsValid && (
        <p className={classes.error}>street must not be empty.</p>
      )}
      <CheckoutInput
        ref={codeRef}
        label="postal code"
        id="code"
        codeIsValid={codeIsValid}
      />
      {!codeIsValid && (
        <p className={classes.error}>postal code must be five numbers.</p>
      )}

      <CheckoutInput
        ref={cityRef}
        label="city"
        id="city"
        cityIsValid={cityIsValid}
      />
      {!cityIsValid && <p className={classes.error}>city must not be empty.</p>}

      <div className={classes.actions}>
        <button type="button" onClick={props.hideCartHandler}>
          Cancel
        </button>
        <button type="submit" className={classes.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
