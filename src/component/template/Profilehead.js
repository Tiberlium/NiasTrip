import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Profile from '../atom/Profile';

export default function Profilehead({source,name}) {
  return (
    <View style={styles.wrap}>
      <Profile source={source}/>
      <View style={styles.inlineWrap}>
        <Text style={styles.txt1}>Hai, {name}</Text>
        <Text style={styles.txt2}>Semoga harimu menyenangkan</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {display: 'flex', flexDirection: 'row',margin:10},
  inlineWrap: {marginLeft: 10, marginTop: 10},
  txt1: {fontWeight: 'bold', fontSize: 20, color: 'black'},
  txt2: {fontWeight: '200', fontSize: 15, color: 'black'},
});
