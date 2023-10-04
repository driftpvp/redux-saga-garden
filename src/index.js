// react
import React from 'react';
import ReactDOM from 'react-dom/client';

//redux
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga'
import {takeEvery, put} from 'redux-saga/effects'
import axios from 'axios';

//component
import App from './App';

// this startingPlantArray should eventually be removed
const startingPlantArray = [
  { id: 1, name: 'Rose' },
  { id: 2, name: 'Tulip' },
  { id: 3, name: 'Oak' }
];

const plantList = (state = startingPlantArray, action) => {
  switch (action.type) {
    case 'ADD_PLANT':
      return [ ...state, action.payload ]
    default:
      return state;
  }
};

function* fetchPlants() {
  try {
    const plantsResponse = yield axios.get('/api/plant')
    yield put({ type: 'ADD_PLANTS' , payload: plantsResponse.data});
  } catch (error) {
    console.log(`error fetching plants`, error);
  }
}

function* rootSaga(action) {
  yield takeEvery('FETCH_PLANTS', fetchPlants)
}

function* firstSaga(action) {
  console.log(`first saga was hit with action:`, action);
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({ plantList }),
  applyMiddleware(sagaMiddleware, logger),
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);