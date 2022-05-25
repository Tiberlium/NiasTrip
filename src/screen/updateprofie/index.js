import React, {useState} from 'react';
import {View, ScrollView, StyleSheet, ToastAndroid, Text} from 'react-native';
import {Btnsubmit, Txtinput} from '../../component';
import SelectDropdown from 'react-native-select-dropdown';
import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Updateprofile({navigation}) {
  const user = Auth().currentUser;
  const gender = ['Pria', 'Wanita'];

  const [nama, setnama] = useState(user.displayName || '');
  const [kelamin, setkelamin] = useState('Pria');
  const [hp, sethp] = useState(user.phoneNumber || '');
  const [address, setaddress] = useState(user.address || '');
  const [kota, setkota] = useState(user.city || '');
  const [email, setEmail] = useState(user.email || '');
  const [Kewarganegaraan, setKewarganegaraan] = useState(user.nation || '');

  const optionalData = {
    img: user.photoURL,
    id: user.uid,
    name: nama,
    gender: kelamin,
    phoneNumber: hp,
    address: address,
    city: kota,
    email: email,
    nation: Kewarganegaraan,
  };

  async function handleChangeName() {
    await user
      .updateProfile({
        displayName: nama,
      })
      .then(() => {
        console.log('berhasil');
      })
      .catch(e => console.log(e));
  }

  async function handleUpdateProfile() {
    await firestore()
      .collection('Users')
      .doc(user.uid)
      .set(optionalData)
      .then(() => {
        ToastAndroid.show('User di update', ToastAndroid.SHORT);
        navigation.navigate('Personinfo');
      })
      .catch(e => console.log(e));
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Txtinput
          label="Nama"
          placeholder="Masukkan nama disini"
          onChangeText={setnama}
          value={nama}
        />
        <View style={styles.dropdownwrap}>
          <Text style={styles.lbldropdown}>Jenis Kelamin</Text>
          <SelectDropdown
            data={gender}
            defaultButtonText="Pilih jenis kelamin"
            buttonStyle={styles.dropDown}
            onSelect={selectedItem => setkelamin(selectedItem)}
            renderDropdownIcon={() => (
              <Icon name="chevron-down" size={25} color="#808080" />
            )}
            buttonTextStyle={styles.txtstyle}
          />
        </View>

        <Txtinput
          label="HP"
          placeholder="Masukkan HP disini"
          onChangeText={sethp}
          value={hp}
        />
        <Txtinput
          label="Email"
          placeholder="Masukkan Email di sini"
          onChangeText={setEmail}
          value={email}
        />
        <Txtinput
          label="Alamat"
          placeholder="Masukkan alamat disini"
          onChangeText={setaddress}
        />
        <Txtinput
          label="Kota"
          placeholder="Masukkan Kota disini"
          onChangeText={setkota}
        />
        <Txtinput
          label="Kewarganegaraan"
          placeholder="Masukkan Kewarganegaraan disini"
          onChangeText={setKewarganegaraan}
        />
        <Btnsubmit
          title="Update"
          onPress={() => {
            handleChangeName();
            handleUpdateProfile();
          }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {backgroundColor: 'white'},
  dropdownwrap: {alignSelf: 'center'},
  dropDown: {
    borderWidth: 0.5,
    borderColor: '#808080',
    width: 300,
    marginTop: 15,
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
  },
  lbldropdown: {color: 'black', fontWeight: 'bold', fontSize: 16},
  txtstyle: {fontWeight: '300', fontSize: 15},
});
