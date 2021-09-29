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
import HeaderComponent from '../../Component/Header';
import ProductList from '../../Component/ProductList';

import Icon from 'react-native-vector-icons/Ionicons';

const ProductSearchScreen = (props) => {

    const [list,setList] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [isLoading, setIsLoading] = useState(false);
    const [category, setCategroy] = useState('new');

    useEffect(()=>{
        console.log(props.searchText);
        getProductList();
    },[category])

    const getProductList = () => {
        setIsLoading(true);
        console.log(`${uri.dev}/api/product/list?page=${page}&limit=${limit}&category=${category}`);
        Axios.get(`${uri.dev}/api/product/list?page=${page}&limit=${limit}&category=${category}`)
        .then((response) => {
            console.log(response.data)
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

    const categoryHandler = (cate) => {
        console.log(`CLICK : ${cate}`)
        setIsLoading(true);
        if(cate != category){
            setPage(1);
            setList([]);
            setCategroy(cate);
        }
    }

    const MoreHandler = () => {
        if (isLoading) {
          return;
        } else {
            getProductList();
        }
      };
    
      if (!list) {
        return null;
      }

    return (
        <SafeAreaView style={styles.container}>
            <HeaderComponent navigation={props.navigation} type={'sub'}/>
            <View style={styles.wrap}>
                <View style={{flexDirection: 'row',}}>
                    <Text style={{width:'33%'}} onPress={() => categoryHandler('new')}>new</Text>
                    <Text style={{width:'33%'}} onPress={() => categoryHandler('hot')}>hot</Text>
                    <Text style={{width:'33%'}} onPress={() => categoryHandler('best')}>best</Text>
                </View>
                <FlatList
                    onEndReachedThreshold={0}
                    onEndReached={MoreHandler}
                    data={list}
                    keyExtractor={(item, index) => 'key' + index}
                    renderItem={({item}) => {
                        return <ProductList item={item} navigation={props.navigation} />;
                    }}
                    />
            </View>
            <View style={styles.reminderView}>
                <TouchableOpacity style={styles.reminderTouch} onPress={()=>props.navigation.navigate('ProductRegist')}>
                    <Icon name='add-outline' size={40} color={'#fff'} style={styles.reminderBtn} />
                </TouchableOpacity>
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

export default ProductSearchScreen;