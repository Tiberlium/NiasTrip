import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Btnnearby({onPress, title}) {
  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Text style={styles.txt}>{title}</Text>
        <View style={styles.wrap}>
          <Icon
            name="chevron-forward"
            size={15}
            color="#FF5F7E"
            style={styles.icon}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 250,
    backgroundColor: '#FF5F7E',
    alignSelf: 'center',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  wrap: {
    width: 20,
    heigth: 20,
    backgroundColor: 'white',
    marginVertical: 10,
    marginLeft: 20,
    borderRadius: 5,
  },
  txt: {
    color: 'white',
    fontWeight: '300',
    fontSize: 15,
    marginTop: 8,
    marginLeft: 50,
  },
  icon: {alignSelf: 'center', marginTop: 2},
});
