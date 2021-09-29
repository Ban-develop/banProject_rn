  
import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {color} from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');

const formatDate = (date) => {
  return date.getFullYear() + '년 ' + 
    ('0' + (date.getMonth() + 1)).slice(-2) + '월 ' + 
    ('0' + date.getDate()).slice(-2) + '일\n' + 
    ('0' + date.getHours()).slice(-2) + '시 ' + 
    ('0' + date.getMinutes()).slice(-2) + '분 ' + 
    ('0' + date.getSeconds()).slice(-2) + '초';
}

const ChattingList = ({item, navigation, index}) => {

  let imageUri = require('../images/girl.jpg');
  if(parseInt(index) % 2 == 1){
    imageUri = require('../images/water.jpg');
  }

  return (
    // <TouchableOpacity
    //   style={styles.sView}
    //   onPress={() => navigation.navigate('ChattingDetail', {item: item})}>
    //   <Text style={styles.sName}>
    //     {item.c_text}
    //   </Text>
    //   <Text style={styles.sAdress}>{item.created_at}</Text>
    // </TouchableOpacity>
    

    <TouchableOpacity
      style={styles.sView}
      onPress={() => navigation.navigate('ChattingDetail', {item: item})}>
      <View style={styles.elem}>
        <View style={styles.userInfo}>
          <Image
            source={imageUri}
            style={{width:50, height:50,borderRadius: 20}}
          />
        </View>
        <View style={styles.userComment}>
          <Text style={styles.profile,{fontWeight: 'bold',}}>[작성자] : {item.c_writer}</Text>
          <Text style={styles.profile,{paddingTop:3}}>[내용] : {item.c_text}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
            <Text style={styles.profile,{paddingTop:3}}>
              {formatDate(new Date(Date.parse(item.created_at)))}
            </Text>  
          </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({

  sView: {
    width:width,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    borderBottomWidth:2,
    borderColor: 'gray',
  },

  elem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth:0.5,
    padding: 15,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userComment: {
    width:'50%',
    marginLeft:20,
    justifyContent:'center',
    borderRadius:5,
  },
  profile: {
    borderRadius: 25,
  },
  name: {
    paddingLeft: 10,
  },
});
export default ChattingList;