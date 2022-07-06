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
  CustinputPass,
  Line,
} from '../../component';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Auth from '@react-native-firebase/auth';

export default function Register({navigation}) {
  const [nama, setnama] = useState('');
  const [kelamin, setkelamin] = useState([]);
  const [telepon, settelepon] = useState("");
  const [alamat, setalamat] = useState('');
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

  return (
    <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={0}>
      <Text style={styles.title}>Gabung ke NiasTrip</Text>
      <Image source={require('../../asset/Logo.png')} style={styles.logo} />
      <Custinput onChangeText={setnama} value={nama} placeholder="Nama" />
      <Custinput
        onChangeText={settelepon}
        value={telepon}
        placeholder="No hp"
      />
      <Custinput onChangeText={setalamat} value={alamat} placeholder="Alamat" />
      <Custinput onChangeText={setEmail} value={Email} placeholder="Email" />
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
