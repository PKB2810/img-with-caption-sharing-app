/**
 * @format
 */

import {Navigation} from 'react-native-navigation';
import App from './App';
import React from 'react';
import ImageList from '../spotMe/src/components/ImageList';
import MainPage from '../spotMe/src/components/Main';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {reducer} from '../spotMe/src/redux/reducer';
import initialState from '../spotMe/src/redux/initialState';

const middlewares = [thunk];

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middlewares),
);

//AppRegistry.registerComponent(appName, () => App);
Navigation.registerComponent(`App`, () => App);
Navigation.registerComponentWithRedux(
  'ImageList',
  () => ImageList,
  Provider,
  store,
);
Navigation.registerComponentWithRedux(
  'MainPage',
  () => MainPage,
  Provider,
  store,
);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        id: 'App',
        children: [
          {
            component: {
              name: 'MainPage',
            },
          },
        ],
      },
    },
  });
});
