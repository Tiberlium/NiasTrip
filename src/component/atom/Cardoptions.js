import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Cardoptions({icon, label, onPress, left}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.wrap} onPress={onPress}>
        <Icon name={icon} size={25} style={styles.icon} color="#FF5F7E" />
        <Text style={styles.txt}>{label}</Text>
        <Icon
          name="chevron-forward"
          size={25}
          color="#FF5F7E"
          style={[styles.iconi, {marginLeft: left}]}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: 350,
    alignSelf: 'center',
    borderRadius: 15,
    backgroundColor: 'white',
    borderColor: '#FF5F7E',
    marginVertical: 10,
    elevation: 5,
  },
  wrap: {
    display: 'flex',
    flexDirection: 'row',
  },
  icon: {
    marginTop: 15,
    marginHorizontal: 15,
  },
  iconi: {
    marginTop: 15,
  },
  txt: {
    fontWeight: '500',
    fontSize: 18,
    color: 'black',
    marginTop: 15,
    marginHorizontal: 80,
  },
});
