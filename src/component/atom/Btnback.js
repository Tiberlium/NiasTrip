import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Btnback({onPress}) {
  return (
    <View style={styles.wrap}>
      <TouchableOpacity onPress={onPress}>
        <Icon
          name="arrow-back-outline"
          size={30}
          color="black"
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 50,
    width: 50,
    backgroundColor: 'white',
    elevation: 10,
    borderRadius: 30,
    margin: 10,
  },
  icon: {alignSelf: 'center', marginTop: 7},
});
