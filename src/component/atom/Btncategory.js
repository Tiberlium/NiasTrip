import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Btncategory({onPress, color, background, name, label}) {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.wrap}>
        <Icon
          name={name}
          size={30}
          style={[styles.icon, {backgroundColor: background}]}
          color={color}
        />
      </TouchableOpacity>
      <View style={styles.inlineWrap}>
        <Text style={styles.txt}>{label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 60,
    width: 60,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 15,
    marginTop: 10,
  },
  icon: {alignSelf: 'center', marginTop: 15},
  inlineWrap: {marginTop: 10, alignSelf: 'center'},
  txt: {color: 'black',fontWeight:'300'},
});
