import {View, TextInput, StyleSheet, Pressable} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Custinput({onChangeText, value}) {
  return (
    <View>
      <TextInput
        placeholder="Email"
        placeholderTextColor={'grey'}
        style={styles.txt}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
}

const CustinputPass = ({onChangeText, value}) => {
  const [btn, setbtn] = useState('eye');
  const [secure, setsecure] = useState(true);

  function change() {
    if (!secure) {
      setsecure(true);
      setbtn('eye');
    } else {
      setsecure(false);
      setbtn('eye-off');
    }
  }
  return (
    <View>
      <TextInput
        placeholder="Password"
        placeholderTextColor={'grey'}
        style={stylesPass.txt}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={secure}
      />
      <Pressable style={stylesPass.icon} onPress={change}>
        <Icon name={btn} size={25} color="black" />
      </Pressable>
    </View>
  );
};

export {CustinputPass};

const styles = StyleSheet.create({
  txt: {
    borderColor: 'black',
    borderWidth: 0.2,
    marginTop: 30,
    width: 300,
    alignSelf: 'center',
    borderRadius: 7,
    color: 'black',
  },
});

const stylesPass = StyleSheet.create({
  txt: {
    borderColor: 'black',
    borderWidth: 0.2,
    marginTop: 15,
    width: 300,
    alignSelf: 'center',
    borderRadius: 7,
    position: 'absolute',
    color: 'black',
    paddingLeft:20,
  },
  icon: {
    alignSelf: 'flex-end',
    marginRight: 70,
    marginTop: 25,
  },
});
