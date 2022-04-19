import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import React from 'react';

function Searchcard({img, text,onPress}) {
  return (
    <View>
      <Pressable onPress={onPress}>
        <Image source={{uri: img}} style={styles.img} resizeMode="cover" />
        <Text style={styles.txt} numberofLines={1}>
          {text}
        </Text>
      </Pressable>
    </View>
  );
}

export default React.memo(Searchcard);


const styles = StyleSheet.create({
  img: {
    height: 200,
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
