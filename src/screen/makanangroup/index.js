import {View, Text, StyleSheet, FlatList, SafeAreaView} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {Allcard2, Btnback} from '../../component';
import firestore from '@react-native-firebase/firestore';

export default function Makanangroup({navigation}) {
  const [Data, setData] = useState([]);
  const isMounted = useRef();

  async function Get() {
    const docRef = await firestore().collection('Makanan').get();
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
        <Text style={styles.txt}>Makanan</Text>
      </View>
      <FlatList
        data={Data}
        renderItem={({item, index}) => (
          <SafeAreaView style={styles.container}>
            <Allcard2
              title={item.data.Nama}
              gambar={item.data.Gambar}
              kategori={item.data.Kategori}
              onPress={() => navigation.navigate('Fooddetail', {id: item.id})}
            />
          </SafeAreaView>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  txt: {fontSize: 25, fontWeight: '500', color: 'black', marginTop: 15},
  inlineWrap: {display: 'flex', flexDirection: 'row'},
  container:{},
});
