import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, ToastAndroid} from 'react-native';
import {Txtinput, Btntext, Btnsubmit, Btnsocial} from '../../component';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {Settings, LoginManager, AccessToken} from 'react-native-fbsdk-next';

Settings.initializeSDK();

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
    <View styles={styles.container}>
      <Image source={require('../../asset/Logo.png')} style={styles.logo} />
      <Text style={styles.title}>Masuk</Text>
      <Txtinput
        label="Email"
        placeholder="Masukkan Email"
        onChangeText={setEmail}
        value={Email}
      />
      <Txtinput
        label="Password"
        placeholder="Masukkan Password"
        onChangeText={setPassword}
        value={Password}
        secure={true}
      />
      <View style={styles.forget}>
        <Btntext
          title="Lupa password ?"
          color="red"
          onPress={() => navigation.navigate('Recovery')}
        />
      </View>
      <Btnsubmit title="Masuk" onPress={Submit} />
      <Text style={styles.txtor}>Atau masuk dengan</Text>
      <View style={styles.wrap}>
        <Btnsocial
          source={require('../../asset/google.png')}
          onPress={() =>
            onGooglePress()
              .then(() => navigation.navigate('Navigator'))
              .catch(e => {
                if (e === statusCodes.SIGN_IN_CANCELLED) {
                  ToastAndroid.show('Canceled', ToastAndroid.SHORT);
                  return false;
                }
              })
          }
        />
        <Btnsocial
          source={require('../../asset/facebook.png')}
          onPress={() =>
            onFacebookPress()
              .then(() => navigation.navigate('Navigator'))
              .catch(e => console.error(e))
          }
        />
      </View>
      <View style={styles.wrapunregister}>
        <Text style={styles.unregister}>Belum terdaftar ?</Text>
        <Btntext
          title="Daftar"
          color="black"
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {height: 100, width: 100, alignSelf: 'center', marginTop: hp(5)},
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
    marginTop: hp(2),
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
