import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Btncategory({onPress, color, background, name, label}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.wrap}>
      <Icon
        name={name}
        size={25}
        style={[styles.icon, {backgroundColor: background}]}
        color={color}
      />
      <Text style={styles.txt}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 50,
    width: 100,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 6,
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  icon: {alignSelf: 'center', marginLeft: 5},
  txt: {
    color: 'black',
    fontWeight: '300',
    alignSelf: 'center',
    marginLeft: 10,
    fontSize: 12,
  },
});
