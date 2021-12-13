import React from 'react';
import {View} from 'react-native';
import Navigator from './src/navigator';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login, Register} from './src/screen';
import { Accountprofile } from './src/component';

const Tab = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Navigator"
          component={Navigator}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
