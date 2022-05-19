import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Facilitychip({name}) {
  return (
    <View style={styles.container}>
      <Icon name={name} size={20} color="gray" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 11,
    borderRadius: 10,
    borderWidth: 0.2,
    marginTop: 10,
    marginLeft: 20,
    marginBottom:10,
  },
});
