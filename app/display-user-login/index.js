import React, {useState, useEffect} from 'react';
import {Text, View, Image, StatusBar} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Switch} from 'react-native'; // Make sure to install this package
import {styles} from './styles';
import {images, userLoginText} from '../configs';
import {appdata} from '../store';
import {DialogButton} from '../components';
import PasswordInputField from './PasswordInputField';

const initialData = {
  password: '',
  repeatedPassword: '',
  visibilityState: {
    password: false,
    repeatedPassword: false,
    loginPassword: false,
  },
  errorMessage: null,
  resettingApp: false,
};

const RememberPassword = ({rememberPassword, setRememberPassword}) => {
  return (
    <View style={styles.formItem}>
      <View style={styles.switchContainer}>
        <Switch
          value={rememberPassword}
          onValueChange={setRememberPassword}
          trackColor={{true: '#FFFFFF', false: '#333333'}}
          thumbColor={rememberPassword ? '#4880ED' : '#F4F3F4'}
          ios_backgroundColor="#333333"
          style={styles.switch}
        />
        <Text style={styles.switchLabel}>
          Remember Password (this will store your password on your device)
        </Text>
      </View>
    </View>
  );
};

export default ({onLoggedIn}) => {
  const [compData, setCompData] = useState(initialData);
  const [rememberPassword, setRememberPassword] = useState(false);

  useEffect(() => {
    const loadRememberPassword = () => {
      try {
        const savedPassword = appdata.getRememberedPassword();
        if (savedPassword) {
          setCompData(prev => ({...prev, password: savedPassword}));
          setRememberPassword(true);
        }
      } catch (e) {
        console.log('****error loading remember password', e);
      }
    };
    loadRememberPassword();
  }, []);

  const setPassword = password => setCompData({...compData, password});
  const setErrorMessage = errorMessage =>
    setCompData({...compData, errorMessage});
  const setRepeatedPassword = repeatedPassword =>
    setCompData({...compData, repeatedPassword});

  const toggleFieldVisibility = field => {
    setCompData({
      ...compData,
      visibilityState: {
        ...compData.visibilityState,
        [field]: !compData.visibilityState[field],
      },
    });
  };

  const setupPassword = () => {
    var password = compData.password.trim();
    var repeatedPassword = compData.repeatedPassword.trim();
    if (!password) {
      setErrorMessage(userLoginText.errorMessages.settup.missingPassword);
    } else if (!repeatedPassword) {
      setErrorMessage(
        userLoginText.errorMessages.settup.missingRepeatedPassword,
      );
    } else if (password !== repeatedPassword) {
      setErrorMessage(
        userLoginText.errorMessages.settup.repeatedPasswordNotMatch,
      );
    } else {
      if (appdata.userAppLoginSetup(password, rememberPassword)) {
        onLoggedIn();
      } else {
        setErrorMessage(userLoginText.errorMessages.settup.failedToSetup);
      }
    }
  };

  const login = () => {
    var password = compData.password.trim();
    if (!password) {
      setErrorMessage(userLoginText.errorMessages.login.missingPassword);
    } else if (appdata.userAppLogin(password, rememberPassword)) {
      onLoggedIn();
    } else {
      setErrorMessage(userLoginText.errorMessages.login.incorrectPassword);
    }
  };
  const resetApp = () => {
    setCompData({...compData, resettingApp: true});
  };
  const cancelResetApp = () => {
    setCompData({...compData, resettingApp: false});
  };
  const confirmResetApp = () => {
    appdata.resetApp();
    setCompData({...compData, resettingApp: false});
  };

  const renderErrorMessage = () => {
    if (compData.errorMessage) {
      return (
        <View style={styles.formItem}>
          <Text style={styles.errorMessage}>{compData.errorMessage}</Text>
        </View>
      );
    } else {
      return null;
    }
  };
  const renderLoginSetUpPage = () => {
    return (
      <View style={styles.form}>
        <View style={styles.formHeader}>
          <Text style={styles.titleText}>{userLoginText.setup.title}</Text>
        </View>

        {renderErrorMessage()}
        <View style={styles.formItem}>
          <PasswordInputField
            placeholder={userLoginText.setup.password.placeHolder}
            value={compData.password}
            isVisible={compData.visibilityState.password}
            onToggleVisibility={() => toggleFieldVisibility('password')}
            onChangeTextValue={setPassword}
            testID="password"
          />
        </View>
        <View style={styles.formItem}>
          <PasswordInputField
            placeholder={userLoginText.setup.repeatedPassword.placeHolder}
            value={compData.repeatedPassword}
            isVisible={compData.visibilityState.repeatedPassword}
            onToggleVisibility={() => toggleFieldVisibility('repeatedPassword')}
            onChangeTextValue={setRepeatedPassword}
            testID="repeatPassword"
          />
        </View>
        <View style={styles.formItem}>
          <DialogButton
            position={'separate'}
            buttonText={userLoginText.setup.buttonText}
            onPress={setupPassword}
            testID="setupPassword"
          />
        </View>
        <View style={styles.helpContainer}>
          <Text style={styles.helpText}>{userLoginText.login.content}</Text>
        </View>
        <RememberPassword
          rememberPassword={rememberPassword}
          setRememberPassword={setRememberPassword}
        />
      </View>
    );
  };

  const renderLoginForm = () => {
    return (
      <View style={styles.form}>
        {renderErrorMessage()}
        <View style={styles.formItem}>
          <PasswordInputField
            placeholder={userLoginText.login.password.placeHolder}
            value={compData.password}
            isVisible={compData.visibilityState.loginPassword}
            onToggleVisibility={() => toggleFieldVisibility('loginPassword')}
            onChangeTextValue={setPassword}
            testID="password"
          />
        </View>
        <View style={styles.formItem}>
          <DialogButton
            position={'separate'}
            buttonText={userLoginText.login.buttonText}
            onPress={login}
            testID="login"
          />
        </View>
        <View style={styles.helpContainer}>
          <Text style={styles.helpText}>{userLoginText.login.content}</Text>
        </View>
        <View style={styles.formItem}>
          <DialogButton
            position={'separate'}
            buttonText={userLoginText.resetApp.buttonText}
            onPress={resetApp}
            testID={'resetApp'}
          />
        </View>
        <RememberPassword
          rememberPassword={rememberPassword}
          setRememberPassword={setRememberPassword}
        />
      </View>
    );
  };
  const resettingApp = () => {
    return (
      <View style={styles.form}>
        <View style={styles.formHeader}>
          <Text style={styles.titleText}>{userLoginText.resetApp.title}</Text>
        </View>
        <View style={styles.formItem}>
          <View style={styles.helpContainer}>
            <Text style={styles.helpText}>
              {userLoginText.resetApp.content}
            </Text>
          </View>
        </View>
        <View style={styles.formItem}>
          <DialogButton
            position={'separate'}
            buttonText={userLoginText.resetApp.confirmText}
            onPress={confirmResetApp}
            testID={'confirmResetApp'}
          />
        </View>
        <View style={styles.formItem}>
          <DialogButton
            position={'separate'}
            buttonText={userLoginText.resetApp.cancelText}
            onPress={cancelResetApp}
            testID={'cancelRestApp'}
          />
        </View>
      </View>
    );
  };

  const renderContent = () => {
    if (appdata.isFormDataPasswordProtected()) {
      if (compData.resettingApp) {
        return resettingApp();
      } else {
        return renderLoginForm();
      }
    } else {
      return renderLoginSetUpPage();
    }
  };

  const renderHeader = () => {
    return <View style={styles.header} />;
  };
  const layoutChanged = event => {
    if (event && event.nativeEvent && event.nativeEvent.layout) {
      setCompData({...compData});
    }
  };
  return (
    <View style={styles.container} onLayout={layoutChanged}>
      <StatusBar barStyle="light-content" />
      {renderHeader()}
      <KeyboardAwareScrollView contentContainerStyle={styles.content}>
        <Image style={styles.logo} source={images.logo} />
        <Text style={styles.logoText}>{userLoginText.app.title}</Text>
        {renderContent()}
      </KeyboardAwareScrollView>
    </View>
  );
};
