import {View, Text, StyleSheet, FlatList,SafeAreaView} from 'react-native';
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
    <View style={styles.container}>
      <View style={styles.inlineWrap}>
        <Btnback onPress={() => navigation.goBack()} />
        <Text style={styles.txt}>Event</Text>
      </View>
      <FlatList
        data={Data}
        renderItem={({item}) => (
          <SafeAreaView style={styles.container}>
            <Allcard
              title={item.data.Nama}
              gambar={item.data.Gambar}
              kota={item.data.Kategori}
              kabupaten={item.data.Kabupaten}
              onPress={() => navigation.navigate('Eventdetail', {id: item.id})}
            />
          </SafeAreaView>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  txt: {fontSize: 25, fontWeight: '500', color: 'black', marginTop: 15},
  inlineWrap: {display: 'flex', flexDirection: 'row'},
});
