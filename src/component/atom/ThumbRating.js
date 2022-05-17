import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function ThumbRating() {
  return (
    <View style={styles.container}>
      <Icon name="star" size={15} color="yellow" />
      <Text style={styles.txt}>1/5</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    marginLeft: 10,
    marginTop: hp(18),
  },
  txt: {
    fontWeight: 'bold',
    fontSize: 12,
    color: 'white',
    marginLeft: 5,
    marginTop: 2,
  },
});
