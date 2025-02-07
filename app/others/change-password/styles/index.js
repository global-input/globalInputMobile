import {StyleSheet} from 'react-native';

import {commonStyles} from '../../../common-styles';

var stylesData = {
  addAFieldContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
    padding: 10,
  },

  dialog: {
    display: 'flex',
    flexDirection: 'column',
    width: '95%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: 30,
  },

  itemText: {
    marginTop: 3,
    marginBottom: 3,
    color: 'rgba(72,128,237,1)',
    fontFamily: 'Futura-Medium',
    fontSize: 24,
  },
  inputContainer: {
    marginLeft: 40,
    marginRight: 40,
    marginTop: 10,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    borderWidth: 1,
    borderColor: 'rgba(72,128,237,1)',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    width: 120,
    height: 40,
    marginTop: 50,
  },
  errorMessage: {
    color: 'red',
  },
};

var resultStyle = Object.assign({}, commonStyles, stylesData);

export const styles = StyleSheet.create(resultStyle);
