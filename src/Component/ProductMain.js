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
  ViewPropTypes,
  ActivityIndicator,
} from 'react-native';

import {
    HStack, Stack, Center,Flex,
    VStack,
    Divider,
    Button,
    NativeBaseProvider,
  } from "native-base"

import Axios from 'axios';
import uri from '../include/define';
import ProductList from './ProductList';

import Icon from 'react-native-vector-icons/Ionicons';
import { textColor } from 'styled-system';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';




const ProductMain = (props) => {

    const [list,setList] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    const [isFinish, setIsFinish] = useState(false);
    const [category, setCategroy] = useState((props.cate)?props.cate:'all');
    const [searchText, setSearchText] = useState((props.searchText)?props.searchText:'');
    const [viewType, setViewType]=useState('list');
    const [numColumns, setNumColumns]=useState(1);

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'all', title: 'all' },
        { key: 'new', title: 'new' },
        { key: 'hot', title: 'hot' },
        { key: 'best', title: 'best' },
    ])

    const renderTabBar = ({position, layout, jumpTo, navigationState}) => (
        <TabBar
            position={position}
            layout={layout}
            jumpTo={jumpTo}
            navigationState={navigationState}
            activeColor={'#777'}
            inactiveColor={'gray'}
            style={{backgroundColor:'#fff'}}
            indicatorStyle={{height:0}}
            activeColor={'black'}
            indicatorStyle={{
                backgroundColor: '#000',
            }}
            scrollEnabled={false}
            onTabPress={({route})=>{
                setIsLoading(true);
                if(route.key != category){
                    setPage(1);
                    setList([]);
                    setCategroy(route.key);
                }
            }}
        />
    )

    useEffect(()=>{
        getProductList();
    },[category])

    const getProductList = () => {
        setIsLoading(true);
        let apiURi = (searchText != '' )
        ?`${uri.dev}/api/product/list?page=${page}&limit=${limit}&category=${category}&searchText=${searchText}`
        :`${uri.dev}/api/product/list?page=${page}&limit=${limit}&category=${category}`;
        console.log(apiURi);
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
                setList(list.concat(response.data.body));

                
                console.log((response.data.body).length);
                if((response.data.body).length < parseInt(limit)){
                    setIsFinish(true);
                }
                else{
                    setIsFinish(false);
                }
            }
            setIsLoading(false);
        })
        .catch((err) => {
            console.log(err);
            setIsLoading(false);
        })
    }

    const MoreHandler = () => {
        console.log(isLoading);
        if (isLoading) {
          return;
        } else {
            getProductList();
        }
      };
    
      if (!list) {
        return null;
      }

    const ViewType = (type) => {
        setViewType(type);
        (type == "list")?setNumColumns(1):setNumColumns(2);
    }

    return (
        <>
        <View style={{width:'100%',height:35,alignItems:'flex-end',flexDirection: 'row',borderBottomWidth: 0.5,paddingBottom:3}}>
            <Icon name={(viewType=='list')?'list':'list-outline'} size={25} style={{paddingLeft:15}} onPress={()=>ViewType('list')}/>
            <Icon name={(viewType=='align')?'square':'square-outline'} size={25} style={{paddingLeft:15}} onPress={()=>ViewType('align')}/>
        </View>
        <TabView
            navigationState={{ index, routes }}
            renderTabBar={renderTabBar}
            renderScene={({route})=>{
                return (
                    <FlatList
                        key={viewType}
                        onEndReachedThreshold={(viewType=='list')?0.3:0.3}
                        onEndReached={isFinish ? null : MoreHandler}
                        data={list}
                        numColumns={numColumns}
                        keyExtractor={(item, index) => 'key' + index}
                        renderItem={({item,index}) => {
                            return <ProductList item={item} navigation={props.navigation} index={index} viewType={viewType}/>;
                        }}
                        ListFooterComponent={isLoading && <ActivityIndicator style={styles.loading} size="large" color="#A0D9E2"/>}
                    />)
            }}
            onIndexChange={setIndex}
            initialLayout={{ width: 300 }}
        />
        </>

        // <NativeBaseProvider>
        // <View style={styles.wrap}>
        
        //     <View style={{width:'100%',height:35,alignItems:'flex-end',flexDirection: 'row',borderBottomWidth: 0.5,paddingBottom:3}}>
        //         <Icon name={(viewType=='list')?'list':'list-outline'} size={25} style={{paddingLeft:15}} onPress={()=>ViewType('list')}/>
        //         <Icon name={(viewType=='align')?'square':'square-outline'} size={25} style={{paddingLeft:15}} onPress={()=>ViewType('align')}/>
        //     </View>
        //     {/* {
        //         viewType == 'list'?
        //         <FlatList
        //             onEndReachedThreshold={0.5}
        //             onEndReached={MoreHandler}
        //             data={list}
        //             keyExtractor={(item, index) => 'key' + index}
        //             numColumns={1}
        //             renderItem={({item,index}) => {
        //                 return <ProductList item={item} navigation={props.navigation} index={index} viewType={viewType}/>;
        //             }}
        //         />
        //         :
        //         <FlatList
        //             onEndReachedThreshold={1}
        //             onEndReached={MoreHandler}
        //             data={list}
        //             keyExtractor={(item, index) => 'key' + index}
        //             numColumns={2}
        //             renderItem={({item,index}) => {
        //                 return <ProductList item={item} navigation={props.navigation} index={index} viewType={viewType}/>;
        //             }}
        //         />
        //     } */}
        //     {/* <FlatList
        //         key={viewType}
        //         onEndReachedThreshold={0.1}
        //         onEndReached={MoreHandler}
        //         data={list}
        //         numColumns={numColumns}
        //         keyExtractor={(item, index) => 'key' + index}
        //         renderItem={({item,index}) => {
        //             return <ProductList item={item} navigation={props.navigation} index={index} viewType={viewType}/>;
        //         }}
        //     /> */}
            
        // </View>
        // {/* <View style={styles.reminderView}>
        //     <TouchableOpacity style={styles.reminderTouch} onPress={()=>props.navigation.navigate('ProductRegist')}>
        //         <Icon name='add-outline' size={40} color={'#fff'} style={styles.reminderBtn} />
        //     </TouchableOpacity>
        // </View> */}
        // </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    wrap:{
        flex:1,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor:'#fff'
    },
    cate:{
        width:'33%',
        marginTop:5,
        alignItems: 'center',
        padding:10,
        borderWidth: 2,
        borderColor: '#000',
    },
    reminderView: {
        flex: 1,
        right:-10,
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
    },
    loading:{
        height: 80,
        width: "100%",
        backgroundColor: "#fff",
    }
})

export default ProductMain;