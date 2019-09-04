/**
 * @format
 */

import { Navigation } from 'react-native-navigation';


import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { reducer } from './src/redux/reducer';
import App from './App';
import ImageList from './src/components/ImageList';
import MainPage from './src/components/Main';
import initialState from './src/redux/initialState';

const middlewares = [thunk];

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middlewares),
);

Navigation.registerComponent('App', () => App);
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

Navigation.events().registerAppLaunchedListener(async () => {
  await Navigation.setRoot({
    root: {
      stack: {
        id: 'MainPage',
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
