import { Text, View } from 'react-native'
import React, { Component } from 'react'

import { styles } from "../display-user-login/styles";
import { DialogButton, DisplayBlockText, ViewWithTabMenu } from '../components';

import EditorWithTabMenu from '../components';
import { appdata, store } from '../store';
import { clearAppLoginContent } from '../store/reducers/userSettings';

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
    }

    deleteAllData() {
        appdata.clearAllForms();
        clearAppLoginContent(store);
        this.props.goBack();
    }

    render() {
        return (
            <ViewWithTabMenu title={"Resetting the app"}>
                <DisplayBlockText content={[
                    "If you have forgotten your password, there is no way to restore your data as all user content is encrypted.",
                    "You must reset the app to continue, permanently removing all data. Click the button below if you would like to do this."
                ]}>
                </DisplayBlockText>
                <DialogButton position={"separate"} buttonText={"I understand, reset the app"} onPress={(() => this.deleteAllData())} testID="reset" />
                <DialogButton position={"separate"} buttonText={"No, take me back"} onPress={this.props.goBack} testID="reset" />
            </ViewWithTabMenu>
        );
    }
}