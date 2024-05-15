import React, {Component} from 'react'
import {View, TouchableHighlight, Clipboard} from 'react-native'

import NotificationText from '../display-text/NotificationText'
import {deviceInputTextConfig} from '../../configs'

export default class CopyToClipboard extends Component {
  constructor (props) {
    super(props)
    this.state = {notificationMessage: null}
  }
  componentWillUnmount () {
    if (this.clipboardTimerHandler) {
      clearTimeout(this.clipboardTimerHandler)
      this.clipboardTimerHandler = null
    }
  }
  displayNotificationMessage (notificationMessage) {
    this.setState(Object.assign({}, this.state, {notificationMessage}), () => {
      this.clipboardTimerHandler = setTimeout(() => {
        this.setState(
          Object.assign({}, this.state, {notificationMessage: null}),
        )
      }, 2000)
    })
  }
  exportToClipboard () {
    var content = this.props.content
    if (!content) {
      this.displayNotificationMessage(
        deviceInputTextConfig.clipboardCopyButton.emptyClipboard,
      )
      return
    }
    if (this.props.convert) {
      try {
        content = this.props.convert(content)
        if (!content) {
          this.displayNotificationMessage(
            deviceInputTextConfig.clipboardCopyButton.errorConvert,
          )
          return
        }
      } catch (error) {
        console.log(error)
        this.displayNotificationMessage(
          deviceInputTextConfig.clipboardCopyButton.errorConvert + ':' + error,
        )
        return
      }
    }
    Clipboard.setString(content)
    this.displayNotificationMessage(
      deviceInputTextConfig.clipboardCopyButton.notification,
    )
  }
  renderNotificationMessage () {
    if (this.state.notificationMessage) {
      var labelStyle = ''
      if (this.props.white) {
        labelStyle = 'light'
      }
      return (
        <NotificationText
          message={this.state.notificationMessage}
          labelStyle={labelStyle}
        />
      )
    } else {
      return null
    }
  }
  render () {
    return (
      <TouchableHighlight
        onPress={this.exportToClipboard.bind(this)}
        style={this.props.style}>
        <View style={this.props.contentContainerStyle}>
          {this.renderNotificationMessage()}
          {this.props.children}
        </View>
      </TouchableHighlight>
    )
  }
}
