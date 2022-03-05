import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Btnbookmark({onPress, color}) {
  return (
    <View style={styles.wrap}>
      <TouchableOpacity onPress={onPress}>
        <Icon name="bookmark" size={30} style={styles.icon} color={color} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 60,
    width: 60,
    backgroundColor: 'transparent',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 5,
  },
  icon: {alignSelf: 'center', marginTop: 10},
});
