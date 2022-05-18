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
            size={20}
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
    height: 50,
    width: 250,
    backgroundColor: '#FF5F7E',
    alignSelf: 'center',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  wrap: {
    width: 30,
    heigth: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 10,
    marginLeft: 20,
  },
  txt: {
    color: 'white',
    fontWeight: '300',
    fontSize: 20,
    marginTop: 11,
    marginLeft: 50,
  },
  icon: {alignSelf: 'center', marginTop: 3},
});
