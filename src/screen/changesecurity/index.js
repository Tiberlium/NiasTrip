import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import {Btnback, Cardoptions} from '../../component';
import Auth from '@react-native-firebase/auth';
import ActionSheet from 'react-native-actions-sheet';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

async function Reauthenticate(current) {
  const user = Auth().currentUser;
  const emailCred = Auth.EmailAuthProvider.credential(user.email, current);

  return user.reauthenticateWithCredential(emailCred);
}


const ChangeEmail = ({Emailchange}) => {
  const [currentPass, setcurrentPass] = useState('');
  const [Email, setEmail] = useState('');

  async function onChangeEmail() {
    await Reauthenticate(currentPass)
      .then(async () => {
        await Auth().currentUser.updateEmail(Email);
      })
      .catch(e => console.log(e));
  }
  return (
    <ActionSheet ref={Emailchange}>
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
      <Pressable style={styles.btn} onPress={() => onChangeEmail()}>
        <Text style={styles.btntxt}>Ubah Email</Text>
      </Pressable>
    </ActionSheet>
  );
};

const ChangePass = ({passchange}) => {
  const [currentPass, setcurrentPass] = useState('');
  const [newPass, setnewPass] = useState('');

  async function onChangePass() {
    await Reauthenticate(currentPass)
      .then(async () => {
        await Auth().currentUser.updatePassword(newPass);
      })
      .catch(e => console.log(e));
  }
  return (
    <ActionSheet ref={passchange}>
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
      <Pressable style={styles.btn} onPress={() => onChangePass()}>
        <Text style={styles.btntxt}>Ubah Sandi</Text>
      </Pressable>
    </ActionSheet>
  );
};

export default function Changesecurity({navigation}) {
  const actionRef = useRef();
  const actionRef_ = useRef();

  useEffect(() => {
    Alert.alert(
      'Perhatian',
      'Opsi ini hanya berlaku dengan metode sign in menggunakan email dan password',
    );
  }, []);

  return (
    <View>
      <View style={styles.wrap}>
        <Btnback onPress={() => navigation.goBack()} />
        <Text style={styles.headline}>Keamanan</Text>
      </View>
      <Cardoptions
        icon="mail"
        label="Ubah Email"
        onPress={() => actionRef_.current?.show()}
      />
      <Cardoptions
        icon="lock-closed"
        label="Ubah Sandi"
        onPress={() => actionRef.current?.show()}
      />
      <ChangeEmail Emailchange={actionRef_} />
      <ChangePass passchange={actionRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {display: 'flex', flexDirection: 'row', marginBottom: hp(3)},
  headline: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    marginTop: hp(2.5),
    marginHorizontal: wp(23),
  },
  title: {
    fontWeight: '500',
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
    backgroundColor: '#FF5F7E',
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
