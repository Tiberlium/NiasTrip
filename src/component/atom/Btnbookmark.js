import React from 'react'
import { View,StyleSheet,TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

export default function Btnbookmark({onPress}) {
    return (
        <View style={styles.wrap}>
            <TouchableOpacity onPress={onPress}>
                <Icon name="bookmark" size={30} style={styles.icon}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    wrap:{height:60,width:60,backgroundColor:'white',elevation:10,borderRadius:30},
    icon:{alignSelf:'center',marginTop:10},
})