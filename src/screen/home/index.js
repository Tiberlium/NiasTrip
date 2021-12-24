import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  Listcategory,
  Profilehead,
  Searchbtn,
  Subhead,
  Subtitle,
} from '../../component';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function Home() {
  const user = auth().currentUser;
  const navigation = useNavigation();
  return (
    <View>
      <Profilehead
        source={{uri: user.photoURL}}
        name={user.displayName || user.email || user.phoneNumber}
      />
      <Text style={styles.title}>Mau kemana hari ini?</Text>
      <Searchbtn onPress={() => navigation.navigate('Search')} />
      <Subtitle text1="Pengalaman" text2="Lain" />
      <Listcategory />
      <Subhead />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'black',
    marginHorizontal: wp(5),
    marginBottom: hp(2),
    marginTop: hp(2),
  },
});
