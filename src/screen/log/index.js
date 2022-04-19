import React from 'react';
import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {Reservecard} from '../../component';
import {useNavigation} from '@react-navigation/native';
import Auth from '@react-native-firebase/auth';

function currencyFormater(harga) {
  harga.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });
}

const Empty = () => {
  return (
    <View>
      <Image source={require('../../asset/order.png')} style={styles.img} />
      <Text style={styles.txt}>Belum ada reservasi</Text>
    </View>
  );
};

export default function Log() {
  const [data, setdata] = React.useState({});
  const isFocus = useIsFocused();
  const navigation = useNavigation();
  const user = Auth().currentUser;

  async function Get() {
    await AsyncStorage.getItem('Order')
      .then(docs => (docs != null ? setdata(JSON.parse(docs)) : null))
      .catch(e => console.log(e));
  }

  React.useEffect(() => {
    Get();
  }, [isFocus]);

  const Exist = () => (
    <FlatList
      data={data}
      renderItem={({item, index}) => (
        <Reservecard
          img={item.Data.data.Gambar}
          title={item.Data.data.Nama}
          checkIn={item.Data.checkIN}
          CheckOut={item.Data.checkOUT}
          jumlah={item.Data.jmlhOrg}
          total={item.total}
          onPress={() => {
            navigation.navigate('Receipt', {
              guest: item.Data.Profile.name,
              name: item.Data.data.Nama,
              qty: item.Data.jmlhOrg,
              checkin: item.Data.checkOUT,
              checkout: item.Data.checkOUT,
              timetransaction: item.time,
              total: item.total,
              orderId: item.orderId,
            });
          }}
        />
      )}
    />
  );

  return (
    <View>
      <Text style={styles.title}>Reservation History</Text>
      {data && data.length ? <Exist /> : <Empty />}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {fontWeight: '500', fontSize: 25, color: 'black', padding: 20},
  img: {
    height: 250,
    width: 250,
    alignSelf: 'center',
    marginTop: 150,
  },
  txt: {
    textAlign: 'center',
    fontSize: 15,
    color: 'black',
    marginTop: 10,
  },
});
