import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore,combineReducers,applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import  NavigationContainer  from './navigation/NavigationContainer';
import productsReducer from './store/reducers/products';
import authReducer from './store/reducers/auth';


const reducers=combineReducers({
  products:productsReducer,
  auth:authReducer
})

const store=createStore(reducers,applyMiddleware(thunk));

export default function App() {
  return (
     <Provider store={store}>
       <NavigationContainer/>
     </Provider>
  );
}

