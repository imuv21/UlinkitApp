import { StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedInput } from '@/components/ThemedInput';
import { useState } from 'react';
import { commonStyles } from '@/assets/commonStyles';

interface FormData {
  username: string;
  password: string;
  role: string;
}
const initialFormData: FormData = {
  username: '',
  password: '',
  role: 'buyer',
};

export default function Login() {

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <ParallaxScrollView bgColor={{ light: '#A1CEDC', dark: '#1D3D47' }}>
      <ThemedView style={commonStyles.screen}>
        <ThemedText type='title'>Login Page</ThemedText>
        <ThemedView style={styles.formCont}>
          <ThemedInput placeholder="Enter your email" autoComplete="email" keyboardType="email-address" textContentType="emailAddress" 
              onChangeText={text => handleChange('username', text)} />
          <ThemedInput placeholder="Enter your password" autoComplete="password" keyboardType="default" textContentType="password" autoCapitalize="none" secureTextEntry 
              onChangeText={text => handleChange('password', text)} />
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  formCont: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
});


