import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import List from '../pages/List';
import Form from '../pages/Form';
import View from '../pages/View';

const Stack = createStackNavigator();

const AppNavigator = props => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="List" component={List} />
      <Stack.Screen name="Form" component={Form} />
      <Stack.Screen name="View" component={View} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
