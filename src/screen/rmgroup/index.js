import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {Btnback, Allcard2} from '../../component';
import firestore from '@react-native-firebase/firestore';

export default function Rmgroup({navigation}) {
  const [data, setdata] = useState([]);
  const isMounted = useRef();

  const get = async () => {
    let x = [];
    const docRef = await firestore().collection('Rm').get();
    docRef.docs.map(doc => {
      x.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    if (isMounted.current === true) return setdata(x);
  };

  useEffect(() => {
    isMounted.current = true;
    get();
    return () => (isMounted.current = false);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.inlineWrap}>
        <Btnback onPress={() => navigation.goBack()} />
        <Text style={styles.txt}>Restoran</Text>
      </View>

      <FlatList
        data={data}
        contentContainerStyle={styles.container}
        renderItem={({item, index}) => (
          <View key={index}>
            <Allcard2
              title={item.data.Nama}
              kategori={item.data.Kategori}
              gambar={item.data.Gambar}
              onPress={() => navigation.navigate('Rm', {id: item.id})}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {paddingBottom:100},
  txt: {fontSize: 25, fontWeight: '500', color: 'black', marginTop: 15},
  inlineWrap: {display: 'flex', flexDirection: 'row'},
});
