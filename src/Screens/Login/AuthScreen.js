import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions, CommonActions } from '@react-navigation/native';

const AuthScreen = (props) => {
    
    useEffect(()=>{
        AsyncStorage.getItem('userInfo').then(value =>
            {
                const resetAction = CommonActions.reset({
                    index: 1,
                    routes: [
                      { name: (value === null) ? 'LoginScreen' : 'BottomNavigation' },
                    ],
                  });
                props.navigation.dispatch(resetAction);
            }
        );
    })
    return(
        <></>
    )
}

export default AuthScreen