import React, { useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { signup } from '../slices/authSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/useSelpatch';
import { commonStyles } from '@/assets/commonStyles';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedInput } from '@/components/ThemedInput';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedDropdown } from '@/components/ThemedDropdown';
import ParallaxScrollView from '@/components/ParallaxScrollView';



interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
  countryCode: string;
  mobile: string;
  country: string;
}
const initialFormData: FormData = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  role: 'buyer',
  countryCode: '',
  mobile: '',
  country: '',
};
interface City {
  country: string;
}

export default function Signup() {

  const { signStatus } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitting, setSubmitting] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [countries, setCountries] = useState<string[]>([]);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});


  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get<City[]>('https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json');
        const data = response.data;
        const uniqueCountries = [...new Set(data.map((city: City) => city.country))];
        setCountries(uniqueCountries);
      } catch (error) {
        console.error('Error fetching country data:', error);
        Toast.show({ type: 'errorToast', text1: 'Failed', text2: 'Error fetching country data!' });
      }
    };
    fetchCountries();
  }, []);

  const validateForm = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.firstname) {
      newErrors.firstname = 'First name is required';
    } else if (formData.firstname.length < 2) {
      newErrors.firstname = 'First name must be at least 2 characters';
    }

    if (!formData.lastname) {
      newErrors.lastname = 'Last name is required';
    } else if (formData.lastname.length < 2) {
      newErrors.lastname = 'Last name must be at least 2 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
    }

    if (!formData.countryCode) {
      newErrors.countryCode = 'Country code is required';
    }

    if (!formData.mobile) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{7,15}$/.test(formData.mobile)) {
      newErrors.mobile = 'Enter a valid mobile number';
    }

    if (!formData.country) {
      newErrors.country = 'Country is required';
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
      const response = await dispatch(signup(formData)).unwrap();
      if (signStatus === 'success') {
        console.log(response.message);
        Toast.show({ type: 'successToast', text1: 'Signup Successful', text2: 'We have sent an otp to your email!' });
        router.push('/otp');
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



  return (
    <ParallaxScrollView bgColor={{ light: '#A1CEDC', dark: '#1D3D47' }}>
      <ThemedView style={commonStyles.screen}>
        <ThemedText type='title'>Sign up</ThemedText>

        <ThemedView style={commonStyles.formCont}>
          <ThemedView style={commonStyles.fieldCont}>
            <ThemedInput placeholder="Enter your first name" autoComplete="name-given" textContentType="givenName" onChangeText={text => handleChange('firstname', text)} />
            {errors.firstname && <ThemedText type="error">{errors.firstname}</ThemedText>}
          </ThemedView>

          <ThemedView style={commonStyles.fieldCont}>
            <ThemedInput placeholder="Enter your last name" autoComplete="name-family" textContentType="familyName" onChangeText={text => handleChange('lastname', text)} />
            {errors.lastname && <ThemedText type="error">{errors.lastname}</ThemedText>}
          </ThemedView>

          <ThemedView style={commonStyles.fieldCont}>
            <ThemedInput placeholder="Enter your email" autoComplete="email" keyboardType="email-address" textContentType="emailAddress"
              onChangeText={text => handleChange('email', text)} />
            {errors.email && <ThemedText type='error'>{errors.email}</ThemedText>}
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

          <ThemedView style={commonStyles.fieldCont}>
            <ThemedDropdown label="Select country" selectedValue={formData.country} onSelect={(value) => handleChange('country', value.value)}
              data={countries.map(country => ({
                label: country, value: country
              }))}
            />
            {errors.country && <ThemedText type="error">{errors.country}</ThemedText>}
          </ThemedView>

          <ThemedView style={styles.codeCont}>
            <ThemedDropdown style={{ width: 80 }} label="Country code" selectedValue={formData.countryCode || '+...'} onSelect={(value) => handleChange('countryCode', value.value)}
              data={[
                { label: 'Afghanistan (+93)', value: '93' },
                { label: 'Albania (+355)', value: '355' },
                { label: 'Algeria (+213)', value: '213' },
                { label: 'Andorra (+376)', value: '376' },
                { label: 'Angola (+244)', value: '244' },
                { label: 'Antigua and Barbuda (+1268)', value: '1268' },
                { label: 'Argentina (+54)', value: '54' },
                { label: 'Armenia (+374)', value: '374' },
                { label: 'Australia (+61)', value: '61' },
                { label: 'Austria (+43)', value: '43' },
                { label: 'Azerbaijan (+994)', value: '994' },
                { label: 'Bahamas (+1242)', value: '1242' },
                { label: 'Bahrain (+973)', value: '973' },
                { label: 'Bangladesh (+880)', value: '880' },
                { label: 'Barbados (+1246)', value: '1246' },
                { label: 'Belarus (+375)', value: '375' },
                { label: 'Belgium (+32)', value: '32' },
                { label: 'Belize (+501)', value: '501' },
                { label: 'Benin (+229)', value: '229' },
                { label: 'Bhutan (+975)', value: '975' },
                { label: 'Bolivia (+591)', value: '591' },
                { label: 'Bosnia and Herzegovina (+387)', value: '387' },
                { label: 'Botswana (+267)', value: '267' },
                { label: 'Brazil (+55)', value: '55' },
                { label: 'Brunei (+673)', value: '673' },
                { label: 'Bulgaria (+359)', value: '359' },
                { label: 'Burkina Faso (+226)', value: '226' },
                { label: 'Burundi (+257)', value: '257' },
                { label: 'Cambodia (+855)', value: '855' },
                { label: 'Cameroon (+237)', value: '237' },
                { label: 'Canada (+1)', value: '1-CA' },
                { label: 'Cape Verde (+238)', value: '238' },
                { label: 'Central African Republic (+236)', value: '236' },
                { label: 'Chad (+235)', value: '235' },
                { label: 'Chile (+56)', value: '56' },
                { label: 'China (+86)', value: '86' },
                { label: 'Colombia (+57)', value: '57' },
                { label: 'Comoros (+269)', value: '269' },
                { label: 'Congo (+242)', value: '242' },
                { label: 'Congo, Democratic Republic (+243)', value: '243' },
                { label: 'Costa Rica (+506)', value: '506' },
                { label: 'Croatia (+385)', value: '385' },
                { label: 'Cuba (+53)', value: '53' },
                { label: 'Cyprus (+357)', value: '357' },
                { label: 'Czech Republic (+420)', value: '420' },
                { label: 'Denmark (+45)', value: '45' },
                { label: 'Djibouti (+253)', value: '253' },
                { label: 'Dominica (+1767)', value: '1767' },
                { label: 'Dominican Republic (+1809)', value: '1809' },
                { label: 'Ecuador (+593)', value: '593' },
                { label: 'Egypt (+20)', value: '20' },
                { label: 'El Salvador (+503)', value: '503' },
                { label: 'Equatorial Guinea (+240)', value: '240' },
                { label: 'Eritrea (+291)', value: '291' },
                { label: 'Estonia (+372)', value: '372' },
                { label: 'Eswatini (+268)', value: '268' },
                { label: 'Ethiopia (+251)', value: '251' },
                { label: 'Fiji (+679)', value: '679' },
                { label: 'Finland (+358)', value: '358' },
                { label: 'France (+33)', value: '33' },
                { label: 'Gabon (+241)', value: '241' },
                { label: 'Gambia (+220)', value: '220' },
                { label: 'Georgia (+995)', value: '995' },
                { label: 'Germany (+49)', value: '49' },
                { label: 'Ghana (+233)', value: '233' },
                { label: 'Greece (+30)', value: '30' },
                { label: 'Grenada (+1473)', value: '1473' },
                { label: 'Guatemala (+502)', value: '502' },
                { label: 'Guinea (+224)', value: '224' },
                { label: 'Guinea-Bissau (+245)', value: '245' },
                { label: 'Guyana (+592)', value: '592' },
                { label: 'Haiti (+509)', value: '509' },
                { label: 'Honduras (+504)', value: '504' },
                { label: 'Hungary (+36)', value: '36' },
                { label: 'Iceland (+354)', value: '354' },
                { label: 'India (+91)', value: '91' },
                { label: 'Indonesia (+62)', value: '62' },
                { label: 'Iran (+98)', value: '98' },
                { label: 'Iraq (+964)', value: '964' },
                { label: 'Ireland (+353)', value: '353' },
                { label: 'Israel (+972)', value: '972' },
                { label: 'Italy (+39)', value: '39' },
                { label: 'Jamaica (+1876)', value: '1876' },
                { label: 'Japan (+81)', value: '81' },
                { label: 'Jordan (+962)', value: '962' },
                { label: 'Kazakhstan (+7)', value: '7-KZ' },
                { label: 'Kenya (+254)', value: '254' },
                { label: 'Kiribati (+686)', value: '686' },
                { label: 'Kuwait (+965)', value: '965' },
                { label: 'Kyrgyzstan (+996)', value: '996' },
                { label: 'Laos (+856)', value: '856' },
                { label: 'Latvia (+371)', value: '371' },
                { label: 'Lebanon (+961)', value: '961' },
                { label: 'Lesotho (+266)', value: '266' },
                { label: 'Liberia (+231)', value: '231' },
                { label: 'Libya (+218)', value: '218' },
                { label: 'Liechtenstein (+423)', value: '423' },
                { label: 'Lithuania (+370)', value: '370' },
                { label: 'Luxembourg (+352)', value: '352' },
                { label: 'Madagascar (+261)', value: '261' },
                { label: 'Malawi (+265)', value: '265' },
                { label: 'Malaysia (+60)', value: '60' },
                { label: 'Maldives (+960)', value: '960' },
                { label: 'Mali (+223)', value: '223' },
                { label: 'Malta (+356)', value: '356' },
                { label: 'Marshall Islands (+692)', value: '692' },
                { label: 'Mauritania (+222)', value: '222' },
                { label: 'Mauritius (+230)', value: '230' },
                { label: 'Mexico (+52)', value: '52' },
                { label: 'Micronesia (+691)', value: '691' },
                { label: 'Moldova (+373)', value: '373' },
                { label: 'Monaco (+377)', value: '377' },
                { label: 'Mongolia (+976)', value: '976' },
                { label: 'Montenegro (+382)', value: '382' },
                { label: 'Morocco (+212)', value: '212' },
                { label: 'Mozambique (+258)', value: '258' },
                { label: 'Myanmar (+95)', value: '95' },
                { label: 'Namibia (+264)', value: '264' },
                { label: 'Nauru (+674)', value: '674' },
                { label: 'Nepal (+977)', value: '977' },
                { label: 'Netherlands (+31)', value: '31' },
                { label: 'New Zealand (+64)', value: '64' },
                { label: 'Nicaragua (+505)', value: '505' },
                { label: 'Niger (+227)', value: '227' },
                { label: 'Nigeria (+234)', value: '234' },
                { label: 'North Korea (+850)', value: '850' },
                { label: 'North Macedonia (+389)', value: '389' },
                { label: 'Norway (+47)', value: '47' },
                { label: 'Oman (+968)', value: '968' },
                { label: 'Pakistan (+92)', value: '92' },
                { label: 'Palau (+680)', value: '680' },
                { label: 'Panama (+507)', value: '507' },
                { label: 'Papua New Guinea (+675)', value: '675' },
                { label: 'Paraguay (+595)', value: '595' },
                { label: 'Peru (+51)', value: '51' },
                { label: 'Philippines (+63)', value: '63' },
                { label: 'Poland (+48)', value: '48' },
                { label: 'Portugal (+351)', value: '351' },
                { label: 'Qatar (+974)', value: '974' },
                { label: 'Romania (+40)', value: '40' },
                { label: 'Russia (+7)', value: '7-RS' },
                { label: 'Rwanda (+250)', value: '250' },
                { label: 'Saint Kitts and Nevis (+1869)', value: '1869' },
                { label: 'Saint Lucia (+1758)', value: '1758' },
                { label: 'Saint Vincent and the Grenadines (+1784)', value: '1784' },
                { label: 'Samoa (+685)', value: '685' },
                { label: 'San Marino (+378)', value: '378' },
                { label: 'Saudi Arabia (+966)', value: '966' },
                { label: 'Senegal (+221)', value: '221' },
                { label: 'Serbia (+381)', value: '381' },
                { label: 'Seychelles (+248)', value: '248' },
                { label: 'Sierra Leone (+232)', value: '232' },
                { label: 'Singapore (+65)', value: '65' },
                { label: 'Slovakia (+421)', value: '421' },
                { label: 'Slovenia (+386)', value: '386' },
                { label: 'Solomon Islands (+677)', value: '677' },
                { label: 'Somalia (+252)', value: '252' },
                { label: 'South Africa (+27)', value: '27' },
                { label: 'South Korea (+82)', value: '82' },
                { label: 'South Sudan (+211)', value: '211' },
                { label: 'Spain (+34)', value: '34' },
                { label: 'Sri Lanka (+94)', value: '94' },
                { label: 'Sudan (+249)', value: '249' },
                { label: 'Suriname (+597)', value: '597' },
                { label: 'Sweden (+46)', value: '46' },
                { label: 'Switzerland (+41)', value: '41' },
                { label: 'Syria (+963)', value: '963' },
                { label: 'Taiwan (+886)', value: '886' },
                { label: 'Tajikistan (+992)', value: '992' },
                { label: 'Tanzania (+255)', value: '255' },
                { label: 'Thailand (+66)', value: '66' },
                { label: 'Togo (+228)', value: '228' },
                { label: 'Tonga (+676)', value: '676' },
                { label: 'Trinidad and Tobago (+1868)', value: '1868' },
                { label: 'Tunisia (+216)', value: '216' },
                { label: 'Turkey (+90)', value: '90' },
                { label: 'Turkmenistan (+993)', value: '993' },
                { label: 'Tuvalu (+688)', value: '688' },
                { label: 'Uganda (+256)', value: '256' },
                { label: 'Ukraine (+380)', value: '380' },
                { label: 'United Arab Emirates (+971)', value: '971' },
                { label: 'United Kingdom (+44)', value: '44' },
                { label: 'United States (+1)', value: '1-US' },
                { label: 'Uruguay (+598)', value: '598' },
                { label: 'Uzbekistan (+998)', value: '998' },
                { label: 'Vanuatu (+678)', value: '678' },
                { label: 'Vatican City (+379)', value: '379' },
                { label: 'Venezuela (+58)', value: '58' },
                { label: 'Vietnam (+84)', value: '84' },
                { label: 'Yemen (+967)', value: '967' },
                { label: 'Zambia (+260)', value: '260' },
                { label: 'Zimbabwe (+263)', value: '263' }
              ]}
            />
            <ThemedInput style={{ flex: 1 }} placeholder="Enter your mobile number" autoComplete="tel" keyboardType="phone-pad" textContentType="telephoneNumber" onChangeText={text => handleChange('mobile', text)} />
          </ThemedView>

          <ThemedView style={commonStyles.fieldCont}>
            {errors.mobile && <ThemedText type="error">{errors.mobile}</ThemedText>}
            {errors.countryCode && <ThemedText type="error">{errors.countryCode}</ThemedText>}
          </ThemedView>

          <View style={commonStyles.clickCont}>
            <ThemedButton text={submitting ? `Signing...` : `Signup`} onPress={handleSubmit} style={commonStyles.button} textStyle={{ color: '#ffffff', fontSize: 16, fontWeight: 'bold' }} disabled={submitting} />
            <View style={commonStyles.click}>
              <ThemedText type='default' >Already have an account?</ThemedText>
              <TouchableOpacity onPress={() => router.push('/')}>
                <ThemedText type='link'>Login</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/otp')}>
                <ThemedText type='link'>otp</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </ThemedView>

      </ThemedView>
    </ParallaxScrollView>
  );
};


const styles = StyleSheet.create({

  codeCont: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  }
});




