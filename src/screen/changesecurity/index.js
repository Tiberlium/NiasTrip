import React, {useState, useRef} from 'react';
import {View, Text, TextInput, StyleSheet, Pressable} from 'react-native';
import {Cardoptions} from '../../component';
import Auth from '@react-native-firebase/auth';
import ActionSheet from 'react-native-actions-sheet';

const ChangeEmail = ({s}) => {
  const [currentPass, setcurrentPass] = useState('');
  const [Email, setEmail] = useState('');
  return (
    <ActionSheet ref={s}>
      <Text style={styles.title}>Ubah Email</Text>
      <Text style={styles.subtitle}>Password</Text>
      <TextInput
        placeholder="Masukkan Password"
        placeholderTextColor="black"
        secureTextEntry={true}
        style={styles.txtI}
        value={currentPass}
        onChangeText={setcurrentPass}
      />
      <Text style={styles.subtitle}>Email Baru</Text>
      <TextInput
        placeholder="Masukkan Email Baru"
        placeholderTextColor="black"
        style={styles.txtI}
        value={Email}
        onChangeText={setEmail}
      />
      <Pressable style={styles.btn}>
        <Text style={styles.btntxt}>Ubah Email</Text>
      </Pressable>
    </ActionSheet>
  );
};

const ChangePass = ({s}) => {
  const [currentPass, setcurrentPass] = useState('');
  const [newPass, setnewPass] = useState('');
  return (
    <ActionSheet ref={s}>
      <Text style={styles.title}>Ubah Sandi</Text>
      <Text style={styles.subtitle}>Sandi Lama</Text>
      <TextInput
        placeholder="Masukkan Sandi Lama"
        placeholderTextColor="black"
        secureTextEntry={true}
        style={styles.txtI}
        value={currentPass}
        onChangeText={setcurrentPass}
      />
      <Text style={styles.subtitle}>Sandi Baru</Text>
      <TextInput
        placeholder="Masukkan Sandi Baru"
        placeholderTextColor="black"
        secureTextEntry={true}
        style={styles.txtI}
        value={newPass}
        onChangeText={setnewPass}
      />
      <Pressable style={styles.btn}>
        <Text style={styles.btntxt}>Ubah Sandi</Text>
      </Pressable>
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
      <Cardoptions
        icon="lock-closed"
        label="Ubah Sandi"
        onPress={() => actionRef.current?.show()}
      />
      <ChangeEmail s={actionRef} />
      <ChangePass s={actionRef} />
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
    borderRadius: 10,
  },
  btn: {
    alignSelf: 'center',
    margin: 10,
    border: 1,
    borderColor: 'black',
    backgroundColor: 'blue',
    height: 50,
    width: 200,
    borderRadius: 15,
  },
  btntxt: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    marginTop: 10,
  },
});
