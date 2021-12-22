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
      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Icon name="create-outline" size={30} style={styles.btnicon} color="blue" />
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
  txtProperty: {fontSize: 16, color: 'black'},
  txtValue: {fontSize: 16, fontWeight: 'bold', color: 'black'},
  btn: {
    width: 300,
    height: 50,
    borderRadius: 10,
    borderColor:'blue',
    borderWidth:1,
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor:'white',
    elevation:5,
  },
  btnicon: {margin: 5},
  txtbtn: {
    textAlign: 'center',
    color: 'blue',
    fontSize: 15,
    marginTop: 10,
    marginLeft: 50,
  },
});
