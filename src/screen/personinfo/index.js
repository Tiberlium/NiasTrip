import React, {useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Imageprofile, Btnback, Cardinfo, Blankavatar} from '../../component';
import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function Personinfo({navigation}) {
  const user = Auth().currentUser;
  const [profile, setprofile] = useState({});
  const isMounted = useRef();

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
    firestore()
      .collection('Users')
      .doc(user.uid)
      .onSnapshot(doc => {
        if (isMounted.current) {
          doc.exists ? setprofile(doc.data()) : {};
        }
      });
  }

  useEffect(() => {
    isMounted.current = true;
    loadData();
    return () => (isMounted.current = false);
  }, []);

  return (
    <View>
      <View style={styles.wrap}>
        <Btnback onPress={() => navigation.goBack()} />
        <Text style={styles.title}>Profil</Text>
      </View>
      <Avatar />
      <Cardinfo
        displayName={user.displayName || user.email || user.phoneNumber}
        gender={profile.gender || 'kosong'}
        email={user.email || 'kosong'}
        phone={profile.phoneNumber || 'kosong'}
        address={profile.address || 'kosong'}
        city={profile.city || 'kosong'}
        nation={profile.nation || 'kosong'}
        onPress={() => navigation.navigate('Update profile')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {display: 'flex', flexDirection: 'row'},
  btntext: {alignSelf: 'center', marginTop: 10, marginBottom: 30},
  title: {
    fontWeight: '500',
    fontSize: 25,
    color: 'black',
    marginTop: hp(2),
    marginHorizontal: wp(25),
  },
});
