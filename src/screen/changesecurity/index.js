import React from 'react';
import {View, Modal} from 'react-native';
import {Cardoptions} from '../../component';
import Auth from '@react-native-firebase/auth';

export default function Changesecurity() {
  return (
    <View>
      <Cardoptions icon="mail" label="Ubah Email" />
      <Cardoptions icon="lock-closed" label="Ubah Sandi" />
    </View>
  );
}
