import React from 'react';
import {LogBox} from 'react-native';
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
  Changesecurity,
  Help,
  Search,
  Detail,
  Hoteldetail,
  Eventdetail,
  Fullview,
  Makanangroup,
  Eventgroup,
  Fooddetail,
  Map,
  Paymenthotel,
  Receipt,
  Rm,
  Hotelgroup,
  Rmgroup,
  Byeditor,
  Commentscreen,
  Paymentevent,
  Coupon,
} from './src/screen';
import {Btnhome, Btnhredirect} from './src/component';
const Tab = createNativeStackNavigator();
const myTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

export default function App() {
  LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'."]);
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
          name="Fullview"
          component={Fullview}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Hotelgroup"
          component={Hotelgroup}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Makanangroup"
          component={Makanangroup}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Eventgroup"
          component={Eventgroup}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Recovery"
          component={Recovery}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Update profile"
          component={Updateprofile}
          options={{title: 'Perbarui profil'}}
        />
        <Tab.Screen
          name="Paymenthotel"
          component={Paymenthotel}
          options={{
            headerLeft: () => <Btnhome />,
            title: 'Pembayaran hotel',
          }}
        />
        <Tab.Screen
          name="Paymentevent"
          component={Paymentevent}
          options={{
            headerLeft: () => <Btnhome />,
            title: 'Pembayaran tiket event',
          }}
        />
        <Tab.Screen
          name="Receipt"
          component={Receipt}
          options={{headerShown: false}}
        />
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
          options={{title: 'Detail Wisata'}}
        />
        <Tab.Screen
          name="Hoteldetail"
          component={Hoteldetail}
          options={{title: 'Detail Penginapan'}}
        />
        <Tab.Screen
          name="Fooddetail"
          component={Fooddetail}
          options={{title: 'Detail Makanan'}}
        />
        <Tab.Screen
          name="Eventdetail"
          component={Eventdetail}
          options={{title: 'Detail Event'}}
        />
        <Tab.Screen
          name="Rmgroup"
          component={Rmgroup}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Byeditor"
          component={Byeditor}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Commentscreen"
          component={Commentscreen}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Rm"
          component={Rm}
          options={{title: 'Detail Restoran'}}
        />
        <Tab.Screen
          name="Coupon"
          component={Coupon}
          options={{headerShown: false}}
        />
        <Tab.Screen name="Map" component={Map} options={{headerShown: false}} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
