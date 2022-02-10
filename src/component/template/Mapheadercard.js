import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Mapheadercard({onPress}) {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress} style={styles.btn}>
        <Icon name="arrow-back-outline" size={25} />
      </Pressable>
      <Text style={styles.txt}>200 km dari Lagundri</Text>
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
    positon: 'absolute',
  },
  btn: {margin: 10, width: 50, height: 30},
  txt: {
    fontSize: 15,
    fontWeight: '300',
    color: 'black',
    marginTop: 12,
    marginLeft: 40,
  },
});
