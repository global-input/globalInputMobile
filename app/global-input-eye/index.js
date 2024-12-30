import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  Switch,
  Clipboard,
  Linking,
  Vibration,
  ScrollView,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {createMessageConnector} from '../global-input-message';

////globa_input_eye////
import {styles, deviceDector} from './styles';

import {appdata} from '../store';
import {TabMenu, IconButton} from '../components';

import {eyeTextConfig, menusConfig, appTextConfig} from '../configs';

import DisplayMarker from './DisplayMarker';
import {
  PendingAuthorizartionView,
  NotAuthorizedView,
} from '../camera-not-authorized';

const initialState = {
  message: '',
  content: '',
  inputActive: true,
  modal: '',
  modaldata: {},
};

const openBrowser = data => {
  if (
    data.content &&
    data.content.startsWith &&
    (data.content.startsWith('http://') || data.content.startsWith('https://'))
  ) {
    Linking.openURL(data.content);
  }
};

export default ({
  toHelpScreen,
  isAuthorized,
  isAuthorizationChecked,
  menuItems,
  toImportProtectedEncryptionKey,
  toImportNotProtectedEncryptionKey,
  toGlobalInput,
  toImportSettingsData,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const testContent = {
        data: 'AU2FsdGVkX1/P+efNXCNIO9r5h/e4ie3MhmRRFfONlXf9tyw4EGFPJFsc1MIWyGYYqOVp6xQhNBQitTDFKkqd6VZExM4BlZqjgiRXzsM7kbeV8j08sSb1E74kDRcaIqJMP02Y17IlTd9EF3abfEn4GReq7dFp5a1NaHhH0NBAnk7kk3FGE9yKruxV1wpKG5dzxmkWseq/+hds7lqzsTdIJqaI7AEL947/sASqYSNmTuk%3D',
        type: 'QR_CODE',
      };
      onCodeDataReceived(testContent);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const camera = useRef(null);
  const lastCodeDataProcessed = useRef(null);
  const [data, setData] = useState(initialState);

  const setContentAndMessage = (content, message) =>
    setData({...data, content, message});

  const setInputActive = inputActive => setData({...data, inputActive});

  const copyContentToClibboard = () => {
    Clipboard.setString(data.content);
    setContentAndMessage('', '');
  };

  const layoutChanged = event => {
    if (event && event.nativeEvent && event.nativeEvent.layout) {
      setData({...data});
    }
  };
  const renderPendingAuthorizartionView = () => {
    return <PendingAuthorizartionView menuItems={menuItems} />;
  };
  const renderNotAuthorizedView = () => {
    return <NotAuthorizedView menuItems={menuItems} />;
  };
  const isDisplayMessage = () => {
    return data.message || data.content;
  };
  const clearContentAndMessage = () => {
    setContentAndMessage(null, null);
  };

  const onCodeDataReceived = barcodedata => {
    var codedata = barcodedata.data;
    if (!codedata) {
      console.log('no data in the qr code');
      return;
    }
    var currentTime = new Date().getTime();
    if (lastCodeDataProcessed.current) {
      if (currentTime - lastCodeDataProcessed.current.lastTime < 2000) {
        return;
      }
    }
    lastCodeDataProcessed.current = {
      lastTime: currentTime,
      codedata,
    };
    Vibration.vibrate();

    if (!data.inputActive) {
      setContentAndMessage(codedata, eyeTextConfig.inputDisabled.display);
      return;
    }
    if (appdata.isActiveEncryptionKeyEncryptedMessage(codedata)) {
      var decryptedContent =
        appdata.decryptCodeDataWithAnyEncryptionKey(codedata);
      if (decryptedContent) {
        setContentAndMessage(decryptedContent, eyeTextConfig.password.success);
      } else {
        setContentAndMessage(codedata, eyeTextConfig.password.failed);
      }
      return;
    } else if (appdata.isProtectedMasterEncryptionKey(codedata)) {
      toImportProtectedEncryptionKey(codedata);
      return;
    } else if (appdata.isMasterEncryptionKeyCodedata(codedata)) {
      var encryptionKeyToBeImported =
        appdata.decryptExportedEncryptionKey(codedata);
      if (encryptionKeyToBeImported) {
        toImportNotProtectedEncryptionKey(encryptionKeyToBeImported);
        return;
      }
    }
    var connector = createMessageConnector();
    var codeAES = appdata.getCodeAES();
    var options = {
      onInputCodeData: toGlobalInput,
      onPairing: toImportSettingsData,
      onError: message => {
        setContentAndMessage(codedata, eyeTextConfig.inputDisabled.display);
      },
    };
    if (codeAES) {
      options.codeAES = codeAES;
    }

    connector.processCodeData(codedata, options);
  };

  const renderHeader = () => {
    if (isDisplayMessage()) {
      return null;
    }
    var title = eyeTextConfig.title.enabled;
    if (!data.inputActive) {
      title = eyeTextConfig.title.disabled;
    }
    var textToDisplay = eyeTextConfig.looking.disabled;
    if (data.inputActive) {
      textToDisplay = eyeTextConfig.looking.enabled;
    }
    var headerStyle = styles.header;
    var titleContainer = styles.titleContainer;
    var helpContainer = styles.helpContainer;
    var titleText = styles.titleText;

    if (deviceDector.isLandscapeMode()) {
      headerStyle = styles.headerLandscape;
      titleContainer = styles.titleContainerLandscape;
      helpContainer = styles.helpContainerLandscape;
      if (deviceDector.isLandScapeScreenWidthSmall()) {
        titleText = styles.titleTextSmall;
      }
    }
    return (
      <View style={headerStyle}>
        <View style={titleContainer}>
          <Text style={titleText} allowFontScaling={false}>
            {title}
          </Text>
          <View style={styles.buttonContainer}>
            <Switch value={data.inputActive} onValueChange={setInputActive} />
          </View>
        </View>
        <View style={styles.lookingContainer}>
          <Text style={styles.lookingText} allowFontScaling={false}>
            {textToDisplay}
          </Text>
        </View>
        <View style={helpContainer}>
          <IconButton
            label={menusConfig.help.menu.label}
            image={menusConfig.help.menu.image}
            onPress={toHelpScreen}
          />
        </View>
      </View>
    );
  };

  const renderDisplayCodeDataContent = () => {
    if (isDisplayMessage()) {
      var title = data.message;
      var content = data.content;
      if (!title) {
        title = 'Code Data';
      } else if (!content) {
        content = data.content;
        title = 'Eror Message';
      }
      var codeDisplayContent = styles.codeDisplayContent;
      if (deviceDector.isLandscapeMode()) {
        codeDisplayContent = styles.codeDisplayContentLandscape;
      }

      return (
        <View style={styles.codeDisplayContainer}>
          <View style={codeDisplayContent}>
            <View style={styles.codeDisplayHeader}>
              <Text style={styles.codeDisplayTitle}>{title}</Text>
            </View>
            <View style={styles.condeDisplayCodeContent}>
              <ScrollView>
                <Text style={styles.codeDisplayText}>{content}</Text>
              </ScrollView>
            </View>
          </View>
        </View>
      );
    } else {
      return null;
    }
  };

  const renderCameraView = () => {
    var markerContainer = styles.markerContainer;
    if (deviceDector.isLandscapeMode()) {
      markerContainer = styles.markerContainerLandscape;
    }

    if (isDisplayMessage()) {
      markerContainer = styles.markerContainerOnMessage;
      if (deviceDector.isLandscapeMode()) {
        markerContainer = styles.markerContainerOnMessageLandscape;
      }
      menuItems = [
        {
          menu: menusConfig.dismiss.menu,
          onPress: clearContentAndMessage,
        },
        {
          menu: menusConfig.clipboardCopy.menu,
          onPress: copyContentToClibboard,
        },
      ];
      if (
        data.content &&
        data.content.startsWith &&
        (data.content.startsWith('http://') ||
          data.content.startsWith('https://'))
      ) {
        menuItems.splice(1, 0, {
          menu: menusConfig.visiturl.menu,
          onPress: () => openBrowser(data),
        });
      }
    }

    ////processCodeData////
    return (
      <View style={styles.container} onLayout={layoutChanged}>
        <RNCamera
          ref={cam => {
            camera.current = cam;
          }}
          captureAudio={false}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'Permission to use camera for scanning QR Codes',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          style={styles.preview}
          // onGoogleVisionBarcodesDetected={onCodeDataReceived}
          onBarCodeRead={onCodeDataReceived}>
          <DisplayMarker markerContainer={markerContainer} />
        </RNCamera>
        {renderHeader()}

        {renderDisplayCodeDataContent()}

        <TabMenu
          menuItems={menuItems}
          selected={menusConfig.eye.menu}
          transparent={true}
        />
      </View>
    );
  };
  if (isAuthorized) {
    return renderCameraView();
  } else if (!isAuthorizationChecked) {
    return renderPendingAuthorizartionView();
  } else {
    return renderNotAuthorizedView();
  }
};
