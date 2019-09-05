/**
 * @format
 */

import { Navigation } from 'react-native-navigation';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import MainPage from './src/components/Main';
import ImageList from './src/components/ImageList';
import App from './App';
import { reducer } from './src/redux/reducer';
import {initialState} from './src/redux/initialState';

const middlewares = [thunk];

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middlewares),
);

// AppRegistry.registerComponent(appName, () => App);
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
