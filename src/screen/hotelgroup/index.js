import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {Btnback, Allcard3} from '../../component';
import Firestore from '@react-native-firebase/firestore';

export default function Hotelgroup({navigation}) {
  const [Data, setData] = useState([]);
  const isMounted = useRef();

  function formatter(money) {
    return Intl.NumberFormat('ID-id', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(money);
  }
  async function Get() {
    let x = [];
    const docRef = await Firestore().collection('Staycation').get();
    docRef.docs.map(doc => {
      x.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    if (isMounted.current) return setData(x);
  }

  useEffect(() => {
    isMounted.current = true;
    Get();
    return () => (isMounted.current = false);
  }, []);

  return (
    <View>
      <View style={styles.wrap}>
        <Btnback onPress={() => navigation.goBack()} />
        <Text style={styles.txt}>Penginapan</Text>
      </View>
      <FlatList
        keyExtractor={item => item.id}
        data={Data}
        contentContainerStyle={styles.container}
        renderItem={({item}) => (
          <Allcard3
            title={item.data.Nama}
            kota={item.data.Kabupaten}
            kabupaten={item.data.Kategori}
            gambar={item.data.Gambar}
            rating={item.data.Rating}
            price={formatter(Number(item.data.Harga))}
            value={item.data.Rating ? item.data.Rating : 0}
            onPress={() => navigation.navigate('Hoteldetail', {id: item.id})}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {display: 'flex', flexDirection: 'row'},
  txt: {fontSize: 25, fontWeight: '500', color: 'black', marginTop: 15},
  container: {paddingBottom: 100},
});
