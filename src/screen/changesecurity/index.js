import React, {useState, useRef} from 'react';
import {View, Text, TextInput, StyleSheet, Button} from 'react-native';
import {Cardoptions} from '../../component';
import Auth from '@react-native-firebase/auth';
import ActionSheet from 'react-native-actions-sheet';

const ChangeEmail = ({s}) => {
  return (
    <ActionSheet ref={s}>
      <Text style={styles.title}>Ubah Email</Text>
      <Text style={styles.subtitle}>Email lama</Text>
      <TextInput
        placeholder="Masukkan Email lama"
        placeholderTextColor="black"
        style={styles.txtI}
      />
      <Text style={styles.subtitle}>Email Baru</Text>
      <TextInput
        placeholder="Masukkan Email Baru"
        placeholderTextColor="black"
        style={styles.txtI}
      />
      <View>
        <Button title="Ubah Email" />
      </View>
    </ActionSheet>
  );
};

export default function Changesecurity() {
  const actionRef = useRef();

  return (
    <View>
      <Cardoptions
        icon="mail"
        label="Ubah Email"
        onPress={() => actionRef.current?.show()}
      />
      <Cardoptions icon="lock-closed" label="Ubah Sandi" />
      <ChangeEmail s={actionRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    margin: 10,
  },
  subtitle: {
    fontSize: 15,
    color: 'black',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  txtI: {
    borderWidth: 1,
    borderColor: 'black',
    margin: 10,
  },
});
