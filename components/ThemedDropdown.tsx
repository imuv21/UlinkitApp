import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, Modal, View, FlatList, ViewStyle } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

type DropdownItem = {
    label: string;
    value: string;
};

interface ThemedDropdownProps {
    label: string;
    data: DropdownItem[];
    onSelect: (item: DropdownItem) => void;
    selectedValue: string | null;
    style?: ViewStyle;
}

export const ThemedDropdown: React.FC<ThemedDropdownProps> = ({ label, data, onSelect, selectedValue, style }) => {

    const [isModalVisible, setModalVisible] = useState(false);
    const placeholderTextColor = useThemeColor({ light: '#A9A9A9', dark: '#D3D3D3' }, 'text');
    const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#333333' }, 'background');
    const borderColor = useThemeColor({ light: '#CCCCCC', dark: '#444444' }, 'border');

    const handleSelect = (item: DropdownItem) => {
        onSelect(item);
        setModalVisible(false);
    };

    return (
        <View style={[styles.dropCont, style]}>
            <TouchableOpacity style={[styles.dropdown, { backgroundColor: backgroundColor, borderColor: borderColor, borderWidth: 1 }]} onPress={() => setModalVisible(true)}>
                <Text style={{color: placeholderTextColor}}>{selectedValue || label}</Text>
            </TouchableOpacity>
            <Modal visible={isModalVisible} animationType="fade" transparent={true} onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalBackground}>
                    <ThemedView style={styles.modalContainer}>
                        <FlatList style={{ width: '100%' }} data={data} keyExtractor={(item) => item.value} renderItem={({ item }) => (
                            <TouchableOpacity style={styles.modalItem} onPress={() => handleSelect(item)}>
                                <ThemedText type='default'>{item.label}</ThemedText>
                            </TouchableOpacity>
                        )}
                        />
                    </ThemedView>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    dropCont: {
        width: '100%',
    },
    dropdown: {
        width: '100%',
        paddingLeft: 20,
        padding: 9,
        borderRadius: 8,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '90%',
        height: 400,
        padding: 20,
        overflow: 'scroll',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalItem: {
        width: '100%',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#444444',
    },
});
