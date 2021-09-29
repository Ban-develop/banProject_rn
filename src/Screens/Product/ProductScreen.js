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

import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import HeaderComponent from '../../Component/Header';
import ProductMain from '../../Component/ProductMain';

import Icon from 'react-native-vector-icons/Ionicons';

// const renderTabBar = ({position, layout, jumpTo, navigationState}) => (
//     <TabBar
//         position={position}
//         layout={layout}
//         jumpTo={jumpTo}
//         navigationState={navigationState}
//         activeColor={'#777'}
//         inactiveColor={'gray'}
//         style={{backgroundColor:'#fff'}}
//         indicatorStyle={{height:0}}
//         activeColor={'black'}
//         indicatorStyle={{
//             backgroundColor: '#000',
//         }}
//         scrollEnabled={false}
//         //onTabPress={({route})=>console.log(route.title)}
//     />
//   )

const ProductScreen = (props) => {

    // const [index, setIndex] = useState(0);
    // const [routes] = useState([
    //     { key: 'all', title: 'all' },
    //     { key: 'new', title: 'new' },
    //     { key: 'hot', title: 'hot' },
    //     { key: 'best', title: 'best' },
    // ])

    return (
        <SafeAreaView style={styles.container}>
            <HeaderComponent navigation={props.navigation} type={'main'}/>
            <ProductMain navigation={props.navigation}/>
            {/* <TabView
                navigationState={{ index, routes }}
                renderTabBar={renderTabBar}
                renderScene={({route})=>{
                    return <ProductMain navigation={props.navigation} cate={route.key}/>
                }}
                onIndexChange={setIndex}
                initialLayout={{ width: 300 }}
            /> */}
            <View style={styles.reminderView}>
                <TouchableOpacity style={styles.reminderTouch} onPress={()=>props.navigation.navigate('ProductRegist')}>
                    <Icon name='add-circle-outline' size={35} color={'#fff'} style={styles.reminderBtn} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container : {
        flex:1,
        // justifyContent : 'center',
        // alignItems : 'center',
        backgroundColor:'#fff'
    },
    reminderView: {
        flex: 1,
        right:-10,
        margin:5,
        bottom:0,
        position:'absolute'
    },
        reminderTouch: {
        width: 40,
        height: 40,
        backgroundColor: '#06bcee',
        borderRadius: 100,
        justifyContent:'center',
        alignItems:'center',
        margin: 20,
    },
        reminderBtn: {
        marginTop: 1,
        marginLeft:2,
        alignSelf: 'center',
    }
})

export default ProductScreen;