import React, {useState, useEffect} from 'react';

import {menusConfig} from '../configs';
import PasswordDecrypt from './PasswordDecrypt';
import {ManageKeysView} from '../others/manage-keys';

const ACT_TYPE = {
  PASSWORD: 1,
  DECRYPTED: 2,
};
export default ({codedata, decryptedEncryptionKey, toCameraView}) => {
  const getStateFromProps = () => {
    let actionType = ACT_TYPE.PASSWORD;
    var decryptedKey = null;
    if (decryptedEncryptionKey) {
      actionType = ACT_TYPE.DECRYPTED;
      decryptedKey = decryptedEncryptionKey;
    }
    return {codedata, decryptedKey, actionType};
  };
  const [action, setAction] = useState(() => getStateFromProps());
  useEffect(
    () => setAction(getStateFromProps()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [codedata, decryptedEncryptionKey],
  );
  const onEncryptionKeyDecrypted = decryptedKey =>
    setAction({...action, decryptedKey, actionType: ACT_TYPE.DECRYPTED});
  const renderDecryptWithPassword = () => {
    return (
      <PasswordDecrypt
        codedata={codedata}
        onBack={toCameraView}
        onEncryptionKeyDecrypted={onEncryptionKeyDecrypted}
      />
    );
  };
  const renderDecryptedView = () => {
    const menuItems = [{menu: menusConfig.back.menu, onPress: toCameraView}];
    return (
      <ManageKeysView
        menuItems={menuItems}
        importDecryptedKey={action.decryptedKey}
      />
    );
  };
  switch (action.actionType) {
    case ACT_TYPE.PASSWORD:
      return renderDecryptWithPassword();
    case ACT_TYPE.DECRYPTED:
      return renderDecryptedView();
    default:
      return null;
  }
};
