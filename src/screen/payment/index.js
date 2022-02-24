import {View, StyleSheet, Dimensions, Button} from 'react-native';
import React, {useEffect} from 'react';
import axios from 'axios';
import base64 from 'base-64';
import {WebView} from 'react-native-webview';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function Payment() {
  const [data, setdata] = React.useState({});
  const serverKey = 'SB-Mid-server-aOZTMq7MMpj0rwb4130chMv5:';
  const encodedKey = base64.encode(serverKey);

  const orderId = 'order-csb-2';

  const params = {
    transaction_details: {
      order_id: orderId,
      gross_amount: 10000,
    },
    credit_card: {
      secure: true,
    },
    customer_details: {
      first_name: 'Johny',
      last_name: 'Kane',
      email: 'testmidtrans@mailnesia.com',
      phone: '08111222333',
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
      .then(() => {
        checkstatus();
      })
      .catch(err => console.log(err));
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
      .then(result => console.log(result.data.transaction_status))
      .catch(error => console.log(error));
  }

  // useEffect(() => {
  //   midtrans();
  // }, []);

  return (
    <View style={styles.container}>
      {/* <WebView source={{uri: 'https://google.com'}} nestedScrollEnabled={true} /> */}
      <Button title="halo" onPress={checkstatus} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    height: height,
    width: width,
  },
});
