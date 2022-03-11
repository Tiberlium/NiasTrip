import React from 'react';
import {Home, Bookmark, Log, Account} from '../screen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

const Bottom = createBottomTabNavigator();

export default function Navigator() {
  return (
    <Bottom.Navigator
      screenOptions={{tabBarShowLabel: false, tabBarStyle: styles}}>
      <Bottom.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            let icon = focused ? 'home' : 'home-outline';
            return <Icon name={icon} size={25} color="#FF5F7E" />;
          },
        }}
      />
      <Bottom.Screen
        name="Bookmark"
        component={Bookmark}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            let icon = focused ? 'bookmarks' : 'bookmarks-outline';
            return <Icon name={icon} size={25} color="#FF5F7E" />;
          },
        }}
      />
      <Bottom.Screen
        name="Log"
        component={Log}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            let icon = focused ? 'list' : 'list-outline';
            return <Icon name={icon} size={25} color="#FF5F7E" />;
          },
        }}
      />
      <Bottom.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            let icon = focused ? 'person' : 'person-outline';
            return <Icon name={icon} size={25} color="#FF5F7E" />;
          },
        }}
      />
    </Bottom.Navigator>
  );
}

const styles = {
  height: hp(9),
  width: 400,
  backgroundColor: '#38393E',
  paddingBottom:15,
};
