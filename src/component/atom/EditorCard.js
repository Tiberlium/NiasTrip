import {View, Text, StyleSheet, ImageBackground, Pressable} from 'react-native';
import {Subtitle} from '..';
import React from 'react';

export default function EditorCard({children, onPress}) {
  return (
    <View>
      <Subtitle text1="Rekomendasi" text2="Editor" />
      <ImageBackground
        source={require('../../asset/Banner.png')}
        style={styles.inlineContainer}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <View style={styles.sideWrap}>
            <Text style={styles.title}>By Editor</Text>
            <Text style={{width: 120, marginTop: 10}}>
              Berbagai tempat yang di rekomendasikan oleh editor
            </Text>
            <Pressable style={styles.btnContainer} onPress={onPress}>
              <Text style={styles.btntxt}>Lihat semua</Text>
            </Pressable>
          </View>
          <View>{children}</View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  inlineContainer: {
    padding: 20,
    marginTop: 10,
  },
  title: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
    marginTop: 40,
  },
  sideWrap: {
    marginRight: 2,
    position: 'relative',
  },
  btnContainer: {
    backgroundColor: 'white',
    height: 35,
    width: 100,
    padding: 5,
    borderRadius: 5,
    marginTop: 20,
  },
  btntxt: {
    textAlign: 'center',
    color: 'black',
    marginTop: 2,
  },
});
