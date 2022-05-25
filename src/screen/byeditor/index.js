import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {Btnback, Editordetail} from '../../component';
import firestore from '@react-native-firebase/firestore';

export default function Byeditor({navigation}) {
  const [data, setdata] = useState([]);
  let isMounted = useRef();

  async function get() {
    let x = [];

    const docRef = await firestore()
      .collection('Wisata')
      .where('Rekomendasi', '==', 'true')
      .get();

    docRef.docs.map(doc => {
      x.push({
        id: doc.id,
        data: doc.data(),
      });
    });

    if (isMounted.current) return setdata(x);
  }

  useEffect(() => {
    isMounted.current = true;
    get();
    return () => (isMounted.current = false);
  }, []);

  return (
    <View>
      <View style={styles.inlineWrap}>
        <Btnback onPress={() => navigation.goBack()} />
        <Text style={styles.txt}>Rekomendasi Editor</Text>
      </View>
      <FlatList
        data={data}
        contentContainerStyle={styles.flatlistcontainer}
        renderItem={({item}) => (
          <View key={item.id}>
            <Editordetail
              url={item.data.Gambar}
              title={item.data.Nama}
              desc={item.data.Alasanrekomen}
              onPress={() => navigation.navigate('Detail', {id: item.id})}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  txt: {fontSize: 25, fontWeight: '500', color: 'black', marginTop: 15},
  inlineWrap: {display: 'flex', flexDirection: 'row'},
  flatlistcontainer: {paddingBottom: 100},
});
