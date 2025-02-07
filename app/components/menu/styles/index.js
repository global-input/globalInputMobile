import {StyleSheet} from 'react-native';

import DeviceDetector from './DeviceDetector';
var deviceDector = new DeviceDetector();

var stylesData = {
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',

    backgroundColor: 'rgba(72,128,237,1)',
  },
  header: {
    backgroundColor: 'rgba(72,128,237,1)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    margin: 0,
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: 'rgba(80,80,80,0.5)',
  },
  centerHeader: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Futura-Medium',
    textAlign: 'center',
    flexWrap: 'nowrap',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#FFFFFF',
  },
  titleIcon: {
    marginRight: 5,
  },
  contentContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    minHeight: '100%',
    paddingBottom: 70,
  },
  tab: {
    margin: 0,
    bottom: 0,
    left: 0,
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(72,128,237,1)',

    width: '100%',
    borderColor: '#333333',
    borderStyle: 'solid',
    borderTopWidth: 1,
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,

    zIndex: 100,
    paddingHorizontal: 16,
  },
  tabOnTop: {
    backgroundColor: 'rgba(72,128,237,1)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    margin: 0,
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: 'rgba(80,80,80,0.5)',
  },
  scrollContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%',
  },

  floatingIcon: {
    margin: 0,
    bottom: 250,
    right: 10,
    position: 'absolute',
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 200,
  },
  notificationBar: {
    margin: 0,
    height: 70,
    bottom: 40,
    left: 5,
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    zIndex: 100,
  },
  menuText: {
    color: '#FFFFFF',
    fontSize: 10,
  },
  menuItem: {
    margin: 0,
    paddingLeft: 10,
    paddingRight: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconcontainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconcontainerSelected: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#FFFFFF',
    borderStyle: 'solid',
    borderBottomWidth: 1,
  },
  endSpaceWhenKeyboardHiding: {
    height: 50,
    width: '100%',
  },
  endSpaceWhenKeyboardShowing: {
    height: 100,
    width: '100%',
  },
  textBlockContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 10,
  },
  messageWindowContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '90%',
  },
};

if (deviceDector.isIphoneX()) {
  stylesData.header.paddingTop = 40;
  stylesData.tabOnTop.paddingTop = 40;
  stylesData.tab.paddingBottom = 17;
} else if (deviceDector.isIPad() || deviceDector.isIphone()) {
  stylesData.header.paddingTop = 20;
  stylesData.tabOnTop.paddingTop = 20;
}

stylesData.menuTextSelected = Object.assign({}, stylesData.menuText, {
  fontWeight: 'bold',
});

stylesData.headerLandscape = Object.assign({}, stylesData.header, {
  paddingRight: 30,
  paddingLeft: 30,
});

stylesData.tabOnTopLandscape = Object.assign({}, stylesData.tabOnTop, {
  paddingRight: 30,
  paddingLeft: 30,
});
stylesData.tabLandscape = Object.assign({}, stylesData.tab, {
  paddingRight: 30,
  paddingLeft: 30,
});

stylesData.contentContainer.width = deviceDector.getStaticDimension().width;

stylesData.contentContainerLandscape = Object.assign(
  {},
  stylesData.contentContainer,
  {
    paddingRight: 30,
    paddingLeft: 35,
    width: deviceDector.getStaticDimension().height,
  },
);

stylesData.floatingIconLandscape = Object.assign({}, stylesData.floatingIcon, {
  right: 50,
});

if (deviceDector.isIphoneX()) {
  stylesData.headerLandscape.paddingTop = 5;
}
if (deviceDector.isIphoneX()) {
  stylesData.headerLandscape.paddingTop = 5;
  stylesData.tabOnTopLandscape.paddingTop = 5;
} else if (deviceDector.isIphone()) {
  stylesData.headerLandscape.paddingTop = 5;
  stylesData.tabOnTopLandscape.paddingTop = 5;
} else if (deviceDector.isIPad()) {
  stylesData.headerLandscape.paddingTop = 20;
  stylesData.tabOnTopLandscape.paddingTop = 20;
}

var styles = StyleSheet.create(stylesData);
export {styles, deviceDector, stylesData};
