/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Vibration,
  Image,
  Switch
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  RNCamera,
  BarCodeReadEvent,
  GoogleVisionBarcodesDetectedEvent,
} from 'react-native-camera';
import styled from 'styled-components/native';
import {generateRandomString} from '../global-input-message'
import * as scanUtil from './scanUtil';
import {DisplayMarker} from './display-marker';
import {Footer,Tabs,TabItem} from './footer';
import {DisplayContent} from './display-content';
import {systemIcons} from '../icons';

const CameraComponent = styled(RNCamera)`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;
const CameraContainer = styled.View`
  flex: 1;
  flex-direction: column;
`;
const ContentContainer=styled.View`
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color: transparent;
`;
const Title = styled.Text`
font-size: 14px;
font-weight: bold;
font-family: Futura-Medium;
color:rgba(72,128,237,1);
margin-right:10px;
`;

const TopBar=styled.View`
  display:flex;
  flex-direction:row;
  justify-content:center;
  width:100%;
  height:100%;
  background-color: transparent;
`;
const androidPermission = {
  title: 'Permission to use camera',
  message: 'We need your permission to use your camera for scanning QR Codes',
  buttonPositive: 'Ok',
  buttonNegative: 'Cancel',
};

export const ScanQRCode = () => {
  const camera = useRef<any>(null);
  const [inputActive, setInputActive]=useState(true);
  const [codedata, setCodedata]=useState('');



  const processCode = (codedata: string) => {
    console.log(codedata);
    setCodedata(codedata);
    const r=generateRandomString(11);
    console.log(r);
  };

  return (
    <>
    <StatusBar barStyle="light-content" />
    <CameraContainer>
      <CameraComponent
        captureAudio={false}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
        androidCameraPermissionOptions={androidPermission}
        onBarCodeRead={(event: BarCodeReadEvent) => {
          if (scanUtil.isWithInterval(2000)) {
            Vibration.vibrate();
            processCode(event.data);
          }
        }}
        onGoogleVisionBarcodesDetected={(
          event: GoogleVisionBarcodesDetectedEvent,
        ) => {
          if (
            event &&
            event.barcodes &&
            event.barcodes.length &&
            event.barcodes[0].data &&
            scanUtil.isWithInterval(2000)
          ) {
            if (scanUtil.isWithInterval(2000)) {
              Vibration.vibrate();
              processCode(event.barcodes[0].data);
            }
          }
        }}>

        <DisplayMarker />

      </CameraComponent>
    </CameraContainer>
    <ContentContainer>
    <SafeAreaView>
      <TopBar>
        <Title>Global Input App</Title>
          <Switch
                  value={inputActive}
                  onValueChange={(value)=>{
                    setInputActive(value);
                  }}
         />

      </TopBar>
      <Footer>
        <DisplayContent title="Code Data" content={codedata}/>
        <Tabs>
                    <systemIcons.Cancel label="Dismiss"/>
                    <systemIcons.Browser label="Open Link" />
                    <systemIcons.clipboard.copy label="Copy" />

        </Tabs>

      </Footer>



    </SafeAreaView>
    </ContentContainer>
    </>
  );
};
