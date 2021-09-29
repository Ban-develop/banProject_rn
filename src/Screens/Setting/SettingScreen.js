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
} from 'react-native';


import Axios from 'axios';


import HeaderComponent from '../../Component/Header';

import { StackActions, CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingScreen = (props) => {

    const logoutHandler = () => {
        AsyncStorage.clear();
        const resetAction = CommonActions.reset({
            index: 1,
            routes: [
              { name: 'AuthScreen' },
            ],
          });
        props.navigation.dispatch(resetAction);
    }

    const pushHandler = () =>{
        console.log("Send Message");

        let key = 'AAAAqO162nY:APA91bFgFLXsRrAfo17icMgIt6XO2uy_m4iH0vvcu5WiSfqNgr37CaIZPaJULGgPgFvdKu4L0lU3TpW_4m3M_TFkzLWAeCcIuAlevxGLmJxg1WUvIUhHI5dbaU3tvAyNiKgTDtUeeRIQ';
        let to = 'd6smrYFoSB257MSyGtWmE6:APA91bGCszDDbqZYof4bD38-7JAHJDQg6DIl-oFJAf5Dj7Kjkj_ZZloqsL_jlVBo52tRcIM6_hTHmTAi8FPqLDICAKKXLtmbgMowcHshPgYpnah4O_vojDT4hABmjghickXZJmJAUtzJ';

        let uri = 'https://fcm.googleapis.com/fcm/send';

        let headers = {
            'Authorization': 'key=' + key,
            'Content-Type': 'application/json'
        }

        let datas ={
            'to': to,
            'data': {
                "title" : "subejct~",
                "message" : "message~"
            },
            "notification":{
                "title":"subject",
                "message":"message"
            },
        }


        setTimeout(() => {
            Axios({
                method:'post',
                url:'https://fcm.googleapis.com/fcm/send',
                data:datas,
                headers:headers
            })
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err);
            })
        }, 2000);
    }

    return (
        <SafeAreaView style={styles.container}>
            <HeaderComponent navigation={props.navigation} type={'main'}/>
            <View style={styles.wrap}>
                <Text>Home!!</Text>
                <Text onPress={() => logoutHandler()}>LOGOUT</Text>
                <Text onPress={() => pushHandler()}>PUSH</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container : {
        flex:1,
        justifyContent : 'center',
        alignItems : 'center',
    },
    wrap:{
        flex:1,
        justifyContent : 'center',
        alignItems : 'center',
    },
})

export default SettingScreen;