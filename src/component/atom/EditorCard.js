import {View, Text, StyleSheet} from 'react-native';
import {Subtitle} from '..';
import React from 'react';

export default function EditorCard() {
  return (
    <View>
      <Subtitle text1="Rekomendasi" text2="Editor" />
      <View style={styles.inlineContainer}>
        <Text>EditorCard</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inlineContainer: {
    backgroundColor: '#3A7AE3',
    padding: 20,
    marginTop: 10,
  },
});
