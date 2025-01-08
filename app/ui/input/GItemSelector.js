import React, {useState} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';

import tickOff from './tick-off-icon.png';
import tickOn from './tick-on-icon.png';
import updownIcon from './up-down-icon.png';

export default ({items, selectedItem, onValueChange, label}) => {
  const [showListMode, setShowListMode] = useState(false);

  if (showListMode) {
    const onSelected = value => {
      setShowListMode(false);
      onValueChange(value);
    };
    return (
      <View style={styles.selectionFieldContainer}>
        <TouchableHighlight
          onPress={() => {
            this.setShowListMode(false);
          }}>
          <View style={styles.selectionSelectedRow}>
            <View>
              <Text style={styles.label}>{label}</Text>
            </View>
          </View>
        </TouchableHighlight>

        <FlatList
          data={items}
          keyExtractor={item => item.value}
          renderItem={({item}) => (
            <DisplayItem
              item={item}
              selectedItem={selectedItem}
              onSelected={onSelected}
            />
          )}
        />
      </View>
    );
  } else {
    let valueLabel = '';
    if (selectedItem) {
      valueLabel = selectedItem.label ? selectedItem.label : selectedItem.value;
    }
    return (
      <View style={styles.selectionFieldContainer}>
        <TouchableHighlight
          onPress={() => {
            setShowListMode(true);
          }}>
          <View style={styles.selectionSelectedRow}>
            <View>
              <Text style={styles.label}>{label}</Text>
              <Text style={styles.selectionSelectedValueText}>
                {valueLabel}
              </Text>
            </View>
            <Image source={updownIcon} />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
};

const DisplayItem = ({item, selectedItem, onSelected}) => {
  const {value, label} = item;
  var image = selectedItem && selectedItem.value === value ? tickOn : tickOff;
  return (
    <TouchableHighlight
      onPress={() => {
        onSelected(value);
      }}>
      <View style={styles.optionRow}>
        <View style={styles.optionLabel}>
          <Image source={image} />
        </View>
        <Text style={styles.optionText}>{label}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  selectionFieldContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderColor: '#B9C3CE',
    borderBottomWidth: 1,
    width: '100%',
  },
  selectionSelectedRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  selectionSelectedValueText: {
    fontSize: 20,
    color: '#4880ED',
    width: '100%',
    margin: 0,
    padding: 0,
  },
  optionLabel: {
    width: 35,
    height: 25,
  },
  optionText: {
    fontSize: 20,
    color: '#4880ED',
    margin: 0,
    padding: 0,
  },
  optionRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 10,
    color: '#4880ED',
    height: 15,
    marginBottom: 0,
    paddingBottom: 0,
    fontFamily: 'Futura-Medium',
  },
});
