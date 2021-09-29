import React, { useEffect,useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
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
import { StackActions, CommonActions } from '@react-navigation/native';
import Axios from 'axios';
import uri from '../../include/define';

import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = (props) => {

    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    const toast = useToast();

    const registHandler = () => {

        let registData = {
            m_id : id,
            m_pw : pw
        }
        
        Axios.post(`${uri.dev}/api/member/regist`,registData)
        .then((response) => {
            console.log(response.data)
            if(response.data.code == '200'){
                if(response.data.body.result == "success"){
                    console.log('success');
                    toast.show({
                        title: "CHECK YOUR ACCOUNT",
                        placement: "top-left"
                    })
                    props.navigation.navigate('AuthScreen');
                }
                else if(response.data.body.result == "duplication"){
                    console.log('duplication');
                    toast.show({
                        title: "CHECK YOUR ACCOUNT",
                        placement: "top-left"
                    })
                }
                else{
                    console.log('fail');
                    toast.show({
                        title: "CHECK YOUR ACCOUNT",
                        placement: "top-left"
                    })
                }
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return(
        <NativeBaseProvider>
            <Center flex={1}>
                <Heading
                    alignSelf={{
                        base: "center",
                        md: "flex-start",
                    }}
                >
                REGIST
                </Heading>
                <Stack space={4} w="100%">
                    <Input
                        w="95%"
                        mx={2}
                        placeholder="Input Your ID"
                        _light={{
                            placeholderTextColor: "blueGray.400",
                        }}
                        _dark={{
                            placeholderTextColor: "blueGray.50",
                        }}
                        onChangeText={text => setId(text)}
                    />
                    <Input
                        w="95%"
                        mx={2}
                        placeholder="Input Your PW"
                        _light={{
                            placeholderTextColor: "blueGray.400",
                        }}
                        _dark={{
                            placeholderTextColor: "blueGray.50",
                        }}
                        onChangeText={text => setPw(text)}
                    />
                    <Button w="95%" mx={2} onPress={() => registHandler()}>REGIST</Button>

                    <Button w="95%" colorScheme="secondary" mx={2} onPress={() => props.navigation.goBack()}>CANCEL</Button>
                </Stack>
            </Center>
        </NativeBaseProvider>
    )
}
export default LoginScreen;