import React, {Component} from 'react';
import {appTextConfig, menusConfig} from '../configs';
import {ViewWithTabMenu} from '../components';

export default ({menuItems}) => (
  <ViewWithTabMenu
    title={appTextConfig.notAuthorized.title}
    menuItems={menuItems}
    selected={menusConfig.eye.menu}
    content={appTextConfig.notAuthorized.content}
  />
);
