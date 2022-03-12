import {View, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Btnfocus({onPress}) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Icon name="locate" size={25} color="black" style={styles.icon} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    elevation: 10,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: 'white',
  },
  icon: {
    alignSelf: 'center',
    marginTop: 10,
  },
});
