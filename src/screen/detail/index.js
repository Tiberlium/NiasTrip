import React, {useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import ImageView from 'react-native-image-viewing';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Btnback} from '../../component';




export default function Detail() {
  const [visible, setvisible] = useState(false);

  const images = [
    {
      uri: 'https://placeimg.com/640/480/any',
    },
    {
      uri: 'https://placeimg.com/640/480/nature',
    },
    {
      uri: 'https://placeimg.com/640/480/tech',
    },
  ];

  return (
    <View>
      <Btnback/>
      <Image source={{uri: images[0].uri}} style={styles.img} />
      <Text style={styles.title}>Hotel Kaliki</Text>





      <ImageView
        images={images}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setvisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    height: 300,
    width: wp(100),
    alignSelf: 'center',
    position: 'absolute',
  },
  title:{color:'white',fontWeight:'bold',fontSize:25},
});
