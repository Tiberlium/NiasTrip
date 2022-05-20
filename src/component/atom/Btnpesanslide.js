import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {heightPercentageToDP} from 'react-native-responsive-screen';

export default function Btnpesanslide({onPress}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.inlineContainer}>
        <Icon
          name="chevron-up-circle"
          size={21}
          color="white"
          style={styles.icon}
        />
        <Text style={styles.txt}>Pesan sekarang</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 200,
    backgroundColor: '#FF5F7E',
    paddingVertical: 7,
    borderRadius: 10,
    margin: 5,
    borderColor: 'grey',
    alignSelf: 'center',
  },
  inlineContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  txt: {
    color: 'white',
    alignSelf: 'center',
  },
  icon: {
    marginTop: 1.5,
  },
});
