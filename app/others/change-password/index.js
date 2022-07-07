import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import {styles} from "./styles";
import {userLoginText,menusConfig} from "../../configs";
import {EditorWithTabMenu,TextInputField,DisplayBlockText} from "../../components";
import {appdata} from "../../store";

const initialData={originalPassword:"", newPassword:"", repeatedPassword:"", errorMessage:""};
export default ({content,onBack})=>{
    const [compData,setCompData]=useState(initialData);    
    useEffect(()=>{
    },[content]);    
  const setOriginalPassword  = originalPassword => setCompData({...compData,originalPassword});  
  const setNewPassword =newPassword => setCompData({...compData,newPassword});
  const setRepeatedPassword = repeatedPassword=> setCompData({...compData,repeatedPassword})
  const onError =  errorMessage => setCompData({...compData,errorMessage});
  const onCangePassword = () => {
    var originalPassword=compData.originalPassword.trim();
    var newPassword=compData.newPassword.trim();
    var repeatedPassword=compData.repeatedPassword.trim();
    if(!originalPassword){
        onError(userLoginText.errorMessages.changePassword.missing.originalPassword);
        return;
    }
    var userInfo=appdata.getLoginUserinfo();
    if(!userInfo){
        onError(userLoginText.errorMessages.changePassword.notLoggedIn);
        return;
    }
    if(originalPassword!==userInfo.password){
       onError(userLoginText.errorMessages.changePassword.passwordNotMatch);
       return;
    }

    if(!newPassword){
       onError(userLoginText.errorMessages.changePassword.missing.newPassword);
       return;
    }
    if(!repeatedPassword){
       onError(userLoginText.errorMessages.changePassword.missing.repeatedPassword);
       return;
    }
    if(newPassword!==repeatedPassword){
      onError(userLoginText.errorMessages.changePassword.repeatedPasswordNotMatch);
      return;
    }
    if(appdata.changePassword(originalPassword,newPassword)){
        onBack();
    }
    else{
      onError(userLoginText.errorMessages.changePassword.failedToChangePassword);
    }
  };

  const onCancel = () => onBack();
   
  const buildMenuItems = () => {
       var menuItems=[{
            menu:menusConfig.cancel.menu,
            onPress:onCancel
        },{
             menu:menusConfig.confirm.menu,
             onPress:onCangePassword
         }];
      return menuItems;
}
const renderErrorMessage = () => {
  if(compData.errorMessage){
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.errorMessage}>{compData.errorMessage}</Text>
      </View>
    );
  }
  else{
    return null;
  }
};

  return(
    <EditorWithTabMenu title={userLoginText.changePassword.title}
    menuItems={buildMenuItems()} selected={menusConfig.others.menu}>
                            <View style={styles.inputContainer}>
                              <TextInputField
                                  placeholder={userLoginText.changePassword.labels.originalPassword}
                                  value={compData.originalPassword}
                                  secureTextEntry={false}
                                  onChangeTextValue={setOriginalPassword}
                                  dark={true}
                                  autoCapitalize={'none'}
                              />
                            </View>
                            <View style={styles.inputContainer}>
                              <TextInputField
                                  placeholder={userLoginText.changePassword.labels.newPassword}
                                  value={compData.newPassword}
                                  secureTextEntry={false}
                                  onChangeTextValue={setNewPassword}
                                  dark={true}
                                  autoCapitalize={'none'}
                              />
                            </View>
                            <View style={styles.inputContainer}>
                              <TextInputField
                                  placeholder={userLoginText.changePassword.labels.repeatedPassword}
                                  value={compData.repeatedPassword}
                                  secureTextEntry={false}
                                  onChangeTextValue={setRepeatedPassword}
                                  dark={true}
                                  autoCapitalize={'none'}
                              />
                            </View>
                            {renderErrorMessage()}

                                  <DisplayBlockText content={userLoginText.changePassword.content}/>
                            

          </EditorWithTabMenu>
  );
}
