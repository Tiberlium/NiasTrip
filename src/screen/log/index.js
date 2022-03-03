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

  console.log(data);
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
          total={item.Data.total}
          onPress={() => {
            navigation.navigate('Receipt', {
              Data: item,
            });
          }}
        />
      )}
    />
  );

  return <View>{data && data.length ? <Exist /> : <Empty />}</View>;
}

const styles = StyleSheet.create({
  img: {
    height: 250,
    width: 250,
    alignSelf: 'center',
    marginTop: 150,
  },
  txt: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
    marginTop: 10,
    fontStyle: 'italic',
  },
});
