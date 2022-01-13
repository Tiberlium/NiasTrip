import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Btndate({onPress, value}) {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <Icon name="calendar-outline" size={25} color="#FF5F7E" />
        <Text style={styles.txt}>{value}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 40,
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 5,
  },
  txt: {
    fontWeight: '300',
    color: 'black',
    marginTop: 4,
  },
});
