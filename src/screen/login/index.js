import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ToastAndroid,
  KeyboardAvoidingView,
} from 'react-native';
import {
  Btntext,
  Btnsubmit,
  Btnsocial,
  Horizontalline,
  Custinput,
  CustinputPass,
  Line,
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
        ToastAndroid.show('Login gagal', ToastAndroid.SHORT);
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
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        ToastAndroid.show('dibatalkan', ToastAndroid.SHORT);
        return false;
      }
    }
  };

  return (
    <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={0}>
      <Text style={styles.title}>Masuk ke NiasTrip</Text>
      <Image source={require('../../asset/Logo.png')} style={styles.logo} />
      <Btnsocial
        source={require('../../asset/facebook.png')}
        background="#4267B2"
        txtcolor="white"
        label="Lanjutkan dengan Facebook"
        onPress={() =>
          onFacebookPress()
            .then(() => navigation.navigate('Navigator'))
            .catch(() => ToastAndroid.show('User canceled', ToastAndroid.SHORT))
        }
      />
      <Btnsocial
        source={require('../../asset/google.png')}
        background="white"
        txtcolor="black"
        label="Lanjutkan dengan Google"
        onPress={() =>
          onGooglePress().then(() => navigation.navigate('Navigator'))
        }
      />
      <Horizontalline />
      <Custinput onChangeText={setEmail} value={Email} placeholder="Email" />
      <CustinputPass onChangeText={setPassword} value={Password} />
      <Btnsubmit title="Masuk" onPress={Submit} top={hp(10)} />
      <View style={styles.forget}>
        <Btntext
          title="Lupa Password ?"
          color="red"
          onPress={() => navigation.navigate('Recovery')}
        />
      </View>
      <Line />
      <View style={styles.wrapunregister}>
        <Text style={styles.unregister}>Belum terdaftar ?</Text>
        <Btntext
          title="Buat akun"
          color="red"
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    </KeyboardAvoidingView>
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
  forget: {
    marginRight: widthPercentageToDP(10),
    marginTop: hp(2),
    alignSelf: 'flex-end',
  },
  txtor: {fontWeight: '300', textAlign: 'center', marginVertical: hp(4)},
  wrap: {display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'},
  wrapunregister: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp(5),
  },
  unregister: {
    color: 'grey',
  },
});
