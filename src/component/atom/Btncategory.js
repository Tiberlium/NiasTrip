import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Btncategory({onPress, color, background, name, label}) {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.wrap}>
        <Icon
          name={name}
          size={20}
          style={[styles.icon, {backgroundColor: background}]}
          color={color}
        />
      </TouchableOpacity>
      <Text style={styles.txt}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 45,
    width: 45,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 10,
    marginTop: 10,
  },
  icon: {alignSelf: 'center', marginLeft: 5, marginTop: 10},
  txt: {
    color: 'black',
    fontWeight: '300',
    alignSelf: 'center',
    fontSize: 12,
    marginTop: 10,
  },
});
