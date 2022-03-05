import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function Btnnearby({onPress,title}) {
  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Text style={styles.txt}>{title}</Text>
        <View style={styles.wrap}>
          <Icon
            name="arrow-forward"
            size={30}
            color="#FF5F7E"
            style={styles.icon}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: 280,
    backgroundColor: '#FF5F7E',
    alignSelf: 'center',
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  wrap: {
    width: 40,
    heigth: 40,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
    marginLeft: 30,
  },
  txt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 13,
    marginLeft: 50,
  },
  icon: {alignSelf: 'center', marginTop: 3},
});
