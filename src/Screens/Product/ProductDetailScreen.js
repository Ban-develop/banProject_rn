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
  PermissionsAndroid 
} from 'react-native';

import HeaderComponent from '../../Component/Header';
import MapView, {PROVIDER_GOOGLE,Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Modal from "react-native-modal";

const {width, height} = Dimensions.get('window');

async function requestPermission() {
    try {
      if (Platform.OS === 'ios') {
        return await Geolocation.requestAuthorization('always');
      }
      // 안드로이드 위치 정보 수집 권한 요청
      if (Platform.OS === 'android') {
        return await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
      }
    } catch (e) {
      console.log(e);
    }
  }

const ProductDetailScreen = (props) => {

    const [latitude, setLatitude] = useState(null);
    const [longitude, setLogitude] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        getMyLocation();
    }, []);

    const toggleModal = () => {
        console.log("click");
        setModalVisible(!isModalVisible);
    };

    const getMyLocation = () => {
        console.log('getLocation Func');

        requestPermission()
        .then(result => {
            console.log(result);
            if (result === 'granted' || Platform.OS === 'ios') {
            Geolocation.getCurrentPosition(
                position => {
                const myLatitude = JSON.stringify(position.coords.latitude);
                const myLongitude = JSON.stringify(position.coords.longitude);

                console.log(myLatitude + '/' + myLongitude);

                setLatitude(myLatitude);
                setLogitude(myLongitude);
                },
                error => {
                console.log(error.code, error.message);
                return false;
                },
                {enableHighAccuracy: false, timeout: 15000},
            );
            }
        })
        .catch(err => {
            console.log('location deined');
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <HeaderComponent navigation={props.navigation} text={'detail'} type={'sub'}/>
            <ScrollView>
            
                <MapView
                    style={{flex: 1, width: width, height: 300}}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={{
                        //latitude: parseFloat(latitude),
                        //longitude: parseFloat(longitude),
                        latitude: 37.5032,
                        longitude: 126.7714,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    }}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    >
                    <Marker
                        coordinate={{
                        latitude: 37.5032,
                        longitude: 126.7714,
                        }}
                        title={props.route.params.item.p_subject}
                        description={props.route.params.item.p_content}
                        onPress={()=> toggleModal()}
                    />
                </MapView>
                <View style={styles.cArea}>
                    <View style={styles.cArea1}>
                        <Text>{props.route.params.item.p_subject}</Text>
                    </View>
                    <View style={styles.cArea2}>
                        <Text>{props.route.params.item.p_content}</Text>
                    </View>
                    <View style={styles.cArea3}>
                        <Text>{props.route.params.item.created_at}</Text>
                    </View>
                </View> 
                <Modal 
                    isVisible={isModalVisible} 
                    animationInTiming={1000} 
                    animationOutTiming={1000} 
                    animationIn={'slideInUp'}
                    animationOut={'slideOutDown'}
                    swipeDirection={['up', 'left', 'right', 'down']}
                    style={styles.modalView}
                    >
                    <View style={styles.containerStyle}>
                        <View style={styles.content}>
                        {/* <View style={styles.wrap}> */}
                            <Text>{latitude}</Text>
                            <Text>{longitude}</Text>
                            <Text onPress={()=>console.log('click')}>{props.route.params.item.p_category}</Text>
                            <Text>{props.route.params.item.p_subject}</Text>
                            <Text>{props.route.params.item.p_content}</Text>
                            <Text>{props.route.params.item.created_at}</Text>

                        <Button title="Hide modal" onPress={toggleModal} style={styles.hideBtn}/>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container : {
        flex:1,
    },
    wrap:{
        flex:1,
        justifyContent : 'center',
        alignItems : 'center',
    },

    cArea:{
        flex: 1,
        flexDirection: 'column'
    },

    cArea1:{
        height:50,
        justifyContent:'center',
        borderBottomWidth:0.7,
        padding:15,
    },

    cArea2:{
        height:200,
        justifyContent:'center',
        borderBottomWidth:0.7,
        padding:15,
    },

    cArea3:{
        height:200,
        justifyContent:'center',
        borderBottomWidth:0.7,
        padding:15,
    },

    modalView: {
        margin: 0,
        justifyContent: 'flex-end'
    },
    containerStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
         alignItems: 'flex-end'
    },
    content: {
        width: '100%',
        height: '25%',
        backgroundColor: 'white',
        overflow: 'hidden',
        paddingHorizontal:15,
        paddingVertical:10,
    },
    hideBtn:{
        paddingTop:20,
    }
})

export default ProductDetailScreen;