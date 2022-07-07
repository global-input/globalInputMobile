import React, { useState, Component, PureComponent } from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

import tickOff from "./tick-off-icon.png";
import tickOn from "./tick-on-icon.png";



export default ({ items, label, selectType, selectedItems, onValueChange }) => {

  const onSelected = item => {

    var isAlreadySelected = selectedItems && selectedItems.filter(itm => itm.value === item.value).length > 0;
    if (selectType === 'single') {
      if (isAlreadySelected) {
        onValueChange([]);
      }
      else {
        onValueChange([item]);
      }
    }
    else {
      if (isAlreadySelected) {
        onValueChange(selectedItems.filter(itm => itm.value !== item.value));
      }
      else {
        if (selectedItems) {
          onValueChange([...selectedItems, item]);
        }
        else {
          onValueChange([item]);
        }
      }
    }

  };
  return (<View style={styles.selectionFieldContainer}>
    <Text style={styles.label}>{label}</Text>
    <FlatList data={items}
      keyExtractor={item => item.value}
      renderItem={({ item }) => (<DisplayItem item={item} selectedItems={selectedItems} onSelected={onSelected} />)
      } />
  </View>);

};

const DisplayItem = ({ item, selectedItems, onSelected }) => {

  image = tickOff;
  if (selectedItems) {
    selectedItems.forEach(itm => {
      if (itm.value === item.value) {
        image = tickOn;
      }
    });
  }
  return (
    <TouchableHighlight onPress={() => {
      onSelected(item);
    }}>
      <View style={styles.optionRow}>
        <Text style={styles.optionText}>
          {item.label}
        </Text>
        <View style={styles.optionLabel}>
          <Image source={image} />
        </View>

      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({

  selectionFieldContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderColor:"#B9C3CE",
    borderBottomWidth: 1,
    width: "100%"
  },
  selectionSelectedRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  selectionSelectedValueText: {
    fontSize: 20,
    color: "#4880ED",
    width: "100%",
    margin: 0,
    padding: 0,
  },
  optionLabel: {
    width: 35,
    height: 25,
    marginLeft:15
  },
  optionText: {
    fontSize: 20,
    color: "#4880ED",
    margin: 0,
    padding: 0,
  },
  optionRow: {
    display: "flex",
    flex: 1,    
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    marginBottom:10
  },
  label: {
    fontSize: 10,
    color: "#4880ED",
    height: 15,
    marginBottom: 0,
    paddingBottom: 0,    
    fontFamily: "Futura-Medium",
  }

});







