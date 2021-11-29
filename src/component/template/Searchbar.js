import React from 'react'
import { View,TextInput,StyleSheet } from 'react-native'
import SearchLogoBtn from '../atom/SearchLogoBtn'

export default function Searchbar({onChangeText,value}) {
    return (
        <View style={styles.container}>
           <TextInput placeholder="Cari Sesuatu" placeholderTextColor="#3E3338" onChangeText={onChangeText} value={value}/>
           <SearchLogoBtn/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#C4C4C4',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        width:350,
        alignSelf:'center',
        borderRadius:15,
        padding:5,
    }
})