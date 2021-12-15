import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Btnicon({onPress}) {
  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={onPress}>
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
    backgroundColor: '#FF5F7E',
    alignSelf: 'center',
    borderRadius: 15,
    marginTop: 20,
  },
  icon: {alignSelf: 'center', marginTop: 5},
});
