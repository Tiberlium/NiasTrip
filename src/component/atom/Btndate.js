import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Btndate({onPress, value}) {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <Icon name="calendar-outline" size={25} color="black" />
        <Text style={styles.txt}>{value}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 160,
    height: 40,
    borderWidth: 0.2,
    borderColor: '#808080',
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 5,
    backgroundColor: '#F9937D',
  },
  txt: {
    fontWeight: '300',
    color: 'grey',
    marginTop: 4,
  },
});
