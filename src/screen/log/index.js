import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {Reservecard} from '../../component';

const Empty = () => {
  return (
    <View>
      <Image source={require('../../asset/order.png')} style={styles.img} />
      <Text style={styles.txt}>Belum ada reservasi</Text>
    </View>
  );
};

export default function Log() {
  const [data, setData] = React.useState({});
  const isFocus = useIsFocused();

  async function Get() {
    await AsyncStorage.getItem('Order')
      .then(docs => (docs != null ? setData(JSON.parse(docs)) : null))
      .catch(e => console.log(e));
  }

  async function Delete(id) {
    const arr = data.filter(e => e.id != id);
    await AsyncStorage.setItem('Order', JSON.stringify(arr))
      .then(() => Get())
      .catch(e => console.log(e));
  }

  React.useEffect(() => {
    Get();
  }, [isFocus]);

  const Exist = () => <Reservecard />;

  return (
    <View>
      <Empty />
    </View>
  );
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
