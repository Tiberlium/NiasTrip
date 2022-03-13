import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Cardinfo({
  onPress,
  displayName,
  gender,
  email,
  phone,
  address,
  city,
  nation,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        <Text style={styles.txtProperty}>Nama</Text>
        <Text style={styles.txtValue}>{displayName}</Text>
      </View>
      <View style={styles.wrap}>
        <Text style={styles.txtProperty}>Jenis Kelamin</Text>
        <Text style={styles.txtValue}>{gender}</Text>
      </View>
      <View style={styles.wrap}>
        <Text style={styles.txtProperty}>Email</Text>
        <Text style={styles.txtValue}>{email}</Text>
      </View>
      <View style={styles.wrap}>
        <Text style={styles.txtProperty}>No HP</Text>
        <Text style={styles.txtValue}>{phone}</Text>
      </View>
      <View style={styles.wrap}>
        <Text style={styles.txtProperty}>Alamat</Text>
        <Text style={styles.txtValue}>{address}</Text>
      </View>
      <View style={styles.wrap}>
        <Text style={styles.txtProperty}>Kota</Text>
        <Text style={styles.txtValue}>{city}</Text>
      </View>
      <View style={styles.wrap}>
        <Text style={styles.txtProperty}>Kewarganegaraan</Text>
        <Text style={styles.txtValue}>{nation}</Text>
      </View>
      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Text style={styles.txtbtn}>Perbarui informasi</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 350,
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 5,
    alignSelf: 'center',
    padding: 20,
  },
  wrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  txtProperty: {fontSize: 15, color: 'black',fontWeight:'300'},
  txtValue: {fontSize: 15, fontWeight: '500', color: 'black'},
  btn: {
    width: 300,
    height: 50,
    borderRadius: 10,
    borderColor: '#FF5F7E',
    borderWidth: 1,
    marginTop:20,
  },
  btnicon: {margin: 5},
  txtbtn: {
    textAlign: 'center',
    color: '#FF5F7E',
    fontSize: 15,
    marginTop:12,
  },
});
