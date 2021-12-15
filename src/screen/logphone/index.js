import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {Btnback} from '../../component';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Btnicon} from '../../component';

const Chip = () => {
  return (
    <View style={styles.chipContainer}>
      <Text style={styles.chipText}>+62</Text>
    </View>
  );
};

export default function Logphone({navigation}) {
  const [Phone, setPhone] = useState('+44');

  function Submit() {
    if (Phone && Phone.length >= 9) {
      navigation.navigate('Otp', {Phone});
    } else {
      alert('Nomor hp kurang dari 10 digit');
    }
  }

  return (
    <View>
      <Btnback onPress={() => navigation.goBack()} />
      <View style={styles.wrap}>
        <Text style={styles.title}>Masuk</Text>
        <Text style={styles.caption}>Silahkan masuk dengan nomor HP mu</Text>
      </View>
      <View style={styles.wrap2}>
        <Text style={styles.label}>Nomor HP</Text>
        <View style={styles.inlineWrap}>
          <Chip />
          <TextInput placeholder="12345678" onChangeText={setPhone} />
        </View>
      </View>
      <Btnicon onPress={() => Submit()} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {margin: 20},
  title: {fontWeight: 'bold', color: 'black', fontSize: 25, marginTop: 15},
  caption: {fontSize: 20, fontWeight: '300'},
  wrap2: {
    alignSelf: 'center',
    width: 300,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginTop: hp(5),
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  chipContainer: {
    height: 40,
    width: 60,
    borderWidth: 0.5,
    borderRadius: 20,
    marginRight: 10,
  },
  inlineWrap: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
  },
  chipText: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 5,
  },
});
