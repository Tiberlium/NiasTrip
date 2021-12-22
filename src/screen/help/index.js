import React from 'react';
import {View, Linking, Image, StyleSheet, Text} from 'react-native';
import {Cardoptions} from '../../component';

export default function Help() {
  return (
    <View>
      <Image source={require('../../asset/help.png')} style={styles.img} />
      <Text style={styles.title}>Butuh Bantuan?</Text>
      <Text style={styles.caption}>
        Silakan menghubungi kami kapan saja.Klik kontak di bawah ini
      </Text>
      <Cardoptions
        label="Kirim Email"
        icon="mail"
        onPress={() =>
          Linking.openURL(
            'mailto:Niastrip@gmail.com?subject=Bantuan&body=Deskripsi',
          )
        }
      />
      <Cardoptions
        label="Whatsapp"
        icon="logo-whatsapp"
        left={10}
        onPress={() =>
          Linking.openURL('https://wa.me/82273009256?text=%7B0%7D+Balaji+CTest')
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    height: 150,
    width: 150,
    margin: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  caption: {
    color: 'black',
    fontWeight: '300',
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
