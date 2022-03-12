import React, {useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet, PermissionsAndroid} from 'react-native';
import {
  Imageprofile,
  Btnback,
  Btntext,
  Cardinfo,
  Blankavatar,
  Widebtntext,
} from '../../component';
import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ActionSheet from 'react-native-actions-sheet';
import ImagePicker from 'react-native-image-crop-picker';
import Storage from '@react-native-firebase/storage';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function Personinfo({navigation}) {
  const user = Auth().currentUser;
  const [profile, setprofile] = useState({});
  const actionSheetRef = useRef();
  const isMounted = useRef();

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

  async function loadData() {
    firestore()
      .collection('Users')
      .doc(user.uid)
      .onSnapshot(doc => {
        if (isMounted.current) {
          doc.exists ? setprofile(doc.data()) : {};
        }
      });
  }

  useEffect(() => {
    isMounted.current = true;
    loadData();
    return () => (isMounted.current = false);
  }, []);

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
        task.on('state_changed', taskSnapshot => {
          console.log(
            `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
          );
        });

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
            task.on('state_changed', taskSnapshot => {
              console.log(
                `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
              );
            });

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

  const Sheet = () => {
    return (
      <View>
        <Text style={styles.sheetTitle}>Ubah Foto Profile</Text>
        <Widebtntext
          title="Buka dari Gallery"
          onPress={() => choosePhotofromLibrary()}
        />
        <Widebtntext
          title="Buka dari Camera"
          onPress={() => takePhotofromCamera()}
        />
        <Widebtntext
          title="Batal"
          onPress={() => actionSheetRef.current?.hide()}
        />
      </View>
    );
  };

  return (
    <View>
      <View style={styles.wrap}>
        <Btnback onPress={() => navigation.goBack()} />
        <Text style={styles.title}>Profil</Text>
      </View>
      <Avatar />
      <View style={styles.btntext}>
        <Btntext
          title="Ubah foto profil"
          color="#FF5F7E"
          onPress={() => actionSheetRef.current?.show()}
        />
      </View>
      <Cardinfo
        displayName={user.displayName || user.email || user.phoneNumber}
        gender={profile.gender || 'kosong'}
        email={user.email || 'kosong'}
        phone={profile.phoneNumber || 'kosong'}
        address={profile.address || 'kosong'}
        city={profile.city || 'kosong'}
        nation={profile.nation || 'kosong'}
        onPress={() => navigation.navigate('Update profile')}
      />
      <ActionSheet ref={actionSheetRef} bounceOnOpen={true}>
        <View>
          <Sheet />
        </View>
      </ActionSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {display: 'flex', flexDirection: 'row'},
  btntext: {alignSelf: 'center', marginTop: 10, marginBottom: 30},
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'black',
    marginTop: hp(2),
    marginHorizontal: wp(25),
  },
  sheetTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
    marginVertical: 10,
  },
});
