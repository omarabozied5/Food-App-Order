import { useEffect , useState } from 'react';
import classes from './AvailableMeals.module.css'
import MealItem from './MealItem/MealItem';
import Card from '../UI/Card';


const AvailableMeals = () => {
  const [meals , setMeals] = useState([]);
  const [isLoading , setIsLoading] = useState(true);
  const [httpReq , setHttpReq] = useState();

    useEffect(() =>{
      const fetchMeals =  async () => {
      const response = await fetch('https://httpreq-2aed1-default-rtdb.firebaseio.com/meals.json')
      const responseData = await response.json();

      if(!response.ok)
      {
        throw new Error('Something went wrong !')
      }

      const loadedData = [];

      for (const key in responseData){
        loadedData.push({
          id : key,
          name : responseData[key].name ,
          description : responseData[key].description,
          price : responseData[key].price,
        })
      };
      setMeals(loadedData);
      setIsLoading(false);
    }
    fetchMeals().catch(error =>
      {
        setIsLoading(false);
        setHttpReq(error.message)
      }

    );
    },[]);

    if(isLoading)
    {
      return (
        <section className={classes.MealsLoading}>
          <p>Loading...</p>
        </section>
      )
    }
    if(httpReq)
    {
      return (
        <section className={classes.MealsError}>
          <p>Faild to fetch!!!</p>
        </section>
      )
    }


    const mealsList = meals.map((meal) => <MealItem 
        key={meal.id}
        id ={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
    />)
  return (
    <section className={classes.meals}>
      <Card>
    
        <ul>{mealsList}</ul>
   
      </Card>
    </section>
  )
}

export default AvailableMeals