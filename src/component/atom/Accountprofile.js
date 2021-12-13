import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Accountprofile({uri, onPress}) {
  return (
    <View>
      <Image
        source={{uri: 'https://placeimg.com/640/480/any'}}
        style={styles.image}
      />
      <TouchableOpacity onPress={onPress}>
        <Icon name="create" size={25} style={styles.icon} color="#FF5F7E" />
      </TouchableOpacity>
      <Text style={styles.txt}>USER</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
    borderRadius: 75,
    alignSelf: 'center',
    marginTop: 50,
    position: 'absolute',
  },
  icon: {alignSelf: 'center', marginTop: 130, marginLeft: 90},
  txt: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    marginTop: 5,
  },
});
