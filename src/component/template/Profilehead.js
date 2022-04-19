import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Profile from '../atom/Profile';
import {Blankavatar} from '..';
import Auth from '@react-native-firebase/auth';

export default function Profilehead({name}) {
  const user = Auth().currentUser;
  return (
    <View style={styles.wrap}>
      {user.photoURL != null ? (
        <Profile source={{uri: user.photoURL}} />
      ) : (
        <Blankavatar width={70} height={70} bottom={-30} />
      )}
      <View style={styles.inlineWrap}>
        <Text style={styles.txt1}>Hai, {name}</Text>
        <Text style={styles.txt2}>Semoga harimu menyenangkan</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {display: 'flex', flexDirection: 'row', marginLeft: 10, marginTop: 15},
  inlineWrap: {marginLeft: 10, marginTop: 7},
  txt1: {fontWeight: '500', fontSize: 20, color: 'black'},
  txt2: {fontWeight: '200', fontSize: 15, color: 'black'},
});
