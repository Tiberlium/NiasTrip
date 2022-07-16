import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Couponcard({onpress, value}) {
  const [selected, setselected] = useState({bg: 'white', bordclr: 'white'});

  function select() {
    if (selected.bg === 'white') {
      setselected({bg: '#FFC2B5', bordclr: '#FFC2B5'});
      onpress(value);
    } else {
      setselected({bg: 'white', bordclr: 'white'});
      onpress(0);
    }
  }
  return (
    <Pressable
      style={[
        styles.container,
        {backgroundColor: selected.bg, borderColor: selected.bordclr},
      ]}
      onPress={select}>
      <Icon name="ticket-percent-outline" size={40} color="green" />
      <View style={styles.inlinewrap}>
        <Text style={styles.txt}>Diskon Rp 40000</Text>
        <Text style={styles.caption}>Potongan tarif sebesar Rp 40000</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    padding: 20,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 15,
    elevation: 3,
    display: 'flex',
    flexDirection: 'row',
  },
  inlinewrap: {marginLeft: 20},
  txt: {color: 'black', fontWeight: '500'},
  caption: {color: 'grey', fontWeight: '400'},
});
