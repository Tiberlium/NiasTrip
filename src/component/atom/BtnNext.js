import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function BtnNext({onPress}) {
  return (
    <View>
      <TouchableOpacity style={styles.wrap} onPress={onPress}>
        <Icon
          name="chevron-forward-outline"
          size={30}
          color="white"
          style={styles.icn}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: 60,
    height: 60,
    backgroundColor: '#FF5F7E',
    borderRadius: 35,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 50,
  },
  icn: {marginHorizontal: 16, marginVertical: 14},
});
