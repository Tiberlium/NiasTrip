import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {Btnback, Btnicon} from '../../component';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Auth from '@react-native-firebase/auth';

export default function Otp({navigation, route}) {
  const [Code, setCode] = useState(0);
  const [confirm, setconfirm] = useState(null);

  useEffect(() => {
    signInwithPhone();
  }, []);

  async function signInwithPhone() {
    try {
      const confirmation = await Auth().signInWithPhoneNumber(
        route.params.Phone,
      );
      setconfirm(confirmation);
    } catch (e) {
      console.log(e);
    }
  }

  async function Submit() {
    try {
      const response = await confirm.confirm(Code);
      if (response) return navigation.navigate('Navigator');
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View>
      <Btnback onPress={() => navigation.goBack()} />
      <View style={styles.wrap}>
        <Text style={styles.title}>Kode Otp Sudah terkirim</Text>
        <Text style={styles.caption}>
          Silahkan masukkan kode yang telah terkirim di nomor anda
        </Text>
      </View>
      <View style={styles.wrap2}>
        <TextInput placeholder="Angka Otp" onChangeText={setCode} />
      </View>
      <Btnicon onPress={() => Submit()} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {margin: 20},
  title: {fontWeight: 'bold', fontSize: 25, color: 'black'},
  caption: {color: 'black', fontSize: 15, fontWeight: '300'},
  wrap2: {
    alignSelf: 'center',
    width: 300,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginTop: hp(5),
  },
});
