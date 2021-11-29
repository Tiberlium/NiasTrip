import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function Btntext({onPress, title, color}) {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <Text style={[styles.txt, {color: color}]}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  txt: {
    fontSize: 15,
    marginLeft:5,
  },
});
