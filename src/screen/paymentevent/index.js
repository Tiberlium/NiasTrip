import {View, Text, LogBox, ToastAndroid, StyleSheet} from 'react-native';
import React from 'react';
import axios from 'axios';
import base64 from 'base-64';
import {WebView} from 'react-native-webview';
import {Btncheckpayment} from '../../component';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Paymentevent({navigation, route}) {
  const [data, setdata] = React.useState({});
  const serverKey = 'SB-Mid-server-aOZTMq7MMpj0rwb4130chMv5:';
  const encodedKey = base64.encode(serverKey);
  const user = auth().currentUser;
  const {tarif, jenis, nama, Profile, gambar, orderid} = route.params;
  const fixedTarif = tarif + '000';

  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  const params = {
    transaction_details: {
      order_id: orderid,
      gross_amount: fixedTarif,
    },
    credit_card: {
      secure: true,
    },
  };

  function midtrans() {
    axios({
      url: 'https://app.sandbox.midtrans.com/snap/v1/transactions',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Basic ' + encodedKey,
      },
      data: params,
    })
      .then(snapResponse => {
        let snapToken = snapResponse.data;
        setdata(snapToken);
      })
      .catch(err => console.log(err));
  }

  async function updateToUser(time, metode) {
    let docRef = await firestore().collection('Users').doc(user.uid);

    docRef
      .get()
      .then(doc => {
        if (doc.get('reservation') != null) {
          docRef.update({
            reservation: firestore.FieldValue.arrayUnion({
              time: time,
              guest: Profile.name,
              nama: nama,
              orderid: orderid,
              jenis: jenis,
              gambar: gambar,
              tarif: fixedTarif,
              metode,
            }),
          });
        } else {
          docRef.set(
            {
              reservation: [
                {
                  time: time,
                  guest: Profile.name,
                  nama: nama,
                  orderid: orderid,
                  jenis: jenis,
                  gambar: gambar,
                  tarif: fixedTarif,
                  metode,
                },
              ],
            },
            {merge: true},
          );
        }
      })
      .then(() => console.log('berhasil'))
      .catch(error => console.log(error));
  }

  function addOrder(time, metode) {
    const value = {
      timetransaction: time,
      guest: Profile.name,
      nama: nama,
      orderid: orderid,
      jenis: jenis,
      gambar: gambar,
      total: fixedTarif,
      metode,
    };

    AsyncStorage.getItem('Order').then(doc => {
      doc = doc === null ? [] : JSON.parse(doc);
      doc.push(value);
      return AsyncStorage.setItem('Order', JSON.stringify(doc));
    });
  }

  async function addTransaction(data) {
    await firestore()
      .collection('Transaksi')
      .add({
        approvallcode: data.approval_code,
        currency: data.currency,
        amount: data.gross_amount,
        merchantid: data.merchant_id,
        orderid,
        metode: data.payment_type,
        transactiontime: data.transaction_time,
        signaturekey:data.signature_key,
        settlement: data.settlement_time,
        transactionid: data.transaction_id,
        customerid: user.uid, 
        customername: user.displayName,
        customerphone: Profile.phoneNumber,
        customeremail: Profile.email,
        customeraddress: Profile.address,
      })
      .then(() => console.log('berhasil ditambahkan'))
      .catch(err => console.error(err));
  }

  function checkstatus() {
    axios({
      url: `https://api.sandbox.midtrans.com/v2/${orderid}/status`,
      method: 'get',
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
        Authorization: 'Basic ' + encodedKey,
      },
    })
      .then(result => {
        if (result.data.status_code != 200) {
          ToastAndroid.show(
            'Selesaikan terlebih dahulu pembayaran',
            ToastAndroid.SHORT,
          );
          return false;
        } else {
          navigation.navigate('Receipt', {
            guest: Profile.name,
            nama: nama,
            timetransaction: result.data.settlement_time,
            orderid: orderid,
            metode: result.data.payment_type,
            jenis: jenis,
            total: fixedTarif,
          });
          updateToUser(result.data.settlement_time, result.data.payment_type);
          addOrder(result.data.settlement_time, result.data.payment_type);
          addTransaction(result.data);
        }
      })
      .catch(error => console.log(error));
  }

  React.useEffect(() => {
    midtrans();
  }, []);

  return (
    <View style={styles.container}>
      <WebView source={{uri: data.redirect_url}} nestedScrollEnabled={true} />
      <Btncheckpayment onPress={checkstatus} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    height: '100%',
    width: '100%',
    flex: 1,
  },
});
