/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {View,StyleSheet} from 'react-native'
import MainPage from './src/components/Main'

const parentStyle= StyleSheet.create({
  container :{
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    height:'100%'
  }
})
const App = () => {
  return (
       <MainPage/>
  );
};

export default App;
