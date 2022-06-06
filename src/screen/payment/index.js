import {View, StyleSheet, Dimensions, LogBox, ToastAndroid} from 'react-native';
import React, {useEffect} from 'react';
import axios from 'axios';
import base64 from 'base-64';
import {WebView} from 'react-native-webview';
import {Btncheckpayment} from '../../component';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const user = auth().currentUser;

export default function Payment({route, navigation}) {
  const [data, setdata] = React.useState({});
  const serverKey = 'SB-Mid-server-aOZTMq7MMpj0rwb4130chMv5:';
  const encodedKey = base64.encode(serverKey);

  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  const {
    Jenis,
    Profile,
    orderId,
    checkIN,
    checkOUT,
    jmlhOrg,
    total,
    nama,
    gambar,
    tarif,
  } = route.params;

  const fixedPrice = total.toFixed(3);

  const totalprice = total + '000';

  const params = {
    transaction_details: {
      order_id: orderId,
      gross_amount: totalprice,
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
              checkin: checkIN,
              checkout: checkOUT,
              jumlah: jmlhOrg,
              time: time,
              total: fixedPrice,
              guest: Profile.name,
              nama: nama,
              orderid: orderId,
              jenis: Jenis,
              gambar: gambar,
              tarif,
              metode,
            }),
          });
        } else {
          docRef.set(
            {
              reservation: [
                {
                  checkin: checkIN,
                  checkout: checkOUT,
                  jumlah: jmlhOrg,
                  reservationTime: time,
                  total: fixedPrice,
                  guest: Profile.name,
                  nama: nama,
                  orderid: orderId,
                  jenis: Jenis,
                  gambar: gambar,
                  tarif,
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
      checkin: checkIN,
      checkout: checkOUT,
      jumlah: jmlhOrg,
      timetransaction: time,
      total: fixedPrice,
      guest: Profile.name,
      nama: nama,
      orderid: orderId,
      jenis: Jenis,
      gambar: gambar,
      tarif,
      metode,
    };

    AsyncStorage.getItem('Order').then(doc => {
      doc = doc === null ? [] : JSON.parse(doc);
      doc.push(value);
      return AsyncStorage.setItem('Order', JSON.stringify(doc));
    });
  }

  function checkstatus() {
    axios({
      url: `https://api.sandbox.midtrans.com/v2/${orderId}/status`,
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
            name: nama,
            qty: jmlhOrg,
            checkin: checkIN,
            checkout: checkOUT,
            timetransaction: result.data.settlement_time,
            total: fixedPrice,
            orderid: orderId,
            metode: result.data.payment_type,
            jenis: Jenis,
            tarif,
          });
          updateToUser(result.data.settlement_time, result.data.payment_type);
          addOrder(result.data.settlement_time, result.data.payment_type);
        }
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
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
    height: height,
    width: width,
    flex: 1,
  },
});
