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
} from 'react-native';


import { Provider } from 'react-redux';
import Axios from 'axios';
import uri from '../../include/define';
import initStore from '../../redux/_store';

import { connect, useDispatch } from 'react-redux';
import ActionCreator from '../../redux/_actions';
import * as testAction from '../../redux/_actions/testAction';


const store = initStore();

const HomeScreen = (props) => {
    const dispatch = useDispatch();

    let [ctxt, setCtxt] = useState('default');

    useEffect(() => {
        //console.log(props.state.test);
    },[props.state.test]);
    
    let ApiSendHandler = () =>{
        Axios.get(`${uri.dev}/api/test`)
        .then((res) => {
            props.set_txt(res.data[0].a);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    let reDuxHandler = () => {
      props.set_txt2(ctxt);
    }

    return(
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>CURRENT TEXT : {props.state.test.txt}</Text>
            <Button
            title="Go to Profile"
            onPress={() => props.navigation.navigate('Profile')}
            />
            <Button
            title="Axios"
            onPress={() => ApiSendHandler()}
            />
            <TextInput
              value={ctxt}
              onChangeText={text => setCtxt(text)}
            />
            <Button
            title="Redux"
            onPress={() => reDuxHandler()}
            />
        </SafeAreaView>
    )
}

//export default HomeScreen;


function mapStateToProps(state) {
  return {
    state
  };
}

function mapDispatchToProps(dispatch) {
  return {
      set_txt:(txt) => {
        dispatch(ActionCreator.test(txt));
      },
      set_txt2:(txt) => {
        dispatch(ActionCreator.test2(txt));
      },
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
  