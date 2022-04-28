import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, ToastAndroid} from 'react-native';
import {
  Btntext,
  Btnsubmit,
  Btnsocial,
  Horizontalline,
  Custinput,
  CustinputPass,
} from '../../component';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

export default function Login({navigation}) {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const Submit = () => {
    Auth()
      .signInWithEmailAndPassword(Email, Password)
      .then(() => {
        navigation.navigate('Navigator');
      })
      .catch(() => {
        alert('Login gagal');
        setEmail('');
        setPassword('');
      });
  };

  const onFacebookPress = async () => {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    const facebookCredential = Auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    return Auth().signInWithCredential(facebookCredential);
  };

  const onGooglePress = async () => {
    GoogleSignin.configure({
      webClientId:
        '630789254968-g8e5nijq82eird2ifitcokvis3o1luv9.apps.googleusercontent.com',
    });
    try {
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = Auth.GoogleAuthProvider.credential(idToken);
      return Auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Text style={styles.title}>Sign In to NiasTrip</Text>
      <Image source={require('../../asset/Logo.png')} style={styles.logo} />
      <Btnsocial
        source={require('../../asset/facebook.png')}
        background="#4267B2"
        txtcolor="white"
        label="Continue With Facebook"
      />
      <Btnsocial
        source={require('../../asset/google.png')}
        background="white"
        txtcolor="black"
        label="Continue With Google"
      />
      <Horizontalline />
      <Custinput />
      <CustinputPass />
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 70,
    width: 70,
    alignSelf: 'center',
    marginTop: hp(5),
    marginBottom: hp(2),
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
    marginTop: hp(5),
  },
  forget: {marginLeft: widthPercentageToDP(10), marginTop: hp(2)},
  txtor: {fontWeight: '300', textAlign: 'center', marginVertical: hp(4)},
  wrap: {display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'},
  wrapunregister: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp(5),
  },
  unregister: {fontWeight: '300', color: 'black'},
});
