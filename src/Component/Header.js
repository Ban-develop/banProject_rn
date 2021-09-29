import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TextInput,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';


const Header = (props) => {
    
    {
        if(props.type === 'main'){
            return (
                <SafeAreaView style={styles.container}>
                    <View style={styles.views}>
                        <Image style={styles.logoImg}
                        source={require('../images/logo_.png')}/>
                    </View>
                    <View style={styles.views}>
                        <Icon style={styles.icon} name="search-outline" size={30} onPress={() => props.navigation.navigate('SearchScreen')}/>
                        <Icon style={styles.icon} name="heart-outline" size={30} onPress={() => props.navigation.navigate('HeartScreen')} />
                        <Icon style={styles.icon} name="notifications-outline" size={30} onPress={() => props.navigation.navigate('NoticeScreen')} />
                    </View>
                </SafeAreaView>
            )       
        }
        else{
            return (
                <SafeAreaView style={styles.container}>
                    <View style={styles.views}>
                        <Icon style={styles.bicon} name="arrow-back-outline" size={30} onPress={() => props.navigation.goBack()}/>
                    </View>
                </SafeAreaView>
            )
        }
    }
}

const styles = StyleSheet.create({
    container : {
        height : '7%',
        width : '100%',
        justifyContent : 'space-between',
        flexDirection: 'row',
        borderBottomColor:'#777',
        borderBottomWidth:1
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
        height: 40,
        width:250,
        marginRight:40,
        borderWidth: 1,
        padding: 10,
    },
    
})

export default Header;