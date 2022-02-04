import React from 'react';
import Navigator from './src/navigator';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  About,
  Intro,
  Login,
  Personinfo,
  Register,
  Splash,
  Recovery,
  Updateprofile,
  Logphone,
  Otp,
  Changesecurity,
  Help,
  Search,
  Detail,
  Hoteldetail,
  Otherdetail,
  Fullview,
} from './src/screen';

const Tab = createNativeStackNavigator();

const myTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

export default function App() {
  return (
    <NavigationContainer theme={myTheme}>
      <Tab.Navigator>
        <Tab.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Intro"
          component={Intro}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Logphone"
          component={Logphone}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Fullview"
          component={Fullview}
          options={{headerShown: false}}
        />
        <Tab.Screen name="Otp" component={Otp} options={{headerShown: false}} />
        <Tab.Screen
          name="Recovery"
          component={Recovery}
          options={{headerShown: false}}
        />
        <Tab.Screen name="Update profile" component={Updateprofile} />
        <Tab.Screen
          name="Personinfo"
          component={Personinfo}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Change Security"
          component={Changesecurity}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Help"
          component={Help}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="About"
          component={About}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Navigator"
          component={Navigator}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Detail"
          component={Detail}
          options={{headerShown: false}}
        />
         <Tab.Screen
          name="Hoteldetail"
          component={Hoteldetail}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
