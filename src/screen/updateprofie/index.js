import React from 'react';
import {View, ScrollView} from 'react-native';
import {Btnsubmit, Txtinput} from '../../component';

export default function Updateprofile() {
  return (
    <View>
      <ScrollView>
        <Txtinput label="Nama" placeholder="Masukkan nama disini" />
        <Txtinput label="Email" placeholder="Masukkan email disini" />
        <Txtinput label="No HP" placeholder="Masukkan no HP disini" />
        <Txtinput label="Alamat" placeholder="Masukkan alamat disini" />
        <Txtinput label="Kota" placeholder="Masukkan Kota disini" />
        <Txtinput label="Kode pos" placeholder="Masukkan Kode pos disini" />
        <Btnsubmit title="Update" />
      </ScrollView>
    </View>
  );
}
