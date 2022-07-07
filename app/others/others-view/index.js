import React, {useState} from 'react';
import {View} from 'react-native';
import  Clipboard from '@react-native-clipboard/clipboard';

import {styles} from "../styles";

import {images,menusConfig} from "../../configs";

import {ViewWithTabMenu,IconButton} from "../../components";
import ChangePasswordView from "../change-password";
import AppSettingsView from "../app-settings";
import {ManageKeysView} from "../manage-keys";
import {DecryptImportView} from "../restore-data/decrypt-import-view";
import BackupFormData from "../backup-data";
import {HelpScreen} from "../../help-screen";
import DeleteAllDataView from "../delete-all-data";

const ACT_TYPE={
  MAIN:1,
  CHANGEPASSOWRD:2,
  APP_SETTINGS:3,
  MANAGEKEYS:4,
  DECRYPT_IMPORT:5,
  BACKUPDATA:6,
  HELP:7,
  DELETE_ALL_DATA:8
};
export default ({menuItems,logout}) => {
    const [actionType,setActionType] = useState(ACT_TYPE.MAIN);
    const [content,setContent]=useState('');
    
    const toMain = () => setActionType(ACT_TYPE.MAIN);
    const changePasswordSelected = () => setActionType(ACT_TYPE.CHANGEPASSOWRD);    
    const changeSettingsSelected = () => setActionType(ACT_TYPE.APP_SETTINGS);            
    const manageKeysSelected = () => setActionType(ACT_TYPE.MANAGEKEYS);                  
    const restoreDataSelected = () => {
      Clipboard.getString().then(clipboardContent=>{ 
           // Clipboard.setString("");            
            setContent(clipboardContent?clipboardContent:'');
            setActionType(ACT_TYPE.DECRYPT_IMPORT);        
      });

                              
    }
    const deleteAllDataSelected = () => setActionType(ACT_TYPE.DELETE_ALL_DATA);                        
    const backupDataSelected = () => setActionType(ACT_TYPE.BACKUPDATA);                              
    const helpSelected = () => setActionType(ACT_TYPE.HELP);                                    
   
   
   switch (actionType) {
      case ACT_TYPE.CHANGEPASSOWRD: 
              return (<ChangePasswordView onBack={toMain}/>);
      case ACT_TYPE.APP_SETTINGS: 
              return (<AppSettingsView onBack={toMain}/>);
      case ACT_TYPE.MANAGEKEYS: 
              return (<ManageKeysView onBack={toMain}/>);
      case ACT_TYPE.DECRYPT_IMPORT:       
              return (<DecryptImportView onBack={toMain} content={content}/>);
      case ACT_TYPE.DELETE_ALL_DATA: 
              return (<DeleteAllDataView onBack={toMain}/>)
      case ACT_TYPE.BACKUPDATA:  {
             var menuItems=[{
                 menu:menusConfig.back.menu,
                onPress:toMain
              }];
              return(<BackupFormData menuItems={menuItems} onBack={toMain}/>);
          }
      case ACT_TYPE.HELP: {
        const  menuItems=[{
             menu:menusConfig.back.menu,
             onPress:toMain
         }];
         return(<HelpScreen menuItems={menuItems}/>);
      }
      default: return (
        <ViewWithTabMenu title={menusConfig.others.menu.label}
        menuItems={menuItems} selected={menusConfig.others.menu}>

                       <View style={styles.iconContainer}>
                         <View style={styles.icon}>
                            <IconButton label={menusConfig.exportButton.menu.label}
                                     image={menusConfig.exportButton.menu.image}
                                     onPress={backupDataSelected}/>
                         </View>
                         <View style={styles.icon}>
                            <IconButton label={"Import"}
                                     image={images.importIcon}
                                     onPress={restoreDataSelected}/>
                         </View>

                             <View style={styles.icon}>
                                <IconButton label={menusConfig.settings.menu.label}
                                         image={menusConfig.settings.menu.image}
                                         onPress={changeSettingsSelected}/>
                             </View>



                             <View style={styles.icon}>
                                <IconButton label={menusConfig.deleteAll.menu.label}
                                         image={menusConfig.deleteAll.menu.image}
                                         onPress={deleteAllDataSelected}/>
                             </View>





                               <View style={styles.icon}>
                                 <IconButton label={menusConfig.changePassword.menu.label}
                                      image={menusConfig.changePassword.menu.image}
                                      onPress={changePasswordSelected}/>
                               </View>

                               <View style={styles.icon}>
                                         <IconButton label={menusConfig.logout.menu.label}
                                                     image={menusConfig.logout.menu.image}
                                                       onPress={logout}/>
                               </View>
                               <View style={styles.icon}>
                                         <IconButton label={menusConfig.help.menu.label}
                                                     image={menusConfig.help.menu.image}
                                                     onPress={helpSelected}/>
                               </View>
                   </View>
       </ViewWithTabMenu>
      );
   }
  };
