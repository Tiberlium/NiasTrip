import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import React from 'react';

function Searchcard({img, text}) {
  return (
    <View>
      <View>
        <Image source={{uri: img}} style={styles.img} resizeMode="cover" />
        <Text style={styles.txt} numberofLines={1}>
          {text}
        </Text>
      </View>
    </View>
  );
}

export default React.memo(Searchcard);


const styles = StyleSheet.create({
  img: {
    height: 240,
    margin: 10,
    width: 170,
    borderRadius: 10,
    alignSelf: 'center',
  },
  txt: {
    textAlign: 'center',
    width: 180,
    color: 'black',
  },
});
