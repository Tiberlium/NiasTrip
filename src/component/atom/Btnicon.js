import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Btnicon() {
  return (
    <View>
      <TouchableOpacity style={styles.container}>
        <Icon
          name="arrow-forward"
          size={30}
          color="white"
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 50,
    backgroundColor: 'blue',
    alignSelf: 'center',
    borderRadius: 15,
    marginTop: 15,
  },
  icon: {alignSelf: 'center', marginTop: 5},
});


