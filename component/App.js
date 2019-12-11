/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import List from './list';
import Capture from './capture';
import IOSIcon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

const tabs = createBottomTabNavigator({
  List: List,
  Capture: Capture,
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = IOSIcon;
      let iconName;
      if (routeName === 'List') {
        iconName = `ios-images`;
      } else if(routeName === 'Capture'){
        iconName = `ios-videocam`
      } 
      // You can return any component that you like here!
      return <IconComponent name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray'
  },
})

const App = createAppContainer(tabs);
export default App;