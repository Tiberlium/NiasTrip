import {View, StyleSheet, Dimensions, LogBox, ToastAndroid} from 'react-native';
import React, {useEffect} from 'react';
import axios from 'axios';
import base64 from 'base-64';
import {WebView} from 'react-native-webview';
import {Btncheckpayment} from '../../component';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function Payment({route, navigation}) {
  const [data, setdata] = React.useState({});
  const serverKey = 'SB-Mid-server-aOZTMq7MMpj0rwb4130chMv5:';
  const encodedKey = base64.encode(serverKey);

  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  const Data = route.params.paramsdata;

  const params = {
    transaction_details: {
      order_id: Data.orderId,
      gross_amount: Data.data.Harga,
    },
    credit_card: {
      secure: true,
    },
    customer_details: {
      first_name: Data.Profile.name,
      email: Data.Profile.email,
      phone: Data.Profile.PhoneNumber,
    },
    item_details: [
      {
        name: Data.data.Nama,
        quantity: Data.jmlhOrg,
        price: Data.data.Harga,
      },
    ],
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
      .then(() => {
        checkstatus();
      })
      .catch(err => console.log(err));
  }

  function checkstatus() {
    axios({
      url: `https://api.sandbox.midtrans.com/v2/order-csb-2/status`,
      method: 'get',
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
        Authorization: 'Basic ' + encodedKey,
      },
    })
      .then(result => {
        if (result.status === 200) {
          navigation.navigate('Receipt', {
            Data,
            time: result.data.settlement_time,
          });
        } else {
          ToastAndroid.show('Belum di bayar', ToastAndroid.SHORT);
        }
      })
      .catch(error => console.log(error));
  }

  // useEffect(() => {
  //   midtrans();
  // }, []);

  return (
    <View style={styles.container}>
      <WebView
        source={{uri: 'https://youtube.com'}}
        nestedScrollEnabled={true}
      />
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
