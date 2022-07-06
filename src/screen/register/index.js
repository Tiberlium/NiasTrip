import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  ToastAndroid,
} from 'react-native';
import {
  Custinput,
  Btntext,
  Btnsubmit,
  Btnsocial,
  CustinputPass,
  Line,
  Horizontalline,
} from '../../component';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

export default function Register({navigation}) {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const Submit = () => {
    Auth()
      .createUserWithEmailAndPassword(Email, Password)
      .then(() => {
        navigation.navigate('Login');
        ToastAndroid.show('Pengguna telah terdaftar', ToastAndroid.SHORT);
      })
      .catch(() => {
        ToastAndroid.show('Register gagal', ToastAndroid.SHORT);
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
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = Auth.GoogleAuthProvider.credential(idToken);
    return Auth().signInWithCredential(googleCredential);
  };

  return (
    <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={0}>
      <Text style={styles.title}>Gabung ke NiasTrip</Text>
      <Image source={require('../../asset/Logo.png')} style={styles.logo} />
      <Btnsocial
        source={require('../../asset/facebook.png')}
        background="#4267B2"
        txtcolor="white"
        label="Lanjutkan dengan Facebook"
        onPress={() =>
          onFacebookPress()
            .then(() => navigation.navigate('Navigator'))
            .catch(() => {
              ToastAndroid.show('User Canceled', ToastAndroid.SHORT);
            })
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
      <Custinput onChangeText={setEmail} value={Email} />
      <CustinputPass onChangeText={setPassword} value={Password} />
      <Btnsubmit title="Daftar" onPress={Submit} top={hp(10)} />
      <Line />
      <View style={styles.wrapunregister}>
        <Text style={styles.register}>Sudah punya akun ?</Text>
        <Btntext
          title="Masuk"
          color="red"
          onPress={() => navigation.navigate('Login')}
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
  txtor: {fontWeight: '300', textAlign: 'center', marginVertical: hp(5)},
  wrap: {display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'},
  wrapunregister: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp(5),
  },
  register: {
    color: 'grey',
  },
});
