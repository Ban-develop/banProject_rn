import React, { useState, useCallback, useEffect } from 'react'
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
import { GiftedChat } from 'react-native-gifted-chat'

import Axios from 'axios';
import uri from '../../include/define';
import HeaderComponent from '../../Component/Header';

import io from 'socket.io-client';
const socket =  io.connect(uri.dev);

const ChattingDetailScreen = (props) => {

    const [messages, setMessages] = useState([]);
    //const [ioMessage, setIoMessage] = useState({room_idx : props.route.params.item.r_idx, message:'', name:''})
    const [roomIdx, setRoomIdx] = useState(props.route.params.item.r_idx);

    useEffect(() => {
        getChattingDetail();
        socket.on('STCMESSAGE',({room_idx,name,message,chatCnt})=>{
            console.log(`receive Message ==> ${room_idx} : ${name} : ${message} (${chatCnt})`);
            let newMessage = {
                _id: chatCnt,
                text: message,
                createdAt: new Date(),
                user: {
                    _id: parseInt(name),
                    name: `people_${name}`,
                    avatar: 'https://placeimg.com/140/140/any',
                },
            }
            setMessages(previousMessages => GiftedChat.append(previousMessages, newMessage))
            //setMessages([...messages,newMessage]);
        })
    }, [])

    const getChattingDetail = () => {
        let apiURi = `${uri.dev}/api/chat/list?r_idx=${roomIdx}`;
        let sData = {};
        let sDataList = [];
        Axios.get(`${apiURi}`)
        .then((response) => {
            (response.data.body).map((val,idx) => {
                sData = {
                    _id: idx + 1,
                    text: val.c_text,
                    createdAt: new Date(val.created_at),
                    user: {
                        _id: parseInt(val.c_writer),
                        name: `people_${val.c_writer}`,
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                }
                sDataList.push(sData);
            })
            setMessages(sDataList);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const onSend = useCallback((messages = []) => {
        let sendData = {
            r_idx : roomIdx,
            c_writer : 1,
            c_text : messages[0].text
        }

        /*let apiURi = `${uri.dev}/api/chat/send`;
        Axios.post(`${apiURi}`,sendData)
        .then((response) => {
            if(response.data.code == '200'){
                setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
            }
        })
        .catch((err) => {
            console.log(err);
        })*/

        let room_idx = sendData.r_idx;
        let name = sendData.c_writer;
        let message = sendData.c_text;
        socket.emit('CTSMESSAGE',{room_idx, name, message})

    }, [])

    return (
        // <SafeAreaView style={styles.container}>
        //     <HeaderComponent navigation={props.navigation} type={'sub'}/>
        //     <View style={styles.wrap}>
        //     <GiftedChat
        //         style={styles.chat}
        //         messages={messages}
        //         onSend={messages => onSend(messages)}
        //         user={{
        //             _id: 1,
        //         }}
        //     />
        //     </View>
        // </SafeAreaView>
        <>
        <HeaderComponent navigation={props.navigation} type={'sub'}/>
        <GiftedChat
            style={styles.chat}
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: 1,
            }}
        />
        </>
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
    chat:{
        width:300,
        height:300,
        backgroundColor:'#000'
    }
})

export default ChattingDetailScreen;