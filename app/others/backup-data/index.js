import React, {useState} from 'react';
import {backupFormDataTextConfig, menusConfig} from '../../configs';
import {appdata, formDataUtil} from '../../store';
import {ViewWithTabMenu} from '../../components';
import ClipboardCopyView from '../../clipboard-copy-view';
const ACT_TYPE = {
  NO_FORM_DATA: 1,
  EXPORT_FORM_DATA: 2,
  CLIPBOARD_COPY: 3,
  COMPLETE: 4,
};
const getStateFromProps = () => {
  const actionType = appdata.hasFormContent()
    ? ACT_TYPE.EXPORT_FORM_DATA
    : ACT_TYPE.NO_FORM_DATA;
  const content = '';
  return {content, actionType};
};

export default ({menuItems, onBack}) => {
  const [action, setAction] = useState(() => getStateFromProps());

  const exportFormData = () =>
    setAction({
      content: appdata.exportFormContentAsText(),
      actionType: ACT_TYPE.CLIPBOARD_COPY,
    });
  const toClipboardCopyComplete = () =>
    setAction({content: '', actionType: ACT_TYPE.COMPLETE});
  const renderNoFormData = () => (
    <ViewWithTabMenu
      title={backupFormDataTextConfig.title}
      menuItems={menuItems}
      selected={menusConfig.exportButton.menu}
      content={backupFormDataTextConfig.nodata.content}
    />
  );
  const renderExportFormDataView = () => {
    var help = formDataUtil.buldTextContentResolved(
      appdata.getActiveEncryptionKeyItem(),
      backupFormDataTextConfig.hasFormData.content,
    );
    var menuItems2 = [
      {
        menu: menusConfig.cancel.menu,
        onPress: onBack,
      },
    ];
    menuItems2.push({
      menu: menusConfig.export.menu,
      onPress: exportFormData,
    });
    return (
      <ViewWithTabMenu
        title={backupFormDataTextConfig.title}
        menuItems={menuItems2}
        selected={menusConfig.exportButton.menu}
        content={help}
      />
    );
  };
  const renderClipboardCopy = () => {
    return (
      <ClipboardCopyView
        title={backupFormDataTextConfig.clipboard.title}
        content1={backupFormDataTextConfig.clipboard.content1}
        content2={backupFormDataTextConfig.clipboard.content2}
        content={action.content}
        onNextStep={toClipboardCopyComplete}
        onBack={onBack}
      />
    );
  };

  const renderClipboardCopyComplete = () => {
    var menuItems2 = [
      {},
      {
        menu: menusConfig.ok.menu,
        onPress: onBack,
      },
      {},
    ];
    var help = formDataUtil.buldTextContentResolved(
      appdata.getActiveEncryptionKeyItem(),
      backupFormDataTextConfig.complete.content,
    );
    return (
      <ViewWithTabMenu
        title={backupFormDataTextConfig.complete.title}
        content={help}
        menuItems={menuItems2}
      />
    );
  };
  switch (action.actionType) {
    case ACT_TYPE.EXPORT_FORM_DATA:
      return renderExportFormDataView();
    case ACT_TYPE.CLIPBOARD_COPY:
      return renderClipboardCopy();
    case ACT_TYPE.COMPLETE:
      return renderClipboardCopyComplete();
    default:
      return renderNoFormData();
  }
};
