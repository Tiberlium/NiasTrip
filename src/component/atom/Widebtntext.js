import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Widebtntext({onPress, title, iconname}) {
  return (
    <View>
      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Icon name={iconname} size={20} color="white" />
        <Text style={styles.txt}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 350,
    height: 40,
    backgroundColor: '#FF5F7E',
    alignSelf: 'center',
    padding: 6,
    margin: 10,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
});
