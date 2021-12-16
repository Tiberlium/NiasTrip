import React from 'react';
import {View, Image} from 'react-native';
import {firebase} from '@react-native-firebase/auth';
import {Accountprofile, Blankavatar, Btnlogout} from '../../component';
import {Cardoptions} from '../../component';
import {useNavigation} from '@react-navigation/native';
import Auth from '@react-native-firebase/auth';

export default function Account() {
  const user = firebase.auth().currentUser;
  const navigation = useNavigation();
  let image = '';

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
          name={user.displayName || 'Anonim'}
        />
      ) : (
        <Blankavatar
          width={100}
          height={100}
          upDown={50}
          label={user.displayName || 'Anonim'}
        />
      )}
      <Cardoptions
        icon="person"
        label="Info Akun"
        onPress={() => navigation.navigate('Personinfo')}
        left={10}
      />
      <Cardoptions
        icon="shield"
        label="Keamanan"
        onPress={() => navigation.navigate('Change Security')}
      />
      <Cardoptions icon="help-circle" label="Bantuan" left={20} />
      <Cardoptions
        icon="information-circle"
        label="Tentang"
        onPress={() => navigation.navigate('About')}
        left={20}
      />
      <Btnlogout onPress={() => signOut()} />
    </View>
  );
}
