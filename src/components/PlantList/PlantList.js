import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import axios from 'axios';


function PlantList() {
    const dispatch = useDispatch();
    const plants = useSelector(store => store.plantList);
    const [newPlant, setNewPlant] = useState('');

    const reduxState = useSelector(store => store);

    useEffect(() => {
        console.log('component did mount');
        axios.post('/api/plant', {
            name: newPlant
          })
          .then(() => {
            dispatch({type: 'FETCH_PLANTS'});
            setNewPlant('');
          })
          .catch(error => {
            console.log(`error with plant post request`, error);
          })
        // dispatch an action to request the plantList from the API
    }, []); 

    return (
        <div>
            <h3>This is the plant list</h3>
            <pre>{JSON.stringify(reduxState)}</pre>
        </div>
    );
}

export default PlantList;
