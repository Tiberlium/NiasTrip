import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Btnbookmark({onPress, color}) {
  return (
    <View style={styles.wrap}>
      <TouchableOpacity onPress={onPress}>
        <Icon name="bookmark" size={25} style={styles.icon} color={'white'} />
      </TouchableOpacity>
    </View>
  );
}

function Btnbookmark2({onPress, color}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name="bookmark" size={30} style={styles.icon} color="#FF5F7E" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 50,
    width: 50,
    backgroundColor: '#FF5F7E',
    borderRadius: 10,
    alignSelf: 'center',
  },
  icon: {alignSelf: 'center', marginTop: 10},
});
