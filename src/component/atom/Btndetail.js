import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Btndetail({onPress}) {
  return (
    <View>
      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Text style={styles.txt}>Detail</Text>
        <View style={styles.wrap}>
          <Icon
            name="chevron-forward-outline"
            size={25}
            color="#FF5F7E"
            style={styles.icon}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: 40,
    width: 120,
    backgroundColor: '#FF5F7E',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 10,
  },
  wrap: {
    heigth: 25,
    width: 30,
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 5,
    marginLeft: 35,
  },
  icon: {alignSelf: 'center'},
  txt: {color: 'white', fontSize: 15, marginTop: 8, marginLeft: 10},
});
