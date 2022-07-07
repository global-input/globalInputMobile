import React, {Component} from "react";
import {Text} from "react-native";
import {StackNavigator} from "react-navigation";
import HomeScreen from "../home";
import {GlobalInputView} from "../global-input-react-native";

export const AppNavigator = StackNavigator({
    globalInput: { screen: GlobalInputView},
    home: {screen:HomeScreen}

});
