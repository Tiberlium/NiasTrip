import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {Btnback, Allcard} from '../../component';
import firestore from '@react-native-firebase/firestore';

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
    <View>
      <View style={styles.inlineWrap}>
        <Btnback onPress={() => navigation.goBack()} />
        <Text style={styles.txt}>Event</Text>
      </View>
      <FlatList
        data={Data}
        renderItem={({item}) => (
          <Allcard
            title={item.data.Nama}
            gambar={item.data.Gambar}
            kota={item.data.Kategori}
            kabupaten={item.data.Kabupaten}
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
