import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({

  //auth screens
  formCont: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  fieldCont: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  clickCont: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    gap: 10
  },
  click: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5
  },
  iconCont: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  icon: {
    fontSize: 20,
    color: 'gray',
  },
  passfield: {
    position: 'relative',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },

  
  //more common
  screen: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 50,
    padding: 20,
  },
  inputWrapper: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    borderStyle: 'solid',
    overflow: 'hidden',
  },
  input: {
    width: '100%',
    paddingLeft: 20,
    padding: 5,
  },
  button: {
    width: '100%',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
