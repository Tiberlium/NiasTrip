import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import {
  Custinput,
  Btntext,
  Btnsubmit,
  CustinputPass,
  Line,
  Btnsocial,
  Horizontalline,
} from '../../component';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Auth from '@react-native-firebase/auth';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';

const Unregister = ({navigation}) => (
  <View style={styles.wrapunregister}>
    <Text style={styles.register}>Sudah punya akun ?</Text>
    <Btntext
      title="Masuk"
      color="red"
      onPress={() => navigation.navigate('Login')}
    />
  </View>
);

export default function Register({navigation}) {
  const [nama, setnama] = useState('');
  const [kelamin, setkelamin] = useState([]);
  const [telepon, settelepon] = useState('');
  const [alamat, setalamat] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const gender = ['Pria', 'Wanita'];

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
    try {
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = Auth.GoogleAuthProvider.credential(idToken);
      return Auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView>
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
              .catch(() =>
                ToastAndroid.show('User canceled', ToastAndroid.SHORT),
              )
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
        <Custinput onChangeText={setnama} value={nama} placeholder="Nama" />
        <SelectDropdown
          data={gender}
          defaultButtonText="Pilih jenis kelamin"
          buttonStyle={styles.dropDown}
          dropdownStyle={{borderRadius: 10}}
          rowTextStyle={{fontSize: 15}}
          onSelect={selectedItem => setkelamin(selectedItem)}
          renderDropdownIcon={() => (
            <Icon name="chevron-down" size={25} color="#808080" />
          )}
          buttonTextStyle={styles.txtstyle}
        />
        <Custinput
          onChangeText={settelepon}
          value={telepon}
          placeholder="No hp"
        />
        <Custinput
          onChangeText={setalamat}
          value={alamat}
          placeholder="Alamat"
        />
        <Custinput onChangeText={setEmail} value={Email} placeholder="Email" />
        <View style={{marginTop: 10}}>
          <CustinputPass onChangeText={setPassword} value={Password} />
        </View>
        <Btnsubmit title="Daftar" onPress={Submit} top={hp(10)} />
        <Unregister />
        <Line />
      </KeyboardAvoidingView>
    </ScrollView>
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
  txtstyle: {fontWeight: '300', fontSize: 15, color: 'grey'},
  txtor: {fontWeight: '300', textAlign: 'center', marginVertical: hp(5)},
  wrap: {display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'},
  wrapunregister: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp(5),
  },
  register: {
    color: 'grey',
  },
  dropDown: {
    borderWidth: 0.5,
    borderColor: '#808080',
    width: 300,
    marginTop: '5%',
    alignSelf: 'center',
    borderRadius: 13,
    backgroundColor: 'white',
    marginBottom: -10,
    height: '5%',
  },
});
