import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { commonStyles } from '@/assets/commonStyles';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedInput } from '@/components/ThemedInput';
import { login } from '../../slices/authSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/useSelpatch';
import { ThemedButton } from '@/components/ThemedButton';
import Toast from 'react-native-toast-message';

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

  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const { user, token, status } = useAppSelector((state) => state.auth);

  const validateForm = () => {
    const newErrors: { username?: string; password?: string } = {};

    if (!formData.username) {
      newErrors.username = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.username)) {
      newErrors.username = 'Enter a valid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prevData => ({ ...prevData, [field]: value }));
    setErrors(prevErrors => ({ ...prevErrors, [field]: undefined }));
  };

  const handleSubmit = async () => {
    if (submitting) return;
    if (!validateForm()) return;
    setSubmitting(true);
    try {
      const response = await dispatch(login(formData)).unwrap();
      if (response.status === 'true') {
        console.log(response.message);
        Toast.show({ type: 'success', text1: 'Logged in successfully!', text2: 'Welcome back!' });
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const showToast = () => {
    Toast.show({ type: 'success', text1: 'Logged in successfully!',  text2: 'Welcome back!', });
  }

  return (
    <ParallaxScrollView bgColor={{ light: '#A1CEDC', dark: '#1D3D47' }}>
      <ThemedView style={commonStyles.screen}>
        <ThemedText type='title'>Login</ThemedText>
        <ThemedView style={styles.formCont}>

          <ThemedView style={styles.fieldCont}>
            <ThemedInput placeholder="Enter your email" autoComplete="email" keyboardType="email-address" textContentType="emailAddress"
              onChangeText={text => handleChange('username', text)} />
            {errors.username && <ThemedText type='error'>{errors.username}</ThemedText>}
          </ThemedView>

          <ThemedView style={styles.fieldCont}>
            <ThemedInput placeholder="Enter your password" autoComplete="password" keyboardType="default" textContentType="password" autoCapitalize="none" secureTextEntry
              onChangeText={text => handleChange('password', text)} />
            {errors.password && <ThemedText type='error'>{errors.password}</ThemedText>}
          </ThemedView>

          <ThemedButton text={submitting ? `Loging...` : `Login`} onPress={showToast} style={commonStyles.button} textStyle={{ color: '#ffffff', fontSize: 16, fontWeight: 'bold' }} disabled={submitting} />
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
  fieldCont: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
});


