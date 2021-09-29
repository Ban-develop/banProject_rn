import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions ,
  Box,
} from 'react-native';
import { Stack, Center, Heading, Button, NativeBaseProvider } from "native-base"

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SettingsScreen = (props) => {
    return(
        <NativeBaseProvider>
            <SafeAreaView>
                <Stack space={3} alignItems="center">
                    <Stack direction="column" space={5} mb={5} alignItems="center">
                        <Stack direction="row" space={5} mb={1} alignItems="center">
                            <Center size={16}bg="primary.400"rounded="md"_text={{color: "white",}} shadow={3} width={165} height={200}>Box 1</Center>
                            <Center bg="secondary.400"size={16}rounded="md"_text={{color: "white",}}shadow={3} width={165} height={200}>Box 2</Center>
                        </Stack>
                        
                        <Stack direction="row" space={5} mb={1} alignItems="center">
                            <Center bg="secondary.400"size={16}rounded="md"_text={{color: "white",}}shadow={3} width={105} height={200}>Box 3</Center>
                            <Center size={16}bg="primary.400"rounded="md"_text={{color: "white",}} shadow={3} width={105} height={200}>Box 4</Center>
                            <Center bg="secondary.400"size={16}rounded="md"_text={{color: "white",}}shadow={3} width={105} height={200}>Box 5</Center>
                        </Stack>
                    </Stack>
                </Stack>
            </SafeAreaView>
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center'
    },
    row1 : {
        flex : 1,
        width:windowWidth,
        height : 300,
        backgroundColor : "#0100FF"
    },
    row2 : {
        flex : 1,
        width:windowWidth,
        height : 300,
        backgroundColor : "#FF0000"
    },

})

export default SettingsScreen;