//react
import React from 'react';
import { useState, useEffect } from 'react';

//redux
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

//components
import Garden from './components/Garden/Garden';
import './App.css';

function App (){
  const dispatch = useDispatch();
  const plants = useSelector(store => store.plantList);
  const [newPlant, setNewPlant] = useState('');

  // const getPlants = () => {
  //   axios.get('/api/plant').then(response => {
  //     dispatch({ type: 'ADD_PLANTS', payload: response.data });
  //   })
  //   .catch(error => {
  //     console.log(`error with plant get request`, error);
  //   });
  // }

  // useEffect(() => {
  //   axios.post('/api/plant', {
  //     name: newPlant
  //   })
  //   .then(() => {
  //     dispatch({type: 'FETCH_PLANTS'});
  //     setNewPlant('');
  //   })
  //   .catch(error => {
  //     console.log(`error with plant post request`, error);
  //   })
  // })

  return(
    <div className="App">
      <header className="App-header">
        <h1>Welcome to your garden!</h1>
      </header>
      <Garden />
    </div>
  )
}

export default App;
