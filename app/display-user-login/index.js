import React, { useState, useEffect } from 'react';
import {
  Text,  
  View,
  Image,  
  StatusBar  
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {styles} from "./styles";

import {images,userLoginText} from "../configs";
import {appdata} from '../store';
import {DialogButton,TextInputField} from "../components";




const initialData={
    password:"",
    repeatedPassword:"",
    revealSecret:true,
    errorMessage:null,
};
export default ({onLoggedIn})=>{
    const [compData,setCompData] = useState(initialData);  
    const setPassword = password => setCompData({...compData,password});
    const setErrorMessage = errorMessage => setCompData({...compData,errorMessage});
    const setRepeatedPassword =(repeatedPassword) => setCompData({...compData,repeatedPassword});    
    const setRevealSecret =  revealSecret => setCompData({...compData,revealSecret});
    const setupPassword = () => {
      var password=compData.password.trim();
      var repeatedPassword=compData.repeatedPassword.trim();
      if(!password){
          setErrorMessage(userLoginText.errorMessages.settup.missingPassword);
      }
      else if(!repeatedPassword){
          setErrorMessage(userLoginText.errorMessages.settup.missingRepeatedPassword);
      }
      else if(password!==repeatedPassword){
          setErrorMessage(userLoginText.errorMessages.settup.repeatedPasswordNotMatch);
      }
      else{
        if(appdata.userAppLoginSetup(password)){
            onLoggedIn();
        }
        else{
            setErrorMessage(userLoginText.errorMessages.settup.failedToSetup);
        }
        return true;
      }

  };

  const login= () =>{
    var password=compData.password.trim();
    if(!password){
            setErrorMessage(userLoginText.errorMessages.login.missingPassword);
    }
    else if(appdata.userAppLogin(password)){
            onLoggedIn();
    }
    else{
            setErrorMessage(userLoginText.errorMessages.login.incorrectPassword);
    }
  };

  const renderErrorMessage = () => {
    if(compData.errorMessage){
      return (
        <View style={styles.formItem}>
        <Text style={styles.errorMessage}>{compData.errorMessage}</Text>
        </View>
      );
    }
    else{
      return null;
    }
  };
 const renderLoginSetUpPage = () => {
  return(
              <View style={styles.form}>
                      <View style={styles.formHeader}>
                            <Text style={styles.titleText}>{userLoginText.setup.title}</Text>
                      </View>

                      {renderErrorMessage()}
                     <View style={styles.formItem}>

                          <TextInputField
                              placeholder={userLoginText.setup.password.placeHolder}
                              value={compData.password}
                              secureTextEntry={!compData.revealSecret}
                              onChangeTextValue={password=>{
                                  setPassword(password);
                              }}
                              testID="password"
                              autoCapitalize={'none'}
                          />
                      </View>
                      <View style={styles.formItem}>
                           <TextInputField
                               placeholder={userLoginText.setup.repeatedPassword.placeHolder}
                               value={compData.repeatedPassword}
                               secureTextEntry={!compData.revealSecret}
                               onChangeTextValue={password=>{
                                   setRepeatedPassword(password);
                               }}
                               testID="repeatPassword"
                               autoCapitalize={'none'}
                           />
                       </View>
                      <View style={styles.formItem}>
                          <DialogButton position={"separate"} buttonText={userLoginText.setup.buttonText} onPress={setupPassword} testID="setupPassword"/>
                      </View>
                      <View style={styles.helpContainer}>
                          <Text style={styles.helpText}>
                                {userLoginText.setup.content}
                          </Text>
                      </View>
          </View>

  );

};

  const renderLoginForm = () => {
    return(
                <View style={styles.form}>
                       {renderErrorMessage()}
                       <View style={styles.formItem}>

                            <TextInputField
                                placeholder={userLoginText.login.password.placeHolder}
                                value={compData.password}
                                secureTextEntry={true}
                                testID="password"
                                onChangeTextValue={password=>{
                                    setPassword(password);
                                }}
                                autoCapitalize={'none'}
                            />
                        </View>
                        <View style={styles.formItem}>
                            <DialogButton position={"separate"} buttonText={userLoginText.login.buttonText} onPress={login} testID="login"/>
                        </View>
                        <View style={styles.helpContainer}>
                            <Text style={styles.helpText}>
                                  {userLoginText.login.content}
                            </Text>

                        </View>
            </View>

    );

  };

  const renderContent = () => {
        if(appdata.isFormDataPasswordProtected()){
               return renderLoginForm();
        }
        else{
               return renderLoginSetUpPage();
        }
  }

const renderHeader = ()  => {
      return (
        <View style={styles.header}>
        </View>
      );
};
const layoutChanged = event => {
  if(event && event.nativeEvent && event.nativeEvent.layout){
    setCompData({...compData});
  }
};
    return(
    <View style={styles.container} onLayout={layoutChanged}>
    <StatusBar  barStyle="light-content"/>
          {renderHeader()}
          <KeyboardAwareScrollView contentContainerStyle={styles.content}>
                    <Image style={styles.logo} source={images.logo}/>
                    <Text style={styles.logoText}>{userLoginText.app.title}</Text>
                          {renderContent()}

          </KeyboardAwareScrollView>




    </View>
  );

  };

