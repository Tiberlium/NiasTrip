import React from 'react';
import {View, Text} from 'react-native';
import {Cardoptions} from '../../component';

export default function Changesecurity() {
  return (
    <View>
      <Cardoptions icon="mail" label="Ubah Email" />
      <Cardoptions icon="lock-closed" label="Ubah Sandi" />
    </View>
  );
}
