import React,{useState,useEffect} from 'react'
import { View,Image,StyleSheet } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Auth from '@react-native-firebase/auth';



export default function Splash({navigation}) {
    const [Initializing, setInitializing] = useState(true);
    const [User, setUser] = useState();


    function onAuthStateChanged(user) {
        setUser(user);
        if (Initializing) setInitializing(false);
      }
    

      useEffect(() => {
        const subscriber = Auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
      }, [])
      if (Initializing) return null;
    
      if(!User){
        setTimeout(() => {
          navigation.replace('Intro')
        }, 2000);
      }
      else{
        setTimeout(()=>{
          navigation.replace('Navigator');
        },2000)
      }


    return (
        <View>
            <Image source={require('../../asset/Logo.png')} style={styles.img}/>
        </View>
    )
}


const styles = StyleSheet.create({
    img:{height:200,width:200,alignSelf:'center',marginVertical:hp(40)}
})