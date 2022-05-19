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
    width: 150,
    elevation: 3,
    backgroundColor: 'white',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 25,
    marginBottom: 10,
  },
  inlineContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  txt: {
    color: '#808080',
    marginTop: heightPercentageToDP(0.7),
  },
});
