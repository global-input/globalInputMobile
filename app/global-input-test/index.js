import {useEffect} from 'react';
import {qrCode} from './tesddata'; // Import test data from a separate file

const useMockQRScanner = onCodeDataReceived => {
  useEffect(() => {
    // Ensure this only runs in development mode
    if (__DEV__) {
      console.log('Mock QR Scanner is active');

      const timer = setTimeout(() => {
        // Use the first test case or customize as needed

        console.log('**Mock QR Data:', qrCode);
        onCodeDataReceived({data: qrCode});
      }, 2000);

      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [onCodeDataReceived]);
};

export default useMockQRScanner;
