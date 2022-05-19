import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Btnbookmark({onPress}) {
  return (
    <View style={styles.wrap}>
      <TouchableOpacity onPress={onPress}>
        <Icon name="bookmark" size={18} style={styles.icon} color={'white'} />
      </TouchableOpacity>
    </View>
  );
}

function Btnbookmark2({onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name="bookmark" size={30} style={styles.icon2} color="#FF5F7E" />
    </TouchableOpacity>
  );
}

export {Btnbookmark2};

const styles = StyleSheet.create({
  wrap: {
    height: 40,
    width: 40,
    backgroundColor: '#FF5F7E',
    borderRadius: 10,
    alignSelf: 'center',
  },
  icon: {alignSelf: 'center', marginTop: 10},
  icon2: {alignSelf: 'center', marginTop: 20, marginRight: 20},
});
