import {View, Text, Pressable, StyleSheet, Image} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

export default function Promocard({onpress, title, discount, validdate}) {
  return (
    <Pressable style={styles.container} onPress={onpress}>
      <Image source={require('../../asset/discount.jpg')} style={styles.img} />
      <Text style={styles.txt}>{title}</Text>
      <View style={styles.inlinewrap0}>
        <View style={styles.inlinewrap}>
          <Icon name="clock" color="red" size={25} style={styles.icon} />
          <View style={styles.wrap1}>
            <Text style={styles.txtmark}>Berlaku hingga</Text>
            <Text style={styles.caption}>{validdate}</Text>
          </View>
        </View>
        <Text style={styles.subtitle}>Diskon {discount}%</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '85%',
    elevation: 5,
    backgroundColor: 'white',
    alignSelf: 'center',
    padding: 20,
    borderRadius: 10,
    marginTop:10,
  },
  img: {height: 100, width: '90%'},
  txt: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'black',
    fontWeight: 'bold',
  },
  caption: {
    fontWeight: 'bold',
    color: 'black',
  },
  inlinewrap0: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  inlinewrap: {
    display: 'flex',
    flexDirection: 'row',
  },
  txtmark: {
    color: 'black',
    fontSize: 12,
  },
  wrap1: {
    marginLeft: 10,
  },
  icon: {marginTop: 5},
});
