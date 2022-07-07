/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
//import {ScanQRCode} from './app/scan-qr-code';
import ScanQRCode from './app/main';
enum Page {
  SCAN_QR_CODE,
  CONNECT_TO_APPLICATION,
}

const App = () => {
  const [page, setPage] = useState<Page>(Page.SCAN_QR_CODE);

  return <ScanQRCode />;
};

export default App;
