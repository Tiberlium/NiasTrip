import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet, Text, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {Bookmarkcard} from '../../component';

const Empty = () => {
  return (
    <View>
      <Image source={require('../../asset/bookmark.png')} style={styles.img} />
      <Text style={styles.txt}>Bookmark Kosong</Text>
    </View>
  );
};

export default function Bookmark({navigation}) {
  const isFocus = useIsFocused();
  const [Data, setData] = useState();

  async function Get() {
    await AsyncStorage.getItem('Book')
      .then(docs => (docs != null ? setData(JSON.parse(docs)) : null))
      .catch(e => console.log(e));
  }

  async function Delete(id) {
    const arr = Data.filter(e => e.id != id);
    await AsyncStorage.setItem('Book', JSON.stringify(arr))
      .then(() => Get())
      .catch(e => console.log(e));
  }

  function MoveAway(id, category) {
    category === 'tempat wisata'
      ? navigation.navigate('Detail', {id})
      : navigation.navigate('Hoteldetail', {id});
  }

  useEffect(() => {
    Get();
  }, [isFocus]);

  const Exist = () => {
    return (
      <FlatList
        data={Data}
        renderItem={({item}) => (
          <Bookmarkcard
            title={item.title}
            gambar={item.gambar}
            kategori={item.kategori}
            onDelete={() => Delete(item.id)}
            onPress={() => MoveAway(item.id, item.kategori)}
          />
        )}
      />
    );
  };

  return <View>{Data && Data.length ? <Exist /> : <Empty />}</View>;
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
