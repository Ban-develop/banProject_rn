  
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

import Icon from 'react-native-vector-icons/Ionicons';
const {width, height} = Dimensions.get('window');

const formatDate = (date) => {
  return date.getFullYear() + '년 ' + 
    ('0' + (date.getMonth() + 1)).slice(-2) + '월 ' + 
    ('0' + date.getDate()).slice(-2) + '일 ' + 
    ('0' + date.getHours()).slice(-2) + '시 ' + 
    ('0' + date.getMinutes()).slice(-2) + '분';
}

const ProductList = ({item, index,navigation,viewType}) => {

  
  let imageUri = require('../images/girl.jpg');
  if(parseInt(index) % 4 == 0){
    imageUri = require('../images/water.jpg');
  }
  else if(parseInt(index) % 4 == 1){
    imageUri = require('../images/tree.jpg');
  }
  else if(parseInt(index) % 4 == 2){
    imageUri = require('../images/nature.jpg');
  }

  
  if(viewType == 'list')
  {
    return (
    
      <TouchableOpacity
        style={styles.sView}
        onPress={() => navigation.navigate('ProductDetail', {item: item})}>
        <View style={styles.elem}>
          <View style={styles.userInfo}>
            <Image
              source={imageUri}
              style={{width:80, height:80,borderRadius: 10}}
            />
          </View>
          <View style={styles.userComment}>
            <Text style={styles.profile,{fontWeight: 'bold',}}>[{item.p_category}] {item.p_content}</Text>
            <Text style={styles.profile,{paddingTop:10}}>{item.p_subject}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.profile,{paddingTop:10}}>
                {formatDate(new Date(Date.parse(item.created_at)))}
              </Text>  
              
              <Icon name='chatbubble-ellipses-outline' size={18} style={{paddingLeft:15, paddingTop:10}}/>
              <Icon name='heart-outline' size={18} style={{paddingLeft:5, paddingTop:10}}/>
              <Icon name='eye-outline' size={18} style={{paddingLeft:5, paddingTop:10}}/>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  else{
    return(
      <TouchableOpacity
        style={styles.sView2}
        onPress={() => navigation.navigate('ProductDetail', {item: item})}>
        <View style={styles.elem2}>
          <View style={styles.userInfo2}>
            <Image
              source={imageUri}
              style={{width:160, height:160,borderRadius: 10}}
            />
          </View>
          <View>
            <Text style={{fontWeight: 'bold',fontSize:15,paddingTop:5}}>[{item.p_category}] {item.p_content}</Text>
            <Text style={{fontSize: 13,paddingTop:3}}>{item.p_subject}</Text>
            <Text style={{fontSize: 13,paddingTop:3}}>{item.created_at}</Text>
            <View style={{flexDirection: 'row',paddingTop:3}}>
              <Icon name='chatbubble-ellipses-outline' size={18}/>
              <Icon name='heart-outline' size={18} style={{paddingLeft:5}}/>
              <Icon name='eye-outline' size={18} style={{paddingLeft:5}}/>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
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
    width:'70%',
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






  sView2: {
    width:width*0.5,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    borderColor: 'gray',
    flexDirection: 'column',
  },
  elem2: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop:20,
  },
});
export default ProductList;