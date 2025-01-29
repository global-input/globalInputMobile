import React, {useState, useRef} from 'react';
import useMockQRScanner from '../global-input-test';
import {
  Text,
  View,
  Switch,
  Clipboard,
  Linking,
  Vibration,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import styled from 'styled-components/native';
import {createMessageConnector} from '../global-input-message';

////globa_input_eye////
import {styles, deviceDector} from './styles';

import {appdata} from '../store';
import {IconButton, TabMenu} from '../components';

import {eyeTextConfig, menusConfig} from '../configs';

import DisplayMarker from './DisplayMarker';
import {
  PendingAuthorizartionView,
  NotAuthorizedView,
} from '../camera-not-authorized';

// SafeAreaView wrapper styled component
const SafeContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: ${props => props.theme.backgroundColor || '#000'};
`;
// Updated TabMenu container with safe area padding
const TabMenuContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${Platform.OS === 'ios' ? '16px' : '0px'};
  padding-bottom: ${Platform.OS === 'ios' ? '8px' : '0px'};
  background-color: rgba(0, 0, 0, 0.7);
`;

// Menu button with proper spacing
const MenuButton = styled.TouchableOpacity`
  padding: 12px;
  min-width: 60px;
  align-items: center;
  justify-content: center;
`;

// Main component wrapper
const MainContainer = styled(View)`
  flex: 1;
`;

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
const parseAppLaunchURL = urlString => {
  // Basic validation on the URL
  if (
    !urlString ||
    !(urlString.startsWith('http://') || urlString.startsWith('https://')) ||
    !urlString.includes('global-input-app/mobile-app')
  ) {
    return {code: null, session: null, url: null};
  }

  // Locate any query parameters (after '?')
  const questionMarkIndex = urlString.indexOf('?');
  if (questionMarkIndex === -1) {
    // No query params at all
    return {code: null, session: null, url: null};
  }

  // Extract the query string (everything after '?')
  const queryString = urlString.substring(questionMarkIndex + 1);

  // Split key-value pairs: "key=value"
  const queryParts = queryString.split('&');

  // Parse into an object
  const params = {};
  queryParts.forEach(part => {
    const [key, value] = part.split('=');
    // Use decodeURIComponent in case of encoded characters
    params[decodeURIComponent(key)] = decodeURIComponent(value || '');
  });

  return {
    code: params.code || null,
    session: params.session || null,
    url: params.url || null,
  };
};
const sendAppLaunchedEvent = (url, session, code) => {
  // Build the base path for the launched endpoint
  const baseUrl = url.endsWith('/')
    ? url + 'global-input/app/launched'
    : `${url}/global-input/app/launched`;

  // Collect optional query parameters
  const query = [];
  if (session) {
    query.push(`session=${encodeURIComponent(session)}`);
  }
  if (code) {
    query.push(`code=${encodeURIComponent(code)}`);
  }

  // Only add '?' if we have any query params
  let finalUrl = baseUrl;
  if (query.length > 0) {
    finalUrl += `?${query.join('&')}`;
  }
  // Send the request
  fetch(finalUrl)
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
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
    const launchData = parseAppLaunchURL(codedata);
    if (launchData.url && launchData.session && launchData.code) {
      setContentAndMessage(
        'Please scan the QR Code displayed',
        'Global Input App Launched',
      );
      console.log(
        '**********',
        launchData.url,
        launchData.session,
        launchData.code,
      );
      sendAppLaunchedEvent(launchData.url, launchData.session, launchData.code);
      return;
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
  useMockQRScanner(onCodeDataReceived);

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
      <SafeContainer>
        <MainContainer>
          <RNCamera
            ref={camera}
            captureAudio={false}
            style={{flex: 1}}
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
        </MainContainer>
      </SafeContainer>
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
