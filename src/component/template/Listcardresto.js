import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Listcardresto({nama, onPress}) {
  return (
    <Pressable style={style.container} onPress={onPress}>
      <Icon name="fast-food" size={20} color="orange" />
      <Text style={style.txt}>{nama}</Text>
      <Icon
        name="chevron-forward-circle-outline"
        size={20}
        color="grey"
        style={style.icon2}
      />
    </Pressable>
  );
}

const style = StyleSheet.create({
  container: {
    width: '90%',
    height: 40,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderWidth: 0.2,
    alignSelf: 'center',
    borderRadius: 5,
    paddingTop: '1.8%',
    marginTop: 10,
  },
  txt: {color: 'grey', fontSize: 14, marginTop: 2},
  icon2: {marginTop: 1.5},
});
