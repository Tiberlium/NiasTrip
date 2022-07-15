import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

export default function Chip({onPress, title, text, background}) {

  
  function press() {
    onPress(title);
  }
  return (
    <View style={[styles.container, {backgroundColor: background}]}>
      <Pressable onPress={() => press()}>
        <Text style={[styles.txt, {color: text}]}>{title}</Text>
      </Pressable>
    </View>
  );
}


export function Chiptipe({onPress, title, text, background}) {

  
  function press() {
    onPress(title);
  }
  return (
    <View style={[styles.container2, {backgroundColor: background}]}>
      <Pressable onPress={() => press()}>
        <Text style={[styles.txt, {color: text}]}>{title}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: 100,
    borderRadius: 15,
    marginLeft: 20,
    marginTop: 5,
    elevation: 3,
  },
  container2: {
    width: 160,
    borderRadius: 20,
    marginTop: 5,
    padding:5,
    borderWidth:0.2
  },
  txt: {
    textAlign: 'center',
    marginTop: 3,
  },
});
