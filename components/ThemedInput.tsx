import React, { forwardRef } from 'react';
import { View, TextInput, type TextInputProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { commonStyles } from '@/assets/commonStyles';


export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
};

export const ThemedInput = forwardRef<TextInput, ThemedTextInputProps>(
  ({ style, lightColor, darkColor, ...otherProps }, ref) => {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
    const placeholderTextColor = useThemeColor({ light: '#A9A9A9', dark: '#D3D3D3' }, 'text');
    const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#333333' }, 'background');
    const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'border');

    return (
      <View style={[commonStyles.inputWrapper, style, { borderColor }]}>
        <TextInput ref={ref} style={[{ color, backgroundColor }, commonStyles.input]} placeholderTextColor={placeholderTextColor} {...otherProps} />
      </View>
    )
  }
)