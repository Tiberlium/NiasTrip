import {View, StyleSheet, Dimensions} from 'react-native';
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

  const params = {
    transaction_details: {
      order_id: 'order-csb-2',
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
      .catch(err => console.log(err));
  }

  function checkstatus() {
    axios({
      url: `https://api.sandbox.midtrans.com/v2/${params.transaction_details.order_id}/status`,
      method: 'get',
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
        Authorization: 'Basic ' + encodedKey,
      },
    })
      .then(result => console.log(result))
      .catch(error => console.log(error));
  }

  useEffect(() => {
    midtrans();
  }, []);

  return (
    <View style={styles.container}>
      <WebView source={{uri: data.redirect_url}} nestedScrollEnabled={true} />
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
