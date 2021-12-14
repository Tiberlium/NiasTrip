import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

export default function Cardinfo({onPress}) {
  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        <Text style={styles.txtProperty}>Nama</Text>
        <Text style={styles.txtValue}>Wibu</Text>
      </View>
      <View style={styles.wrap}>
        <Text style={styles.txtProperty}>Jenis Kelamin</Text>
        <Text style={styles.txtValue}>Pria</Text>
      </View>
      <View style={styles.wrap}>
        <Text style={styles.txtProperty}>Email</Text>
        <Text style={styles.txtValue}>Wibu.nolep47@gmail.com</Text>
      </View>
      <View style={styles.wrap}>
        <Text style={styles.txtProperty}>No HP</Text>
        <Text style={styles.txtValue}>0823242522</Text>
      </View>
      <View style={styles.wrap}>
        <Text style={styles.txtProperty}>Alamat</Text>
        <Text style={styles.txtValue}>Jl.sei belumai</Text>
      </View>
      <View style={styles.wrap}>
        <Text style={styles.txtProperty}>Kota</Text>
        <Text style={styles.txtValue}>Medan</Text>
      </View>
      <View style={styles.wrap}>
        <Text style={styles.txtProperty}>Kode Pos</Text>
        <Text style={styles.txtValue}>22324</Text>
      </View>
      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Icon name="create-outline" size={30} style={styles.btnicon} />
        <Text style={styles.txtbtn}>Perbarui informasi</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 350,
    borderWidth: 0.5,
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
  },
  txtProperty: {fontSize: 15,color:'black'},
  txtValue: {fontSize: 15, fontWeight: 'bold',color:'black'},
  btn: {
    width: 300,
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: 'black',
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
  },
  btnicon: {margin: 5},
  txtbtn: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    fontSize: 15,
    marginTop: 10,
    marginLeft: 50,
  },
});
