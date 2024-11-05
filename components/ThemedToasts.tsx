import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BaseToast, ErrorToast, BaseToastProps, ToastConfigParams } from 'react-native-toast-message';

const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={styles.successToast}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.successText1}
    />
  ),

  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      text1Style={styles.errorText1}
      text2Style={styles.errorText2}
    />
  ),
  
  tomatoToast: ({ text1, props }: ToastConfigParams<any>) => (
    <View style={styles.tomatoToast}>
      <Text style={styles.tomatoText}>{text1 ?? 'Default Text'}</Text>
      <Text>{props?.uuid ?? 'No UUID provided'}</Text>
    </View>
  ),
};

export default toastConfig;

const styles = StyleSheet.create({
  successToast: {
    borderLeftColor: 'pink',
  },
  contentContainer: {
    paddingHorizontal: 15,
  },
  successText1: {
    fontSize: 15,
    fontWeight: '400',
  },
  errorText1: {
    fontSize: 17,
  },
  errorText2: {
    fontSize: 15,
  },
  tomatoToast: {
    height: 60,
    width: '100%',
    backgroundColor: 'tomato',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  tomatoText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});



