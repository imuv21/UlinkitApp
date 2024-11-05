import { TouchableOpacity, Text, type TouchableOpacityProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { commonStyles } from '@/assets/commonStyles';

export type ThemedTouchableOpacityProps = TouchableOpacityProps & {
    lightColor?: string;
    darkColor?: string;
    text?: string;
    textStyle?: object;
};

export function ThemedButton({ style, lightColor, darkColor, text, textStyle, ...otherProps }: ThemedTouchableOpacityProps) {

    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'tint');

    return (
        <TouchableOpacity style={[{ backgroundColor }, style]} {...otherProps}>
            {text && <Text style={[textStyle]}>{text}</Text>}
        </TouchableOpacity>
    );
}
