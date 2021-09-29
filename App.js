/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Provider } from 'react-redux';
import initStore from './src/redux/_store';
import Icon from 'react-native-vector-icons/Ionicons';

const store = initStore();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

/***************************페이지********************************/

//공통
import SearchScreen from './src/Screens/Common/SearchScreen';
import HeartScreen from './src/Screens/Common/HeartScreen';
import NoticeScreen from './src/Screens/Common/NoticeScreen';

//멤버
import AuthScreen from './src/Screens/Login/AuthScreen';
import LoginScreen from './src/Screens/Login/LoginScreen';
import RegistScreen from './src/Screens/Login/RegistScreen';

//메인
import HomeScreen from './src/Screens/Home/HomeScreen';

//상품
import ProductScreen from './src/Screens/Product/ProductScreen';
import ProductDetailScreen from './src/Screens/Product/ProductDetailScreen';
import ProductRegistScreen from './src/Screens/Product/ProductRegistScreen';

//채팅
import ChattingScreen from './src/Screens/Chatting/ChattingScreen';
import ChattingDetailScreen from './src/Screens/Chatting/ChattingDetailScreen';

//세팅
import SettingScreen from './src/Screens/Setting/SettingScreen';

//스플래시
import SplashScreen from 'react-native-splash-screen';

/***********************************************************/

//하단 네비게이션
const BottomNavigation = (props) => {
  return (
    
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: '#e91e63',
          headerShown:false,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Icon name="home-outline" color={color} size={30} />
            ),
          }}
        />
        <Tab.Screen
          name="Product"
          component={ProductScreen}
          options={{
            tabBarLabel: 'Product',
            tabBarIcon: ({ color, size }) => (
              <Icon name="people-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Chatting"
          component={ChattingScreen}
          options={{
            tabBarLabel: 'Chatting',
            tabBarIcon: ({ color, size }) => (
              <Icon name="chatbubbles-outline" color={color} size={size} />
            ),
            tabBarBadge: 3,
          }}
        />
        <Tab.Screen
          name="Setting"
          component={SettingScreen}
          options={{
            tabBarLabel: 'Setting',
            tabBarIcon: ({ color, size }) => (
              <Icon name="settings-outline" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
  );
}

//스택 네비게이션
const StackNavigation = (props) => {
  return(
    <Stack.Navigator
        screenOptions={{
          headerShown: false,
      }}
      initialRouteName="Auth"
      >
      <Stack.Screen name="AuthScreen" component={AuthScreen}  options={{ title: '', headerTransparent: true, headerShown: false }}/>
      <Stack.Screen name="LoginScreen" component={LoginScreen}  options={{ title: '', headerTransparent: true, headerShown: false }}/>
      <Stack.Screen name="RegistScreen" component={RegistScreen}  options={{ title: '', headerTransparent: true, headerShown: false }}/>
      <Stack.Screen name="BottomNavigation" component={BottomNavigation}  options={{ title: '', headerTransparent: true, headerShown: false }}/>
      <Stack.Screen name="ProductRegist" component={ProductRegistScreen} options={{ title: '', headerTransparent: true, headerShown: false }}/>
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: '', headerTransparent: true, headerShown: false }}/>
      <Stack.Screen name="ChattingDetail" component={ChattingDetailScreen} options={{ title: '', headerTransparent: true, headerShown: false }}/>
      <Stack.Screen name="SearchScreen" component={SearchScreen}  options={{ title: '', headerTransparent: true, headerShown: false }}/>
      <Stack.Screen name="HeartScreen" component={HeartScreen} options={{ title: '', headerTransparent: true, headerShown: false }} />
      <Stack.Screen name="NoticeScreen" component={NoticeScreen}  options={{ title: '', headerTransparent: true, headerShown: false }}/>
    </Stack.Navigator>
  )
}

export default function App() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    },1000)
  },[]);
  return(
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator  screenOptions={{headerShown:false}}>
          <Drawer.Screen name="StackNavigation" component={StackNavigation} options={{ swipeEnabled: false, }} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  )
}