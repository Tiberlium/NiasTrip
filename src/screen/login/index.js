import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, NativeModules} from 'react-native';
import {Txtinput, Btntext, Btnsubmit, Btnsocial} from '../../component';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
<<<<<<< HEAD
=======
import RNTwitterSignIn from '@react-native-twitter-signin/twitter-signin';
>>>>>>> 7531e24d4e799500c92586be0bca7529e1df20ec

export default function Login({navigation}) {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

<<<<<<< HEAD
=======
  async function onTwittersignin() {
    RNTwitterSignIn.init(
      '32n0ck9BVZ4KkBfFOeNoZPPbN',
      'pPRdQtnjgYmaxyDyncQZNuZbktxTbXPVGrVxhlRQ8Eo7K5q2gp',
    );

    RNTwitterSignIn.logIn()
      .then(loginData => {
        const {authToken, authTokenSecret} = loginData;
        const twitterCredential = Auth.TwitterAuthProvider.credential(
          authToken,
          authTokenSecret,
        );
        return Auth().signInWithCredential(twitterCredential);
      })
      .catch(error => console.log(error));
  }

>>>>>>> 7531e24d4e799500c92586be0bca7529e1df20ec
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

  GoogleSignin.configure({
    webClientId:
      '630789254968-g8e5nijq82eird2ifitcokvis3o1luv9.apps.googleusercontent.com',
  });

  const onGooglePress = async () => {
    try {
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = Auth.GoogleAuthProvider.credential(idToken);
      return Auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log({error});
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
            onGooglePress().then(() => navigation.navigate('Navigator'))
          }
        />
<<<<<<< HEAD
        <Btnsocial source={require('../../asset/twitter.png')} />
=======
        <Btnsocial
          source={require('../../asset/twitter.png')}
          onPress={() => onTwittersignin().then(res => console.log(res))}
        />
>>>>>>> 7531e24d4e799500c92586be0bca7529e1df20ec
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
