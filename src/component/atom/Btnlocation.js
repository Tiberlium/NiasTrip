import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function Btnlocation({onPress}) {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <Icon name="map-pin" color="#FF5F7E" size={30} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 5,
    padding: 15,
    margin: 10,
  },
});
