import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Alterrating({img, title, rating, caption, edit}) {
  return (
    <View>
      <Text style={styles2.title}>Ulasan Anda</Text>
      <View style={styles2.wrap}>
        <Image source={{uri: img}} style={styles2.img} />
        <View>
          <Text style={styles2.txt}>{title}</Text>
          <View style={styles2.inlineWrap}>
            <Icon name="star" color="orange" size={20} />
            <Text style={styles2.icontxt}>{rating}</Text>
          </View>
        </View>
      </View>
      <Text style={styles2.caption}>{caption}</Text>
      <Pressable onPress={edit}>
        <Text style={styles2.txtbutton}>Edit ulasan</Text>
      </Pressable>
    </View>
  );
}
