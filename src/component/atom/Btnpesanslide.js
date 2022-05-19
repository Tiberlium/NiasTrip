import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {heightPercentageToDP} from 'react-native-responsive-screen';

export default function Btnpesanslide({onPress}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.inlineContainer}>
        <Icon name="chevron-up-circle" size={30} color="#FF5F7E" />
        <Text style={styles.txt}>Pesan sekarang</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 180,
    backgroundColor: '#5FD680',
    padding: 10,
    borderRadius: 15,
    margin: 5,
    alignSelf: 'center',
    alignItems: 'stretch',
    borderColor:'grey'
  },
  inlineContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  txt: {
    color: 'white',
    marginTop: heightPercentageToDP(0.7),
  },
});
