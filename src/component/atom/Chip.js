import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

export default function Chip({onPress, title}) {
  const [background, setbackground] = useState('white');
  const [text, settext] = useState('black');

  function press() {
    if (background === 'grey') {
      onPress('');
      setbackground('white');
      settext('black');
    } else {
      onPress(title);
      setbackground('grey');
      settext('white');
    }
  }

  return (
    <View style={[styles.container, {backgroundColor: background}]}>
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
    elevation:3,
  },
  txt: {
    textAlign: 'center',
    marginTop: 3,
  },
});
