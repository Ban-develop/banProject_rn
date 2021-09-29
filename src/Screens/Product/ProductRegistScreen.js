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
  FlatList,
  TouchableOpacity,
} from 'react-native';

import Axios from 'axios';
import uri from '../../include/define';
import HeaderComponent from '../../Component/Header';
import { StackActions, CommonActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import {
    FormControl,
    Input,
    Stack,
    Center,
    NativeBaseProvider,
    Button,
    CheckIcon,
    Heading,
    useToast ,
    Select,
  } from "native-base";

const ProductRegistScreen = (props) => {
    
    const toast = useToast();

    const [subject, setSubject] = useState();
    const [content, setContent] = useState();
    const [category, setCategroy] = useState('new');

    const registHandler = () => {
        let registData = {
            p_category : category,
            p_subject : subject,
            p_content : content,
            p_image : 'img'
        }
        
        Axios.post(`${uri.dev}/api/product/regist`,registData)
        .then((response) => {
            console.log(response.data)
            if(response.data.code == '200'){
                if(response.data.body.result == "success"){
                    console.log('success');
                    toast.show({
                        title: "CHECK YOUR ACCOUNT",
                        placement: "top-left"
                    })
                    props.navigation.dispatch( CommonActions.navigate("Product")); 
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

    return (
        <NativeBaseProvider>
            <HeaderComponent navigation={props.navigation} type={'sub'}/>
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
                    <Select
                        selectedValue={category}
                        w="95%"
                        mx={2}
                        accessibilityLabel="Select your favorite programming language"
                        placeholder="Select your favorite programming language"
                        onValueChange={(itemValue) => setCategroy(itemValue)}
                        _selectedItem={{
                        bg: "cyan.600",
                        endIcon: <CheckIcon size={4} />,
                        }}
                    >
                        <Select.Item label="new" value="new" />
                        <Select.Item label="hot" value="hot" />
                        <Select.Item label="best" value="best" />
                    </Select>
                    <Input
                        w="95%"
                        mx={2}
                        placeholder="Input Subject"
                        _light={{
                            placeholderTextColor: "blueGray.400",
                        }}
                        _dark={{
                            placeholderTextColor: "blueGray.50",
                        }}
                        onChangeText={text => setSubject(text)}
                    />
                    <Input
                        w="95%"
                        mx={2}
                        placeholder="Input Content"
                        _light={{
                            placeholderTextColor: "blueGray.400",
                        }}
                        _dark={{
                            placeholderTextColor: "blueGray.50",
                        }}
                        onChangeText={text => setContent(text)}
                    />
                    <Button w="95%" mx={2} onPress={() => registHandler()}>REGIST</Button>

                    <Button w="95%" colorScheme="secondary" mx={2} onPress={() => props.navigation.goBack()}>CANCEL</Button>
                </Stack>
            </Center>
        </NativeBaseProvider>
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
    reminderView: {
        flex: 1,
        right:0,
        margin:5,
        bottom:0,
        position:'absolute'
    },
        reminderTouch: {
        width: 50,
        height: 50,
        backgroundColor: '#06bcee',
        borderRadius: 100,
        justifyContent:'center',
        alignItems:'center',
        margin: 20,
    },
        reminderBtn: {
        marginTop: 2,
        marginLeft:2,
        alignSelf: 'center',
    }
})

export default ProductRegistScreen;