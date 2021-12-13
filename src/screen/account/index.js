import React from 'react';
import {View, StyleSheet} from 'react-native';
import {firebase} from '@react-native-firebase/auth';
import {Accountprofile, Btnlogout} from '../../component';
import {Cardoptions} from '../../component';
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
      <Accountprofile uri={user.photoURL} name={user.displayName} />
      <Cardoptions icon="person" label="Info Akun" />
      <Cardoptions icon="help" label="Bantuan" />
      <Cardoptions icon="information" label="Tentang" onPress={()=>navigation.navigate('About')} />
      <Btnlogout onPress={() => signOut()} />
    </View>
  );
}

const styles = StyleSheet.create({
  imageWrap: {
    alignSelf: 'center',
  },
});
