import {View, Text, Alert, ToastAndroid, StyleSheet} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import Auth from '@react-native-firebase/auth';
import NumericInput from 'react-native-numeric-input';
import ActionSheet from 'react-native-actions-sheet';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Btnbooking, Btndate} from '..';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';
import base64 from 'base-64';
import {useNavigation} from '@react-navigation/native';

function countDays(days1, days2) {
  return Math.ceil((days2 - days1) / 8.64e7);
}

export default function Actionsheet({refs, data}) {
  const navigation = useNavigation();
  const [inshow, setinshow] = useState(false);
  const [outshow, setoutshow] = useState(false);
  const [checkin, setcheckin] = useState(new Date());
  const [checkout, setcheckout] = useState(new Date());
  const [Profile, setProfile] = useState({});
  const [jmlhOrg, setjmlhOrg] = useState(0);
  const currentUser = Auth().currentUser;
  const isMounted = useRef();
  const serverKey = 'SB-Mid-server-aOZTMq7MMpj0rwb4130chMv5:';
  const encodedKey = base64.encode(serverKey);

  let Today = new Date();
  let current =
    Today.getMonth() + Today.getDay() + Today.getHours() + Today.getSeconds();
  let orderId = 'Orderid' + currentUser.uid + current;
  let checkIN = checkin.toISOString().split('T')[0];
  let checkOUT = checkout.toISOString().split('T')[0];
  let countday = countDays(checkin, checkout);
  let total = countday * Number(data['Harga']);

  const formatIDR = money => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(money);
  };

  function onChange(event, value) {
    if (inshow && event.type === 'set') {
      setinshow(false);
      setcheckin(value);
    } else if (outshow && event.type === 'set') {
      setoutshow(false);
      setcheckout(value);
    } else {
      setinshow(false);
      setoutshow(false);
    }
  }

  async function getUserData() {
    let docRef = await firestore()
      .collection('Users')
      .doc(currentUser.uid)
      .get();
    isMounted.current && docRef.exists ? setProfile(docRef.data()) : {};
  }

  useEffect(() => {
    isMounted.current = true;
    getUserData();
    return () => (isMounted.current = false);
  }, []);

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
        if (
          (result.status === 200 &&
            result.data.transaction_status === 'capture') ||
          (result.status === 200 &&
            result.data.transaction_status === 'settlement')
        ) {
          Alert.alert('Pemberitahuan', 'Tempat ini telah selesai reservasi');
          return false;
        } else {
          navigation.navigate('Paymenthotel', {
            Jenis: 'Tempat tinggal',
            Profile,
            orderId,
            checkIN,
            checkOUT,
            jmlhOrg,
            total,
            gambar: data['Gambar'],
            nama: data['Nama'],
            tarif: data['Harga'],
          });
        }
      })
      .catch(error => console.log(error));
  }

  function Book() {
    if (
      !Profile.gender &&
      !Profile.city &&
      !Profile.nation &&
      !Profile.email &&
      !Profile.phoneNumber
    ) {
      Alert.alert('Pemberitahuan', 'Lengkapi data diri anda');
    }
    checkstatus();
  }

  return (
    <ActionSheet
      ref={refs}
      indicatorColor="black"
      bounceOnOpen={true}
      drawUnderStatusBar={true}
      bounciness={4}
      gestureEnabled={true}>
      <View>
        <Text style={actionStyles.title}>Pemesanan</Text>
        <View style={actionStyles.inlineContainer}>
          <View>
            <Text style={actionStyles.txt}>Check In</Text>
            <Btndate
              onPress={() => setinshow(true)}
              value={checkin.toLocaleString('id-ID', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
              })}
            />
          </View>
          <View style={actionStyles.checkIcon}>
            <Icon name="swap-horizontal-outline" size={20} color="black" />
          </View>
          <View>
            <Text style={actionStyles.txt}>Check Out</Text>
            <Btndate
              onPress={() => setoutshow(true)}
              value={checkout.toLocaleString('id-ID', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
              })}
            />
          </View>
        </View>
        <Text style={actionStyles.txt3}>Jumlah</Text>
        <View style={actionStyles.parentcontainer}>
          <View style={actionStyles.inlineContainer2}>
            <NumericInput
              onChange={value => setjmlhOrg(value)}
              value={jmlhOrg}
              totalHeight={40}
              rounded
              maxValue={4}
              onLimitReached={() =>
                ToastAndroid.show('Maksimal 4 orang', ToastAndroid.SHORT)
              }
              iconStyle={{color: 'black'}}
            />
            <Text style={actionStyles.txt2}>Orang</Text>
          </View>
          <Text style={actionStyles.totalTxt}>{formatIDR(total) + '.000'}</Text>
        </View>
        <Btnbooking onPress={Book} />
      </View>
      <View>
        {(inshow && <DateTimePicker value={checkin} onChange={onChange} />) ||
          (outshow && <DateTimePicker value={checkout} onChange={onChange} />)}
      </View>
    </ActionSheet>
  );
}

const actionStyles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
  },
  txt: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#808080',
    paddingTop: 20,
    paddingBottom: 10,
  },
  txt2: {
    fontWeight: '300',
    fontSize: 15,
    color: 'black',
    paddingTop: 10,
    marginHorizontal: 10,
  },
  txt3: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#808080',
    paddingTop: 20,
    paddingBottom: 10,
    marginLeft: 10,
  },
  checkIcon: {marginTop: hp(8.5)},
  inlineContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  inlineContainer2: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingBottom: 20,
  },
  parentcontainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalTxt: {
    fontWeight: '500',
    color: 'black',
    fontSize: 15,
    marginRight: 20,
    marginTop: 10,
  },
});
