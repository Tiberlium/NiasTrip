import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {Btnback, Allcard} from '../../component';
import firestore from '@react-native-firebase/firestore';

export default function Fullview({navigation}) {
  const [Data, setData] = useState([]);
  const isMounted = useRef();

  async function Get() {
    const docRef = await firestore().collection('Wisata').get();
    let y = [];

    docRef.docs.map(x => {
      y.push({
        id: x.id,
        data: x.data(),
      });
    });
    if (isMounted.current) return setData(y);
  }

  useEffect(() => {
    isMounted.current = true;
    Get();
    return () => (isMounted.current = false);
  }, []);

  return (
    <View>
      <View style={styles.inlineWrap}>
        <Btnback onPress={() => navigation.goBack()} />
        <Text style={styles.txt}>Spot Wisata</Text>
      </View>
      <FlatList
        data={Data}
        renderItem={({item}) => (
          <Allcard
            title={item.data.Nama}
            kota={item.data.Kecamatan}
            kabupaten={item.data.Kabupaten}
            gambar={item.data.Gambar}
            onPress={() => navigation.navigate('Detail', {id: item.id})}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  txt: {fontSize: 25, fontWeight: 'bold', color: 'black', marginTop: 15},
  inlineWrap: {display: 'flex', flexDirection: 'row'},
});
