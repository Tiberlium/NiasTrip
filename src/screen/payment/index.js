import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import React from 'react';
import axios from 'axios';
import base64 from 'base-64';
import {WebView} from 'react-native-webview';

export default function Payment() {
  // const [data, setdata] = React.useState({});
  // const serverKey = 'SB-Mid-server-aOZTMq7MMpj0rwb4130chMv5:';
  // const encodedKey = base64.encode(serverKey);

  // const params = {
  //   transaction_details: {
  //     order_id: 'order-csb-2',
  //     gross_amount: 10000,
  //   },
  //   credit_card: {
  //     secure: true,
  //   },
  //   customer_details: {
  //     first_name: 'Johny',
  //     last_name: 'Kane',
  //     email: 'testmidtrans@mailnesia.com',
  //     phone: '08111222333',
  //   },
  // };

  // axios({
  //   url: 'https://app.sandbox.midtrans.com/snap/v1/transactions',
  //   method: 'post',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Accept: 'application/json',
  //     Authorization: 'Basic ' + encodedKey,
  //   },
  //   data: params,
  // })
  //   .then(snapResponse => {
  //     let snapToken = snapResponse.data;
  //     setdata(snapToken);
  //   })
  //   .catch(err => console.log(err));

  return (
    <View style={styles.container}>
      <WebView source={{uri: 'https://google.com/'}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
