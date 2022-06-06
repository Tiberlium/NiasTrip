import React from 'react';
import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {Reservecard} from '../../component';
import {useNavigation} from '@react-navigation/native';

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
      renderItem={({item}) => (
        <Reservecard
          img={item['gambar']}
          title={item['nama']}
          checkIn={item['checkin']}
          CheckOut={item['checkout']}
          jumlah={item['jumlah']}
          total={item['total']}
          onPress={() =>
            navigation.navigate('Receipt', {
              guest: item['guest'],
              nama: item['nama'],
              qty: item['jumlah'],
              checkin: item['checkin'],
              checkout: item['checkout'],
              timetransaction: item['timetransaction'],
              total: item['total'],
              orderid: item['orderid'],
              jenis: item['jenis'],
              metode: item['metode'],
              tarif: item['tarif'],
            })
          }
        />
      )}
    />
  );

  return (
    <View>
      <Text style={styles.title}>Transaction log</Text>
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
