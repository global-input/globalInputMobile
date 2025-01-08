import React, {Component} from 'react';
import {Text, TextInput, View, Image, Keyboard} from 'react-native';

import {styles, stylesWithNumberOfLines} from './styles';

export default class TextInputField extends Component {
  constructor(props) {
    super(props);
    this.state = this.getStateFromProps(this.props);
  }
  getStateFromProps(props) {
    return {focused: false};
  }
  focus() {
    if (this.textField) {
      this.textField.focus();
    }
  }
  onBlur() {
    this.setState({focused: false});
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }
  onFocus() {
    this.setState({focused: true});
    if (this.props.onFocus) {
      this.props.onFocus();
    }
  }
  donePress() {
    Keyboard.dismiss();
    this.setState({focused: false});
    if (this.textField) {
      this.textField.blur();
    }
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }

  renderFocusContent() {
    if (this.state.focused) {
      if (this.props.focusedContent) {
        return this.props.focusedContent;
      } else {
        return null;
      }
    } else if (this.props.notFocusedContent) {
      return this.props.notFocusedContent;
    } else {
      return null;
    }
  }

  renderLabelIcon() {
    if (this.props.labelIcon) {
      return <Image source={this.props.labelIcon} style={styles.labelIcon} />;
    } else {
      return null;
    }
  }
  renderlabel() {
    if (this.props.value && this.props.placeholder) {
      return <Text style={styles.label}>{this.props.placeholder}</Text>;
    } else {
      return null;
    }
  }
  renderOneline() {
    return (
      <View style={styles.fieldContainer}>
        {this.renderLabelIcon()}
        <View style={styles.textInputContainer}>
          {this.renderlabel()}
          <TextInput
            selectTextOnFocus={this.props.selectTextOnFocus}
            style={styles.inputText}
            secureTextEntry={this.props.secureTextEntry}
            editable={this.props.editable}
            underlineColorAndroid="white"
            value={this.props.value}
            onBlur={this.onBlur.bind(this)}
            onFocus={this.onFocus.bind(this)}
            ref={textField => {
              this.textField = textField;
            }}
            onChangeText={this.props.onChangeTextValue}
            autoCapitalize={this.props.autoCapitalize}
            testID={this.props.testID}
            placeholder={this.props.placeholder}
          />
        </View>

        {this.renderFocusContent()}
        {this.props.children}
      </View>
    );
  }
  renderMultiLine(numberOfLines) {
    var dynamicStyle = stylesWithNumberOfLines(numberOfLines);
    return (
      <View style={dynamicStyle.textAreaContainer}>
        <View style={styles.labelContainer}>
          <View style={styles.labelAndIcon}>
            {this.renderLabelIcon()}
            <Text style={styles.label}>{this.props.label}</Text>
          </View>
          {this.renderFocusContent()}
          {this.props.children}
        </View>

        <TextInput
          style={dynamicStyle.textarea}
          multiline={this.props.multiline}
          secureTextEntry={this.props.secureTextEntry}
          editable={this.props.editable}
          value={this.props.value}
          underlineColorAndroid="white"
          numberOfLines={numberOfLines}
          onBlur={this.onBlur.bind(this)}
          onFocus={this.onFocus.bind(this)}
          ref={textField => {
            this.textField = textField;
          }}
          testID={this.props.testID}
          onChangeText={this.props.onChangeTextValue}
          placeholder={this.props.placeholder}
        />
      </View>
    );
  }

  render() {
    var numberOfLines = 1;
    if (this.props.numberOfLines) {
      numberOfLines = parseInt(this.props.numberOfLines, 10);
    }

    if (numberOfLines > 1) {
      return this.renderMultiLine(numberOfLines);
    } else {
      return this.renderOneline();
    }
  }
}
