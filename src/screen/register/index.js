import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Txtinput, Btntext, Btnsubmit, Btnsocial} from '../../component';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function Register() {
  return (
    <View styles={styles.container}>
      <Image source={require('../../asset/Logo.png')} style={styles.logo} />
      <Text style={styles.title}>Daftar</Text>
      <Txtinput label="Email" placeholder="Masukkan Email" />
      <Txtinput label="Password" placeholder="Masukkan Password" />
      <Btnsubmit title="Daftar" />
      <Text style={styles.txtor}>Atau Daftar dengan</Text>
      <View style={styles.wrap}>
        <Btnsocial source={require('../../asset/google.png')} />
        <Btnsocial source={require('../../asset/facebook.png')} />
      </View>
      <View style={styles.wrapunregister}>
        <Text style={styles.unregister}>Sudah terdaftar ?</Text>
        <Btntext title="Masuk" color="black" />
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
  txtor: {fontWeight: '300', textAlign: 'center', marginVertical: hp(5)},
  wrap: {display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'},
  wrapunregister: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp(5),
  },
  unregister: {fontWeight: '300'},
});
