import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Btnsubmit, Txtinput} from '../../component';
import SelectDropdown from 'react-native-select-dropdown';

export default function Updateprofile() {
  const gender = ['Pria', 'Wanita'];
  return (
    <View>
      <ScrollView>
        <Txtinput label="Nama" placeholder="Masukkan nama disini" />
        <SelectDropdown
          data={gender}
          defaultButtonText="Pilih jenis kelamin"
          buttonStyle={styles.dropDown}
        />
        <Txtinput label="Email" placeholder="Masukkan email disini" />
        <Txtinput label="No HP" placeholder="Masukkan no HP disini" />
        <Txtinput label="Alamat" placeholder="Masukkan alamat disini" />
        <Txtinput label="Kota" placeholder="Masukkan Kota disini" />
        <Btnsubmit title="Update" />
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
