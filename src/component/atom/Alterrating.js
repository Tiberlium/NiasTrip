import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Alterrating() {
  return (
    <View>
      <Text style={styles2.title}>Ulasan Anda</Text>
      <View style={styles2.wrap}>
        <Image
          source={{uri: 'https://placeimg.com/640/480/any'}}
          style={styles2.img}
        />
        <View>
          <Text style={styles2.txt}>Yusran</Text>
          <View style={styles2.inlineWrap}>
            <Icon name="star" color="orange" size={20} />
            <Text style={styles2.icontxt}>5</Text>
          </View>
        </View>
      </View>
      <Text style={styles2.caption}>Bagus</Text>
      <Pressable onPress={edit}>
        <Text style={styles2.txtbutton}>Edit ulasan</Text>
      </Pressable>
    </View>
  );
}
