import React, {useState} from 'react';
import {FlatList, TouchableHighlight} from 'react-native';
import styled from 'styled-components/native';
import {ViewWithTabMenu} from '../components';
import {appdata} from '../store';
import {menusConfig} from '../configs';
const ItemRecord = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-bottom-width: 1px;
  border-color: rgba(72, 128, 237, 0.2);
  padding-bottom: 5px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 5px;
`;

const ItemRow = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
  width: 100%;
`;

const ListContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
`;

const ListValue = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
`;

const TimeText = styled.Text`
  color: rgba(72, 128, 237, 1);
  font-family: Futura-Medium;
  font-size: 16px;
`;

const DeleteButton = styled.TouchableHighlight`
  padding: 8px 16px;
  margin-left: 10px;
`;

const DeleteText = styled.Text`
  color: #ff4444;
  font-family: Futura-Medium;
  font-size: 14px;
`;

const EmptyContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
`;

const EmptyText = styled.Text`
  color: #a0a0a0;
  font-family: Futura-Medium;
  font-size: 16px;
`;

const ACT_TYPE = {
  LIST_HISTORY: 1,
};

const ManageCodeDataHistory = ({menuItems, onCodeSelected, onBack}) => {
  const [action] = useState({type: ACT_TYPE.LIST_HISTORY});
  const [historyData, setHistoryData] = useState(() =>
    appdata.getHistoryData(),
  );

  const onItemSelected = historyItem => {
    if (historyItem?.codeData) {
      onCodeSelected(historyItem.codeData);
    }
  };

  const deleteHistoryItem = historyItem => {
    if (historyItem?.codeData) {
      appdata.removeCodeDataFromHistory(historyItem.codeData);
      setHistoryData(appdata.getHistoryData());
    }
  };

  const formatTime = timestamp => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const renderHistoryItem = ({item}) => {
    return (
      <TouchableHighlight
        onPress={() => onItemSelected(item)}
        underlayColor="rgba(72, 128, 237, 0.1)">
        <ItemRecord>
          <ItemRow>
            <ListContainer>
              <ListValue>
                <TimeText>{formatTime(item.time)}</TimeText>
              </ListValue>
              <DeleteButton
                onPress={() => deleteHistoryItem(item)}
                underlayColor="rgba(255, 68, 68, 0.1)">
                <DeleteText>Delete</DeleteText>
              </DeleteButton>
            </ListContainer>
          </ItemRow>
        </ItemRecord>
      </TouchableHighlight>
    );
  };

  const renderEmptyList = () => (
    <EmptyContainer>
      <EmptyText>No connection history found</EmptyText>
    </EmptyContainer>
  );

  const renderListItems = () => {
    const defaultMenus = [
      {
        menu: menusConfig.back.menu,
        onPress: onBack,
      },
    ];

    return (
      <ViewWithTabMenu
        menuItems={menuItems ? menuItems : defaultMenus}
        title="Connection History">
        <FlatList
          data={historyData}
          renderItem={renderHistoryItem}
          ListEmptyComponent={renderEmptyList}
          keyExtractor={item => item.id}
        />
      </ViewWithTabMenu>
    );
  };

  switch (action.type) {
    case ACT_TYPE.LIST_HISTORY:
      return renderListItems();
    default:
      return null;
  }
};

export default ManageCodeDataHistory;
