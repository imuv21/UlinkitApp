import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BaseToast, ErrorToast, BaseToastProps, ToastConfigParams } from 'react-native-toast-message';

const toastConfig = {

  // success: (props: BaseToastProps) => (
  //   <BaseToast
  //     {...props}
  //     style={styles.susToast}
  //     contentContainerStyle={styles.susCont}
  //     text1Style={styles.susText1}
  //   />
  // ),
  // error: (props: BaseToastProps) => (
  //   <ErrorToast
  //     {...props}
  //     text1Style={styles.errText1}
  //     text2Style={styles.errText2}
  //   />
  // ),
  
  successToast: ({ text1, text2 }: ToastConfigParams<any>) => (
    <View style={styles.successToast}>
      <Text style={styles.successText}>{text1 ?? 'Something went wrong!'}</Text>
      <Text style={styles.successTextTwo}>{text2 ?? 'Something went wrong!'}</Text>
    </View>
  ),
  errorToast: ({ text1, text2 }: ToastConfigParams<any>) => (
    <View style={styles.errorToast}>
      <Text style={styles.errorText}>{text1 ?? 'Something went wrong!'}</Text>
      <Text style={styles.errorTextTwo}>{text2 ?? 'Something went wrong!'}</Text>
    </View>
  ),
};

export default toastConfig;

const styles = StyleSheet.create({
  // susToast: {
  //   borderLeftColor: 'pink',
  // },
  // susCont: {
  //   paddingHorizontal: 15,
  // },
  // susText1: {
  //   fontSize: 15,
  //   fontWeight: '400',
  // },
  // errText1: {
  //   fontSize: 17,
  // },
  // errText2: {
  //   fontSize: 15,
  // },

  successToast: {
    height: 55,
    width: '90%',
    backgroundColor: '#e3ffe4',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 8,
  },
  successText: {
    fontSize: 16,
    color: '#00ae06',
    fontWeight: 'bold',
  },
  successTextTwo: {
    fontSize: 12,
    color: '#00ae06',
    fontWeight: 'bold',
  },

  errorToast: {
    height: 55,
    width: '90%',
    backgroundColor: '#ffeaea',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 8,
  },
  errorText: {
    fontSize: 16,
    color: '#ff3b3b',
    fontWeight: 'bold',
  },
  errorTextTwo: {
    fontSize: 12,
    color: '#ff3b3b',
    fontWeight: 'bold',
  },
});



