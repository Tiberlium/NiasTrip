import React, {useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Txtinput, Btnsubmit} from '../../component';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Auth from '@react-native-firebase/auth';

export default function Recovery({navigation}) {
  const [Email, setEmail] = useState('');

  const Submit = () => {
    Auth()
      .sendPasswordResetEmail(Email)
      .then(() => {
        alert('silahkan tunggu email nya');
        navigation.navigate('Login');
      })
      .catch(err => {
        setEmail('');
        alert(err);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        <Image source={require('../../asset/keyLogo.png')} style={styles.img} />
      </View>
      <Text style={styles.txt}>
        Silahkan Masukkan Email Anda Untuk Melakukan Perubahan Password
      </Text>
      <Txtinput
        label="Email"
        placeholder="masukkan email anda"
        onChangeText={setEmail}
        value={Email}
      />
      <Btnsubmit title="Submit" onPress={Submit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {marginTop: hp(10)},
  wrap: {
    height: 150,
    width: 150,
    backgroundColor: 'white',
    elevation: 10,
    borderRadius: 100,
    alignSelf: 'center',
  },
  img: {height: 100, width: 100, alignSelf: 'center', marginTop: 25},
  txt: {
    fontWeight: '200',
    fontSize: 18,
    textAlign: 'center',
    margin: 20,
    color: 'black',
  },
});
