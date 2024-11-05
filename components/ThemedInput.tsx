import { View, TextInput, type TextInputProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { commonStyles } from '@/assets/commonStyles';


export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedInput({ style, lightColor, darkColor, ...otherProps }: ThemedTextInputProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const placeholderTextColor = useThemeColor({ light: '#A9A9A9', dark: '#D3D3D3' }, 'text');
  const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#333333' }, 'background');
  const borderColor = color === lightColor ? '#CCCCCC' : '#444444'; 

  return (
    <View style={[commonStyles.inputWrapper, { borderColor }]}>
      <TextInput style={[{ color, backgroundColor }, style, commonStyles.input]} placeholderTextColor={placeholderTextColor} {...otherProps} />
    </View>
  );
}