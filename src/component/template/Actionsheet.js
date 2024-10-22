import {View, Text, ToastAndroid, StyleSheet} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import Auth from '@react-native-firebase/auth';
import NumericInput from 'react-native-numeric-input';
import ActionSheet from 'react-native-actions-sheet';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Btnbooking, Btndate, Chiptipe, Txtpromo} from '..';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {uid} from 'uid';

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

  const [btnprop, setbtnprop] = useState({bg: '#FF5F7E', txt: 'gunakan'});

  const [kode, setkode] = useState('');
  const [promo, setpromo] = useState([]);
  const [diskon, setdiskon] = useState(0);
  const [jeniskamar, setjeniskamar] = useState('');

  const [tipe, settipe] = useState(0);

  const [chip1, setchip1] = useState({bg: 'white', txt: 'black'});
  const [chip2, setchip2] = useState({bg: 'white', txt: 'black'});

  let orderId = 'Orderid' + uid();
  let checkIN = checkin.toISOString().split('T')[0];
  let checkOUT = checkout.toISOString().split('T')[0];
  let countday = countDays(checkin, checkout);
  let total = countday * Number(data['Harga']) + tipe - diskon;

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

  async function getpromo() {
    let x = [];
    const docRef = await firestore().collection('Promo').get();
    docRef.docs.map(doc => {
      x.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    setpromo(x);
  }

  useEffect(() => {
    isMounted.current = true;
    getUserData();
    return () => (isMounted.current = false);
  }, []);

  useEffect(() => {
    getpromo();
  }, []);

  function pay() {
    navigation.navigate('Paymenthotel', {
      Jenis: 'Penginapan',
      Profile,
      orderId,
      checkIN,
      checkOUT,
      jmlhOrg,
      total,
      jeniskamar,
      diskon,
      gambar: data['Gambar'],
      nama: data['Nama'],
      tarif: data['Harga'],
    });
  }

  function potonganharga() {
    promo.map(doc => {
      if (
        doc['data']['Kode'] === kode.toUpperCase() &&
        doc['data']['Tempat'] === data['Nama']
      ) {
        let returned = (total * Number(doc['data']['Potongan'])) / 100;
        setdiskon(returned);
        setbtnprop({bg: 'grey', txt: 'digunakan'});
      } else {
        return false;
      }
    });
  }

  function Book() {
    if (Object.keys(Profile).length == 0) {
      ToastAndroid.show(
        'Lengkapi terlebih dahulu profile anda sebelum melakukan pemesanan',
        ToastAndroid.SHORT,
      );
      return false;
    } else {
      pay();
    }
  }

  async function select() {
    setjmlhOrg();
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
        <Text style={actionStyles.txt3}>Tipe</Text>
        <View style={actionStyles.wrap}>
          <Chiptipe
            title="Reguler"
            text={chip1.txt}
            background={chip1.bg}
            value={tipe}
            onPress={() => {
              settipe(0);
              setjeniskamar('Reguler');
              setchip1({bg: '#FF5F7E', txt: 'white'});
              setchip2({bg: 'white', txt: 'black'});
            }}
          />
          <Chiptipe
            title="Vip"
            text={chip2.txt}
            background={chip2.bg}
            value={tipe}
            onPress={() => {
              settipe(250000);
              setjeniskamar('Vip');
              setchip2({bg: '#FF5F7E', txt: 'white'});
              setchip1({bg: 'white', txt: 'black'});
            }}
          />
        </View>
        <Text style={actionStyles.txt3}>Kode promo</Text>
        <Txtpromo
          value={kode}
          onChangeText={setkode}
          onpress={potonganharga}
          bg={btnprop.bg}
          label={btnprop.txt}
        />
        <Text style={actionStyles.txt3}>Jumlah</Text>
        <View style={actionStyles.parentcontainer}>
          <View style={actionStyles.inlineContainer2}>
            <NumericInput
              onChange={value => setjmlhOrg(value)}
              value={jmlhOrg}
              totalHeight={40}
              rounded
              containerStyle={actionStyles.nmrsinputst}
              maxValue={3}
              onLimitReached={() =>
                ToastAndroid.show('Maksimal 3 orang', ToastAndroid.SHORT)
              }
              iconStyle={{color: 'black'}}
            />
            <Text style={actionStyles.txt2}>Orang</Text>
          </View>
          <Text style={actionStyles.totalTxt}>{formatIDR(total)}</Text>
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
  checkIcon: {marginTop: hp(7.8)},
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
  nmrsinputst: {
    marginLeft: 5,
  },
  wrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
});
