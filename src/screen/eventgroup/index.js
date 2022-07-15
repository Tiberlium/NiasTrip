import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {Btnback, Allcard3} from '../../component';
import firestore from '@react-native-firebase/firestore';

function formatter(uang) {
  return Intl.NumberFormat('ID-id', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(uang);
}

export default function Eventgroup({navigation}) {
  const [Data, setData] = useState([]);
  const isMounted = useRef();

  async function Get() {
    const docRef = await firestore().collection('Event').get();
    let x = [];
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
    <View style={styles.container}>
      <View style={styles.inlineWrap}>
        <Btnback onPress={() => navigation.goBack()} />
        <Text style={styles.txt}>Event</Text>
      </View>
      <FlatList
        data={Data}
        contentContainerStyle={styles.container}
        renderItem={({item}) => (
          <Allcard3
            title={item.data.Nama}
            gambar={item.data.Gambar}
            kota={item.data.Kategori}
            kabupaten={item.data.Kabupaten}
            rating={item.data.Rating}
            value={item.data.Rating ? item.data.Rating : 0}
            price={formatter(Number(item.data.Harga))}
            onPress={() => navigation.navigate('Eventdetail', {id: item.id})}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {paddingBottom: 100},
  txt: {fontSize: 25, fontWeight: '500', color: 'black', marginTop: 15},
  inlineWrap: {display: 'flex', flexDirection: 'row'},
});
