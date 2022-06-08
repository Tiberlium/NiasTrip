import React from 'react';
import {View, Text, Pressable, StyleSheet, Switch} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Btnfocus from '../atom/Btnfocus';

export default function Mapheadercard({onPress, onChange, value, onFocus}) {
  const color = {true: 'blue', false: 'black'};
  return (
    <View style={styles.parentContainer}>
      <View style={styles.container}>
        <Pressable onPress={onPress} style={styles.btn}>
          <Icon name="arrow-back-outline" size={25} color="black" />
        </Pressable>
        <Text style={styles.txt}>Di Sekitar</Text>
      </View>
      <Btnfocus onPress={onFocus} />
    </View>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 20,
  },
  container: {
    width: 260,
    height: 50,
    backgroundColor: 'white',
    elevation: 10,
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {margin: 10, width: 50, height: 30},
  txt: {
    fontSize: 15,
    fontWeight: '300',
    color: 'black',
    marginTop: 13,
    marginRight: '35%',
  },
});
