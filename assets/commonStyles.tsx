import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
  screen: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 50,
  },
  screenPad: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 20,
    paddingTop: 50,
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
});
