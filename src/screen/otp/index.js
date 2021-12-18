import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Btnback, Btnicon} from '../../component';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Auth from '@react-native-firebase/auth';
import OTPInputView from '@twotalltotems/react-native-otp-input';

export default function Otp({navigation, route}) {
  const [Code, setCode] = useState(0);
  const [confirm, setconfirm] = useState(null);
  const [wrong, setwrong] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    signInwithPhone();
    return () => (isMounted.current = false);
  }, []);

  async function signInwithPhone() {
    try {
      const confirmation = await Auth().signInWithPhoneNumber(
        route.params.Phone,
      );
      setconfirm(confirmation);
    } catch (e) {
      console.log(e);
    }
  }

  async function Submit(){
    try {
      const response = await confirm.confirm(Code);
      response ? navigation.navigate('Navigator') : setwrong(true);
    } catch (e) {
      console.log(e);
    }
  }

  async function refresh() {
    setwrong(true);
    try {
      const response = await Auth().signInWithPhoneNumber(
        route.params.Phone,
        true,
      );
      setconfirm(response);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View>
      <Btnback onPress={() => navigation.goBack()} />
      <View style={styles.wrap}>
        <Text style={styles.title}>Kode Otp Sudah terkirim</Text>
        <Text style={styles.caption}>
          Silahkan masukkan kode yang telah terkirim di nomor anda
        </Text>
      </View>
      <OTPInputView
        pinCount={6}
        autoFocusOnLoad
        onCodeChanged={setCode}
        style={styles.otpContainer}
        codeInputFieldStyle={styles.inputField}
        codeInputHighlightStyle={styles.highlightInputField}
        onCodeFilled={() => Submit()}
        clearInputs={wrong}
      />
      <Btnicon name="refresh" onPress={() => refresh()} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {margin: 20},
  title: {fontWeight: 'bold', fontSize: 25, color: 'black'},
  caption: {color: 'black', fontSize: 15, fontWeight: '300'},
  otpContainer: {width: wp(80), height: 200, alignSelf: 'center'},
  inputField: {borderWidth: 1, borderColor: 'black', color: 'black'},
  highlightInputField: {borderColor: '#03DAC6', color: 'black'},
});
