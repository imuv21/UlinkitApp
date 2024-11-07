import Toast from 'react-native-toast-message';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { login } from '../slices/authSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/useSelpatch';
import { commonStyles } from '@/assets/commonStyles';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedInput } from '@/components/ThemedInput';
import { ThemedButton } from '@/components/ThemedButton';
import ParallaxScrollView from '@/components/ParallaxScrollView';


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

  const { logStatus } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [passwordVisible, setPasswordVisible] = useState(false);

  const validateForm = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

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
      if (logStatus === 'success') {
        console.log(response.message);
        Toast.show({ type: 'successToast', text1: 'Login Successful', text2: 'User has logged in successfully!' });
        router.push('/explore');
      } else {
        console.log(response.message);
        Toast.show({ type: 'errorToast', text1: 'Error', text2: 'Something went wrong!' });
      }
    } catch (error) {
      console.error('Login failed:', error);
      Toast.show({ type: 'errorToast', text1: 'Error', text2: 'Something went wrong!' });
    } finally {
      setSubmitting(false);
    }
  };

  // const showToast = async () => {
  //   Toast.show({ type: 'successToast', text1: 'Success', text2: 'User has logged in successfully!' });
  //   Toast.show({ type: 'errorToast', text1: 'Error', text2: 'Something went wrong!' });
  // }


  return (
    <ParallaxScrollView bgColor={{ light: '#A1CEDC', dark: '#1D3D47' }}>
      <ThemedView style={commonStyles.screen}>
        <ThemedText type='title'>Login</ThemedText>

        <ThemedView style={commonStyles.formCont}>
          <ThemedView style={commonStyles.fieldCont}>
            <ThemedInput placeholder="Enter your email" autoComplete="email" keyboardType="email-address" textContentType="emailAddress"
              onChangeText={text => handleChange('username', text)} />
            {errors.username && <ThemedText type='error'>{errors.username}</ThemedText>}
          </ThemedView>

          <ThemedView style={commonStyles.fieldCont}>
            <ThemedView style={commonStyles.passfield}>
              <ThemedInput placeholder="Enter your password" autoComplete="password" keyboardType="default" textContentType="password" autoCapitalize="none"
                secureTextEntry={!passwordVisible} onChangeText={text => handleChange('password', text)} />

              <TouchableOpacity style={commonStyles.iconCont} onPress={() => setPasswordVisible(!passwordVisible)}>
                {passwordVisible ? <Ionicons name="eye" style={commonStyles.icon} /> : <Ionicons name="eye-off" style={commonStyles.icon} />}
              </TouchableOpacity>
            </ThemedView>
            {errors.password && <ThemedText type='error'>{errors.password}</ThemedText>}
          </ThemedView>

          <View style={commonStyles.clickCont}>
            <ThemedButton text={submitting ? `Loging...` : `Login`} onPress={handleSubmit} style={commonStyles.button} textStyle={{ color: '#ffffff', fontSize: 16, fontWeight: 'bold' }} disabled={submitting} />
            <View style={commonStyles.click}>
              <ThemedText type='default' >New to Ulinkit?</ThemedText>
              <TouchableOpacity onPress={() => router.push('/signup')}>
                <ThemedText type='link'>Sign up</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </ThemedView>

      </ThemedView>
    </ParallaxScrollView>
  );
};



