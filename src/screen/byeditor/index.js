import {View, Text, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import {Btnback} from '../../component';
export default function Byeditor({navigation}) {
  return (
    <View>
      <View style={styles.inlineWrap}>
        <Btnback onPress={() => navigation.goBack()} />
        <Text style={styles.txt}>Rekomendasi Editor</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  txt: {fontSize: 25, fontWeight: '500', color: 'black', marginTop: 15},
  inlineWrap: {display: 'flex', flexDirection: 'row'},
});
