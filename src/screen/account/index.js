import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {firebase} from '@react-native-firebase/auth';
import {Accountprofile, Blankavatar, Btnlogout} from '../../component';
import {Cardsectionlist} from '../../component';
import {useNavigation} from '@react-navigation/native';
import Auth from '@react-native-firebase/auth';

export default function Account() {
  const user = firebase.auth().currentUser;
  const navigation = useNavigation();

  async function signOut() {
    return await Auth()
      .signOut()
      .then(() => navigation.navigate('Intro'))
      .catch(e => console.log(e));
  }

  return (
    <View>
      {user.photoURL ? (
        <Accountprofile
          uri={user.photoURL}
          name={user.displayName || user.email || user.phoneNumber}
        />
      ) : (
        <Blankavatar
          width={100}
          height={100}
          upDown={50}
          label={user.displayName || user.email || user.phoneNumber}
        />
      )}
      <Text style={styles.title}>Pembaruan</Text>
      <Cardsectionlist
        icon="user"
        title="Info Akun"
        desc="Lihat dan Perbarui informasi akun"
        onPress={() => navigation.navigate('Personinfo')}
      />
      <Cardsectionlist
        icon="shield"
        title="Keamanan"
        desc="Atur kembali sandi dan email anda"
        onPress={() => navigation.navigate('Change Security')}
      />
      <Text style={styles.title}>Informasi</Text>
      <Cardsectionlist
        icon="help-circle"
        title="Bantuan"
        desc="Dapatkan informasi seputar aplikasi"
        onPress={() => navigation.navigate('Help')}
      />
      <Cardsectionlist
        icon="info"
        title="Tentang"
        desc="lihat versi aplikasi"
        onPress={() => navigation.navigate('About')}
      />
      <Btnlogout onPress={() => signOut()} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#808080',
    marginLeft: 20,
    marginBottom: 10,
  },
});
