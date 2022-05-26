import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import {useEffect, useState} from "react";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
];

//we want need any props here as we dont receive any
const AvailableMeals = () => {//we need to fetch data when this component is loaded. for that we can use useEffect
  // to trigger a side effect of fetching data from the web when some data changes or when the component is loaded
  // for the first time
  const[meals, setMeals] = useState([]);
  const[isLoading, setIsLoading] = useState(true);
  const[httpError, setHttpError] = useState();

  useEffect(()=>{

    const fetchMeals = async () => {
      const response = await fetch('https://react-prep-b4fd7-default-rtdb.firebaseio.com/meals.json');

      if(!response.ok){
        throw new Error('Something went wrong');//if this error thrown, the lines there after will not execute.
      }

      const responseData = await response.json();

      const loadedMeals = [];//create empty array
      for(const key in responseData){
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });//we can use catch to handle errors

  }, []);

  if(isLoading){
    return(<section className={classes.MealsLoading}>
      <p>Loading..</p>
    </section>)
  }

  if(httpError){
    return(<section className={classes.MealsError}>
      <p>{httpError}</p>
    </section>)
  }

  // const mealsList = DUMMY_MEALS.map((meal) => (
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
