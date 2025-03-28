import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Globe, Moon, Bell, Info } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

const locale = 'en'
export default function SettingsScreen() {
    const { t, i18n } = useTranslation();

    const toggleLanguage = () => {
        i18n.changeLanguage('en');
    };

    const settingsItems = [
        { icon: Globe, title: t('settings.language'), onPress: toggleLanguage, value: locale === 'en' ? 'English' : 'العربية' },
        { icon: Moon, title: t('settings.theme'), value: 'Light' },
        { icon: Bell, title: t('settings.notifications'), value: 'On' },
        { icon: Info, title: t('settings.about'), value: 'v1.0.0' },
    ];

    return (
        <View style={styles.container}>
            {settingsItems.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.settingItem}
                    onPress={item.onPress}>
                    <View style={styles.settingLeft}>
                        <item.icon size={24} color="#1A1A1A" />
                        <Text style={[styles.settingTitle, { fontFamily: locale === 'ar' ? 'Cairo-Regular' : 'Inter-Regular' }]}>
                            {item.title}
                        </Text>
                    </View>
                    <Text style={[styles.settingValue, { fontFamily: locale === 'ar' ? 'Cairo-Regular' : 'Inter-Regular' }]}>
                        {item.value}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
        padding: 20,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingTitle: {
        fontSize: 16,
        color: '#1A1A1A',
        marginLeft: 12,
    },
    settingValue: {
        fontSize: 14,
        color: '#666',
    },
});