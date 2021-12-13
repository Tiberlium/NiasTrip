import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Btnlogout({onPress}) {
  return (
    <View>
      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Icon name="log-out-outline" size={25} style={styles.icon} />
        <Text style={styles.txt}>Keluar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 150,
    height: 50,
    borderWidth: 0.5,
    borderColor: 'FF5F7E',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 15,
    alignSelf: 'center',
    backgroundColor: 'white',
    marginTop: 65,
  },
  icon: {marginTop: 10, marginHorizontal: 10},
  txt: {fontSize: 20, color: 'black', marginTop: 10, marginLeft: 10},
});
