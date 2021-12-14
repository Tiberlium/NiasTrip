import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Cardinfo() {
  return (
    <View style={styles.container}>
      <Text style={styles.txtnama}>Wibu,Pria</Text>
      <Text style={styles.caption}>082242525225</Text>
      <Text style={styles.caption}>Wibu.nolep@gmail.com</Text>
      <Text style={styles.caption}>
        Jl.hililaza baru,Kabupaten Nias selatan,Sumatera utara,8940
      </Text>
      <TouchableOpacity style={styles.btn}>
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
  txtnama: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'black',
  },
  caption: {
    fontSize: 15,
    color: 'black',
    marginVertical: 2,
    fontWeight: '400',
  },
  btn: {
    width: 300,
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: 'black',
    marginTop:20,
    marginHorizontal:10,
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
