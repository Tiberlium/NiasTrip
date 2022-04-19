import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function Widebtntext({onPress,title}) {
  return (
    <View>
      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Text style={styles.txt}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 350,
    height: 50,
    backgroundColor: '#FF5F7E',
    alignSelf:'center',
    padding:6,
    margin:10,
    borderRadius:10,
  },
  txt:{
    color:'white',
    fontWeight:'bold',
    fontSize:20,
    textAlign:'center',
  }
});
