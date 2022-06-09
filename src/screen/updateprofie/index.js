import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  Text,
  PermissionsAndroid,
} from 'react-native';
import {
  Btnsubmit,
  Txtinput,
  Imageprofile,
  Btntext,
  Widebtntext,
  Blankavatar,
} from '../../component';
import SelectDropdown from 'react-native-select-dropdown';
import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';
import Storage from '@react-native-firebase/storage';
import ActionSheet from 'react-native-actions-sheet';
import ImagePicker from 'react-native-image-crop-picker';

export default function Updateprofile({navigation}) {
  const user = Auth().currentUser;
  const gender = ['Pria', 'Wanita'];
  const [nama, setnama] = useState(user.displayName || '');
  const [kelamin, setkelamin] = useState('Pria');
  const [hp, sethp] = useState('');
  const [address, setaddress] = useState('');
  const [kota, setkota] = useState('');
  const [email, setEmail] = useState(user.email || '');
  const [Kewarganegaraan, setKewarganegaraan] = useState('');
  const actionSheetRef = useRef();

  const Avatar = () => {
    return (
      <View>
        {user.photoURL ? (
          <Imageprofile uri={user.photoURL} />
        ) : (
          <Blankavatar height={100} width={100} upDown={10} />
        )}
      </View>
    );
  };

  const getprofile = async () => {
    const docRef = await firestore().collection('Users').doc(user.uid).get();
    if (docRef.exists) {
      setkelamin(docRef.data().gender);
      sethp(docRef.data().phoneNumber);
      setkota(docRef.data().city);
      setaddress(docRef.data().address);
      setKewarganegaraan(docRef.data().nation);
    } else {
      setkelamin('Pria');
      sethp('');
      setkota('');
      setaddress('');
      setKewarganegaraan('');
    }
  };

  useEffect(() => {
    getprofile();
  }, []);

  const Sheet = ({refs}) => {
    return (
      <ActionSheet ref={refs} bounceOnOpen={true}>
        <Text style={styles.sheetTitle}>Ubah foto profile</Text>
        <Widebtntext
          title="Buka dari Gallery"
          iconname="image"
          onPress={() => choosePhotofromLibrary()}
        />
        <Widebtntext
          title="Buka dari Camera"
          iconname="camera"
          onPress={() => takePhotofromCamera()}
        />
        <Widebtntext
          title="Batal"
          onPress={() => actionSheetRef.current?.hide()}
        />
      </ActionSheet>
    );
  };

  async function changeImageProfile(uri) {
    user.updateProfile({
      photoURL: uri,
    });
  }

  async function choosePhotofromLibrary() {
    ImagePicker.openPicker({
      width: 100,
      height: 100,
      cropping: true,
      compressImageQuality: 0.7,
    })
      .then(image => {
        actionSheetRef.current?.hide();
        const imageUri = image.path;
        let filename = imageUri.substring(imageUri.lastIndexOf('/' + 1));
        const storageRef = Storage().ref(`Profile/${filename}`);
        storageRef.putFile(imageUri);
        const task = storageRef.putFile(imageUri);

        task.then(async () => {
          await task;
          let uri = await storageRef.getDownloadURL();
          changeImageProfile(uri);
        });
      })
      .catch(e => {
        return null;
      });
  }

  async function takePhotofromCamera() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'NiasTrip',
          message: 'NiasTrip access to your camera',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        ImagePicker.openCamera({
          compressImageMaxHeight: 300,
          compressImageMaxWidth: 300,
          cropping: true,
          compressImageQuality: 0.7,
        })
          .then(image => {
            const imageUri = image.path;
            actionSheetRef.current?.hide();
            let fileName = imageUri.substring(imageUri.lastIndexOf('/') + 1);
            const storageRef = Storage().ref(`Profile/${fileName}`);
            storageRef.putFile(imageUri);
            const task = storageRef.putFile(imageUri);

            task.then(async () => {
              await task;
              let uri = await storageRef.getDownloadURL();
              changeImageProfile(uri);
            });
          })
          .catch(e => console.log(e));
      } else {
        console.log('location Permisson denied');
      }
    } catch (e) {
      return null;
    }
  }

  const optionalData = {
    img: user.photoURL,
    id: user.uid,
    name: nama,
    gender: kelamin,
    phoneNumber: hp,
    address: address,
    city: kota,
    email: email,
    nation: Kewarganegaraan,
  };

  async function handleChangeName() {
    await user
      .updateProfile({
        displayName: nama,
      })
      .then(() => {
        console.log('berhasil');
      })
      .catch(e => console.log(e));
  }

  async function handleUpdateProfile() {
    await firestore()
      .collection('Users')
      .doc(user.uid)
      .set(optionalData)
      .then(() => {
        ToastAndroid.show('User di update', ToastAndroid.SHORT);
        navigation.navigate('Personinfo');
      })
      .catch(e => console.log(e));
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Avatar />
        <View style={styles.btntext}>
          <Btntext
            title="Ubah foto profil"
            color="#FF5F7E"
            onPress={() => actionSheetRef.current?.show()}
          />
        </View>
        <Txtinput
          label="Nama"
          placeholder="Masukkan nama disini"
          onChangeText={setnama}
          value={nama}
        />
        <View style={styles.dropdownwrap}>
          <Text style={styles.lbldropdown}>Jenis Kelamin</Text>
          <SelectDropdown
            data={gender}
            defaultButtonText="Pilih jenis kelamin"
            buttonStyle={styles.dropDown}
            dropdownStyle={{borderRadius: 10}}
            rowTextStyle={{fontSize: 15}}
            onSelect={selectedItem => setkelamin(selectedItem)}
            renderDropdownIcon={() => (
              <Icon name="chevron-down" size={25} color="#808080" />
            )}
            buttonTextStyle={styles.txtstyle}
          />
        </View>

        <Txtinput
          label="HP"
          placeholder="Masukkan HP disini"
          onChangeText={sethp}
          value={hp}
        />
        <Txtinput
          label="Email"
          placeholder="Masukkan Email di sini"
          onChangeText={setEmail}
          value={email}
        />
        <Txtinput
          label="Alamat"
          placeholder="Masukkan alamat disini"
          onChangeText={setaddress}
          value={address}
        />
        <Txtinput
          label="Kota"
          placeholder="Masukkan Kota disini"
          onChangeText={setkota}
          value={kota}
        />
        <Txtinput
          label="Kewarganegaraan"
          placeholder="Masukkan Kewarganegaraan disini"
          onChangeText={setKewarganegaraan}
          value={Kewarganegaraan}
        />
        <Btnsubmit
          title="Perbarui"
          onPress={() => {
            handleChangeName();
            handleUpdateProfile();
          }}
          top={10}
          bottom={10}
        />
      </ScrollView>
      <Sheet refs={actionSheetRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {backgroundColor: 'white'},
  btntext: {alignSelf: 'center', marginTop: 10, marginBottom: 30},
  dropdownwrap: {alignSelf: 'center'},
  dropDown: {
    borderWidth: 0.5,
    borderColor: '#808080',
    width: 300,
    marginTop: 15,
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    marginVertical: 10,
  },
  lbldropdown: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: -5,
  },
  txtstyle: {fontWeight: '300', fontSize: 15},
  sheetTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
    marginVertical: 10,
  },
});
