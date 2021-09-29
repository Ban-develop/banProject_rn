import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
} from 'react-native';

import {
    FormControl,
    Input,
    Stack,
    Center,
    NativeBaseProvider,
    Button,
    useToast ,
    Heading,
  } from "native-base";

import HeaderComponent from '../../Component/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import ProductMain from '../../Component/ProductMain';

const SearchScreen = (props) => {

    const [searchText, setSearchText] = useState();
    const [searchListYN, setSearchListYN] = useState('n');

    useEffect(()=>{
        console.log(searchListYN)
    },[searchListYN])

    const searchHandler = () => {
        if(searchText != ""){
            setSearchListYN('y');
            //props.navigation.navigate("ProductSearch",{searchText : searchText});
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{flexDirection: 'row',borderBottomColor:'#777',borderBottomWidth:1}}>
                <View style={styles.views}>
                    <Icon style={styles.bicon} name="arrow-back-outline" size={30} onPress={() => props.navigation.goBack()}/>
                </View>
                <View style={styles.views}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setSearchText}
                        value={searchText}
                    />
                    <Icon style={styles.icon} name="search-outline" size={30} onPress={() => searchHandler()}/>
                </View>
            </View>
            {
                (searchListYN == "y")?<ProductMain navigation={props.navigation} searchText={searchText}/>:null
            }
            
        </SafeAreaView>
    )
}




const styles = StyleSheet.create({
    container : {
        flex:2,
        height : '7%',
        width : '100%',
        justifyContent : 'space-between',
        backgroundColor: '#fff',
    },
    views : {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoImg : {
        height:'100%',
        width:'65%',
        resizeMode:'cover',
    },
    icon : {
        justifyContent:'center',
        paddingTop:5,
        paddingRight:5
    },
    bicon : {
        justifyContent:'center',
        paddingTop:5,
        paddingLeft:5
    },
    input: {
        alignItems:'flex-start',
        height: 35,
        width:250,
        borderWidth: 1,
        padding: 10,
        marginTop:5,
        marginBottom:5,
        marginRight:40,
        
    },
})

export default SearchScreen;