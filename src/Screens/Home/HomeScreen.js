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
  Dimensions,
} from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { WebView } from 'react-native-webview';
import {SliderBox} from 'react-native-image-slider-box';

import HeaderComponent from '../../Component/Header';
import { backgroundColor } from 'styled-system';


const FirstRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#fff' }} >
        <SliderBox
            images={[
                require('../../images/girl.jpg'),
                require('../../images/nature.jpg'),
                require('../../images/water.jpg'),
                require('../../images/tree.jpg'),
            ]}
            autoplay ={true}
        />
        {/* <Text>FIRST PAGE</Text> */}
    </View>
);

const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#fff',alignItems:'center',justifyContent:'center'}}>
        <Text>SECOND PAGE</Text>
        <WebView
            source={{uri: 'http://youtube.com'}}
        />
    </View>
);

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
});

const renderTabBar = ({position, layout, jumpTo, navigationState,route}) => (
    <TabBar
      position={position}
      layout={layout}
      jumpTo={jumpTo}
      navigationState={navigationState}
    //   indicatorStyle={style.TabIndicator}
    //   style={style.TabBar}
    //   labelStyle={style.TabLabel}
    //   inactiveColor={GRAY6}
    //   activeColor={BLACK}
    //     style={{
    //         backgroundColor:'#000'
    //     }}
    //     inactiveColor={false}
    //     activeColor={false}
        activeColor={'white'}
    	inactiveColor={'gray'}
        style={{backgroundColor:'#000'}}
        indicatorStyle={{height:0}}
        onTabPress={({route})=>console.log(route.title)}

    />
  )

const {width, height} = Dimensions.get('window');

const HomeScreen = (props) => {

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
    ])

    //let webviewRef = useRef();

    /** ?????? ref */
    // const handleSetRef = _ref => {
    //     webviewRef = _ref;
    // };

    // /** webview ?????? ????????? */
    // const handleEndLoading = e => {
    //     console.log("handleEndLoading");
    //     /** rn?????? ????????? ????????? ????????? ????????? */
    //     webviewRef.postMessage("?????? ????????? webview??? ????????? ????????? ???");
    // };

    return (
        <SafeAreaView style={styles.container}>
            <HeaderComponent navigation={props.navigation} type={'main'}/>
            {/* <View style={styles.wrap}>
                <Text>Home!!</Text>
            </View> */}
             <TabView
                navigationState={{ index, routes }}
                renderTabBar={renderTabBar}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: 300 }}
            />
            <WebView
                source={{uri: 'http://youtube.com'}}
            />
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container : {
        flex:1,
        //justifyContent : 'center',
        //alignItems : 'center',
    },
    wrap:{
        flex:1,
        justifyContent : 'center',
        alignItems : 'center',
    },
})

export default HomeScreen;