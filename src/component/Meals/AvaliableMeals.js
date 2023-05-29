import classses from "./Avalible.module.css";
import Card from "../Ui/Card";
import MeaiItem from "./MealItem/MeaiItem";
import { useEffect, useState } from "react";


export default function AvaliableMeals() {
  const [meals, setMeals] = useState([]);
  const [isLooding, setIsLooding] = useState(true);
  const[isError , setIsError] = useState()

  useEffect(() => {
    async function fetchMeals() {
      const res = await fetch(
        "https://trendy-f4c66-default-rtdb.firebaseio.com/meals.json"
      );
      if(!res.ok){
        setIsLooding(false)
        setIsError(true)
        throw new Error('something went wrong')
      }
      const data = await res.json();

      const fetchedMeals = [];
      for (const key in data) {
        fetchedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
        setMeals(fetchedMeals);
        setIsLooding(false);
      }
    }
    fetchMeals().catch(error =>{
      setIsError(error.message)
    }
    )
  }, []);


  const mealsList = meals.map((meal) => {
    return (
      <MeaiItem
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
        id={meal.id}
      />
    );
  });

  let content = <p>we found no meals</p>;
  if (meals.length > 0) {
    content = <Card>{mealsList}</Card>;
  }
  if(isLooding){
    content = <Card> loading ...</Card>
  }
  if(isError){
    content =  <Card >{isError}</Card>
  }
  return (
    <section className={classses.meals}>
      <ul>
       {content}
      </ul>
    </section>
  );
}
