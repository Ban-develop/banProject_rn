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
  Share,
} from 'react-native';

import HeaderComponent from '../../Component/Header';

// import ModelView from 'react-native-gl-model-view';
const NoticeScreen = (props) => {

    const onShare = async () => {
        const link = Platform.OS === 'ios' ? 'https://apps.apple.com/us/app/%EB%B3%B4%EB%8B%A5-%EB%82%B4-%EB%B3%B4%ED%97%98%EC%A0%90%EC%88%98-%EC%A7%84%EB%8B%A8-%EC%83%88%EB%8A%94-%EB%B3%B4%ED%97%98%EB%A3%8C-%ED%99%95%EC%9D%B8/id1447862053' : 'https://play.google.com/store/apps/details?id=com.mrp.doctor&hl=ko';
        try {
          const result = await Share.share({
            message:
              '공유에 보이는 메세지',
            
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
      };

    return (
        <SafeAreaView style={styles.container}>
            <HeaderComponent navigation={props.navigation} text={'notice'} type={'sub'}/>
            <View style={styles.wrap}>
                <Text>Notice</Text>
                <Text>NoticeScreen</Text>
                <Button onPress={onShare} title="Share" />
                <Button onPress={()=>props.navigation.navigate('TestScreen')} title="3D" />
            </View>
            {/* <ModelView
                model={{
                  uri: require('../../images/Hamburger.png'),
                }}
                texture={{
                  uri: require('../../images/Hamburger.png'),
                }}

                scale={0.01}

                translateZ={-2}
                rotateZ={270}

                style={{flex: 1}}
            /> */}
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

export default NoticeScreen;