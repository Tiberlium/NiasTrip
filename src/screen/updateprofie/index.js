import React, {useState} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Btnsubmit, Txtinput} from '../../component';
import SelectDropdown from 'react-native-select-dropdown';
import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function Updateprofile() {
  const user = Auth().currentUser;
  const gender = ['Pria', 'Wanita'];

  const [nama, setnama] = useState(user.displayName || '');
  const [kelamin, setkelamin] = useState('');
  const [hp, sethp] = useState(user.phoneNumber || '');
  const [address, setaddress] = useState('');
  const [kota, setkota] = useState('');

  const optionalData = {
    id: user.uid,
    name: nama,
    gender: kelamin,
    phoneNumber: hp,
    addres: address,
    city: kota,
  };

  async function handleChangeName() {
    await user
      .updateProfile({
        displayName: nama,
      })
      .then(() => console.log('berhasil'))
      .catch(e => console.log(e));
  }

  async function handleUpdateProfile() {
    await firestore()
      .collection('Document')
      .doc('Users')
      .set(optionalData)
      .then(() => console.log('user update'))
      .catch(e => console.log(e));
  }

  return (
    <View>
      <ScrollView>
        <Txtinput
          label="Nama"
          placeholder="Masukkan nama disini"
          onChangeText={setnama}
          value={nama}
        />
        <SelectDropdown
          data={gender}
          defaultButtonText="Pilih jenis kelamin"
          buttonStyle={styles.dropDown}
          onSelect={selectedItem => setkelamin(selectedItem)}
        />
        <Txtinput
          label="HP"
          placeholder="Masukkan HP disini"
          onChangeText={sethp}
          value={hp}
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
  dropDown: {
    borderWidth: 0.5,
    borderColor: 'black',
    width: 300,
    marginTop: 15,
    alignSelf: 'center',
    borderRadius: 10,
  },
});
