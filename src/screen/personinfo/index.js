import React, {useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  Imageprofile,
  Btnback,
  Btntext,
  Cardinfo,
  Blankavatar,
} from '../../component';
import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function Personinfo({navigation}) {
  const user = Auth().currentUser;
  const [profile, setprofile] = useState({});

  const Avatar = () => {
    return (
      <View>
        {user.photoURL ? (
          <Imageprofile uri={user.photoURL} />
        ) : (
          <Blankavatar height={100} width={100} upDown={10} />
        )}
      </View>
    );
  };

  async function loadData() {
    await firestore()
      .collection('Users')
      .doc(user.uid)
      .get()
      .then(doc => {
        setprofile(doc.data());
      });
  }

  useEffect(() => {
    loadData();
  }, []);

  console.log(profile);

  return (
    <View>
      <View style={styles.wrap}>
        <Btnback onPress={() => navigation.goBack()} />
        <Text style={styles.title}>Profil</Text>
      </View>
      <Avatar />
      <View style={styles.btntext}>
        <Btntext title="Ubah foto profil" color="blue" />
      </View>
      <Cardinfo
        displayName={user.displayName || 'kosong'}
        gender={profile.gender || 'kosong'}
        email={user.email || 'kosong'}
        phone={profile.phoneNumber || 'kosong'}
        address={profile.addres || 'kosong'}
        city={profile.city || 'kosong'}
        onPress={() => navigation.navigate('Update profile')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {display: 'flex', flexDirection: 'row'},
  btntext: {alignSelf: 'center', marginTop: 10, marginBottom: 30},
  title: {fontWeight: 'bold', fontSize: 25, color: 'black', marginTop: 15},
});
