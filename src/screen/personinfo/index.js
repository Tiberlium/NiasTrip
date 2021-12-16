import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  Imageprofile,
  Btnback,
  Btntext,
  Cardinfo,
  Blankavatar,
} from '../../component';
import {firebase} from '@react-native-firebase/auth';

export default function Personinfo({navigation}) {
  const user = firebase.auth().currentUser;

  return (
    <View>
      <View style={styles.wrap}>
        <Btnback onPress={() => navigation.goBack()} />
        <Text style={styles.title}>Profil</Text>
      </View>
      {user.photoURL ? (
        <Imageprofile uri={user.photoURL} />
      ) : (
        <Blankavatar height={100} width={100} upDown={10} />
      )}
      <View style={styles.btntext}>
        <Btntext title="Ubah foto profil" color="blue" />
      </View>
      <Cardinfo onPress={() => navigation.navigate('Update profile')} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {display: 'flex', flexDirection: 'row'},
  btntext: {alignSelf: 'center', marginTop: 10, marginBottom: 30},
  title: {fontWeight: 'bold', fontSize: 25, color: 'black', marginTop: 15},
});
