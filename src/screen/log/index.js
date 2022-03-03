import React from 'react';
import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {Reservecard} from '../../component';
import {useNavigation} from '@react-navigation/native';
import Auth from '@react-native-firebase/auth';

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
      renderItems={({item, index}) => (
        <Reservecard
          img={item.gambar}
          title={item.nama}
          checkIn={item.checkIN}
          CheckOut={item.CheckOUT}
          jumlah={item.jumlah}
          total={item.harga}
          onPress={() => {
            navigation.navigate('Receipt', {data, nama: user.displayName});
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
