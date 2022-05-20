import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {heightPercentageToDP} from 'react-native-responsive-screen';

export default function Btnpesanslide({onPress}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.inlineContainer}>
        <Icon name="chevron-up-circle" size={21} color="#FF5F7E" />
        <Text style={styles.txt}>Pesan sekarang</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 200,
    backgroundColor: '#5FD680',
    padding: 10,
    borderRadius: 10,
    margin: 5,
    borderColor: 'grey',
    alignSelf: 'center',
  },
  inlineContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  txt: {
    color: 'white',
    alignSelf:'center',
  },
});
