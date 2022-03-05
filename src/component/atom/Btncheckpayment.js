import {View, Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

export default function Btncheckpayment({onPress}) {
  return (
    <View>
      <Pressable style={styles.container} onPress={onPress}>
        <Text style={styles.text}>Dapatkan Receipt </Text>
        <View style={styles.wrapBtn}>
          <Icon
            name="chevron-forward-circle-outline"
            size={30}
            color="#0392FC"
          />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp(100),
    height: 50,
    backgroundColor: '#0392FC',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  text: {color: 'white', fontSize: 20, marginLeft: 100},
  wrapBtn: {
    height: 38,
    width: 38,
    backgroundColor: 'white',
    borderRadius: 7,
    paddingVertical: 3,
    paddingHorizontal: 4,
    marginTop: -1,
    marginRight: 10,
  },
});
