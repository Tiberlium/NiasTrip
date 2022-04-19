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
            name="chevron-forward"
            size={18}
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
    marginTop: -5,
  },
  wrap: {
    width: 27,
    backgroundColor: 'white',
    borderRadius: 10,
    marginLeft: 35,
    marginVertical:6,
  },
  icon: {alignSelf: 'center', marginTop: 3.5},
  txt: {
    color: 'white',
    fontSize: 15,
    marginTop: 8,
    marginLeft: 10,
    fontWeight: '400',
  },
});
