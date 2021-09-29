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
  Image,
} from 'react-native';

import Axios from 'axios';
import uri from '../../include/define';

import { launchImageLibrary } from 'react-native-image-picker';

import HeaderComponent from '../../Component/Header';

const createFormData = (photo, body={}) => {
    const data = new FormData();
    data.append('photo', {
      name: photo.fileName,
      type: photo.type,
      uri:
        Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
    });
  
    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });

    console.log("==================================");
    console.log(JSON.stringify(data));
    console.log("==================================");

    return data;
  };
const HeartScreen = (props) => {

    const [photo, setPhoto] = useState(null);

    const handleChoosePhoto = () => {
        launchImageLibrary({ noData: true }, (response) => {
            // console.log(response);
            if (response) {
                if(response.didCancel){
                    setPhoto(null);
                }
                else{
                    setPhoto(response);
                }
            }
        });
    };

    const handleUploadPhoto = () => {

        console.log(photo);

        fetch('http://10.0.2.2:3000/api/uploads', {
            method: 'POST',
            body: createFormData(photo.assets[0], { userId: '123' }),
            headers:{
                'Content-Type': 'multipart/form-data',
            }
        })
        .then((response) => response.json())
        .then((response) => {
            console.log('response', response);
        })
        .catch((error) => {
            console.log('error', error);
        });
    };
    
    return (
        <SafeAreaView style={styles.container}>
            <HeaderComponent navigation={props.navigation} text={'heart'} type={'sub'}/>
            <View style={styles.wrap}>
                {
                    photo && (
                        <>
                        <Image
                            source={{ uri: photo.assets[0].uri }}
                            style={{ width: 300, height: 300 }}
                        />
                        <Button title="Upload Photo" onPress={handleUploadPhoto} />
                        </>
                    )
                }
                <Button title="Choose Photo" onPress={handleChoosePhoto} />
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
})

export default HeartScreen;