import React from 'react';
import {View, Text, Pressable, StyleSheet, Switch} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Mapheadercard({onPress, onChange, value}) {
  const color = {true: 'blue', false: 'black'};
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress} style={styles.btn}>
        <Icon name="arrow-back-outline" size={25} />
      </Pressable>
      <Text style={styles.txt}>Lokasi Sekitar</Text>
      <View style={styles.wrap}>
        <Icon name="md-sunny-outline" size={20} style={styles.icon} />
        <Switch trackColor={color} onValueChange={onChange} value={value} />
        <Icon name="md-moon" size={20} style={styles.icon} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 350,
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
  },
  wrap: {
    display: 'flex',
    flexDirection: 'row',
    marginRight:10,
  },
  icon: {
    marginTop: 13,
  },
});
