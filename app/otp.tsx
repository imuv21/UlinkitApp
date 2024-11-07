import Toast from 'react-native-toast-message';
import { useState, useRef, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { verifyOtp } from '../slices/authSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/useSelpatch';
import { commonStyles } from '@/assets/commonStyles';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedInput } from '@/components/ThemedInput';
import { ThemedButton } from '@/components/ThemedButton';
import ParallaxScrollView from '@/components/ParallaxScrollView';


interface FormData {
    otp: string;
    username: string;
    role: string;
}

export default function Otp() {

    const { tempEmail, otpStatus } = useAppSelector((state) => state.auth);
    const initialFormData: FormData = {
        otp: '',
        username: tempEmail ?? '',
        role: 'buyer',
    };

    const dispatch = useAppDispatch();
    const router = useRouter();
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [submitting, setSubmitting] = useState(false);
    const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
    const otpInputs = useRef<TextInput[]>([]);

    const handleOtpChange = (index: number, value: string) => {
        const updatedOtpDigits = [...otpDigits];
        updatedOtpDigits[index] = value;
        setOtpDigits(updatedOtpDigits);
        const otp = updatedOtpDigits.join('');
        setFormData(prevData => ({ ...prevData, otp }));
        if (value && index < otpInputs.current.length - 1) {
            otpInputs.current[index + 1].focus();
        }
    };
    const handleSubmit = async () => {
        if (submitting) return;
        setSubmitting(true);
        try {
            const response = await dispatch(verifyOtp(formData)).unwrap();
            if (otpStatus === 'success') {
                console.log(response.message);
                Toast.show({ type: 'successToast', text1: 'Verification Successful', text2: 'Your email has been successfully verified. Please log in now!' });
                router.push('/login');
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

    useEffect(() => {
        otpInputs.current[0]?.focus();
    }, []);


    return (
        <ParallaxScrollView bgColor={{ light: '#A1CEDC', dark: '#1D3D47' }}>
            <ThemedView style={commonStyles.screen}>
                <ThemedText type='title'>Verify Email</ThemedText>
                <ThemedView style={commonStyles.formCont}>

                    <ThemedView style={styles.otp}>
                        {otpDigits.map((digit, index) => (
                            <ThemedInput key={index} ref={(el) => (otpInputs.current[index] = el!)} style={styles.wid} 
                             keyboardType="number-pad" maxLength={1} value={digit} onChangeText={text => handleOtpChange(index, text)} 
                            />
                        ))}
                    </ThemedView>
                    
                    <View style={commonStyles.clickCont}>
                        <ThemedButton text={submitting ? `Submiting...` : `Submit`} onPress={handleSubmit} style={commonStyles.button} textStyle={{ color: '#ffffff', fontSize: 16, fontWeight: 'bold' }} disabled={submitting} />
                        <View style={commonStyles.click}>
                            <ThemedText type='default' >Go back to</ThemedText>
                            <TouchableOpacity onPress={() => router.push('/signup')}>
                                <ThemedText type='link'>sign up</ThemedText>
                            </TouchableOpacity>
                        </View>
                    </View>

                </ThemedView>
            </ThemedView>
        </ParallaxScrollView>
    );
};

const styles = StyleSheet.create({
    wid: {
        flex: 1
    },
    otp: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8
    },
    codeCont: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5
    }
});




