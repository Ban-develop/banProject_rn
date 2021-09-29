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
  FlatList,
  TouchableOpacity,
} from 'react-native';

import Axios from 'axios';
import uri from '../../include/define';
import ChattingList from '../../Component/ChattingList';
import HeaderComponent from '../../Component/Header';
import Icon from 'react-native-vector-icons/Ionicons';

const ChattingScreen = (props) => {

    const [list,setList] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        getChattingList();
    },[])

    const getChattingList = () => {
        setIsLoading(true);
        let apiURi = `${uri.dev}/api/chat/roomList?page=${page}&limit=${limit}&mid=1`;
        Axios.get(`${apiURi}`)
        .then((response) => {
            if((response.data.body).length > 0){
                // ...TODO 
                // 첫페이지 리스트 갯수가 리미트 갯수보다 작을때 MoreHandler 탐...
                
                /*console.log(page + "/" + (response.data.body).length + "/" + limit);
                if(page == 1 && (response.data.body).length < limit){
                    console.log("here...");
                }
                else{
                    console.log("none here...");
                    setPage(page => page + 1);
                    setIsLoading(false);
                }*/
                setPage(page => page + 1);
                setIsLoading(false);
                setList(list.concat(response.data.body));
            }
        })
        .catch((err) => {
            console.log(err);
            setIsLoading(false);
        })
    }

    const MoreHandler = () => {
        if (isLoading) {
            return;
        } else {
            getChattingList();
        }
    };
    
    if (!list) {
    return null;
    }
    return (
        <>
        <View style={styles.wrap}>
            <FlatList
                onEndReachedThreshold={0}
                onEndReached={MoreHandler}
                data={list}
                keyExtractor={(item, index) => 'key' + index}
                renderItem={({item,index}) => {
                    return <ChattingList item={item} navigation={props.navigation} index={index}/>;
                }}
            />
        </View>
        </>
    )
}

const styles = StyleSheet.create({
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

export default ChattingScreen;