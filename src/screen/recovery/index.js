import React, {useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Txtinput, Btnsubmit, Btnback, Custinput} from '../../component';
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
    <View>
      <Btnback onPress={() => navigation.goBack()} />
      <Text style={styles.title}>Lupa Password</Text>
      <View style={styles.container}>
        <Image source={require('../../asset/Logo.png')} style={styles.img} />
        <Custinput onChangeText={setEmail} value={Email} />
        <Text style={styles.txt}>
          Link konfirmasi akan di kirimkan ke alamat email mu
        </Text>
        <Btnsubmit title="Kirim" onPress={Submit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {marginTop: hp(5)},
  title: {fontSize: 20, fontWeight: '500', textAlign: 'center', color: 'black'},
  img: {height: 70, width: 70, alignSelf: 'center', marginTop: 25},
  txt: {
    fontWeight: '200',
    textAlign: 'center',
    margin: 20,
    color: 'black',
  },
});
