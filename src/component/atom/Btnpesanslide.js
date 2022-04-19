import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {heightPercentageToDP} from 'react-native-responsive-screen';

export default function Btnpesanslide({onPress}) {
  let opacity = new Animated.Value(0);
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Icon name="chevron-up-circle" size={30} color="#FF5F7E" />
      <Text style={styles.txt}>Pesan sekarang</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: 50,
    width: 150,
    elevation: 3,
    backgroundColor: 'white',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 25,
    borderWidth: 0.1,
    borderColor: '#808080',
    marginTop: heightPercentageToDP(3),
  },
  txt: {
    color: '#808080',
    marginTop: heightPercentageToDP(0.7),
  },
});
