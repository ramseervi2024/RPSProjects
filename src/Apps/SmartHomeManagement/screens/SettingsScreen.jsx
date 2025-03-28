import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Globe, Bell, Palette, User } from 'lucide-react-native';

export default function SettingsScreen() {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <View style={styles.settingItem}>
                    <Globe size={24} color="#007AFF" />
                    <Text style={styles.settingTitle}>{t('settings.language')}</Text>
                    <View style={styles.languageButtons}>
                        <TouchableOpacity
                            style={[styles.langButton, i18n.language === 'en' && styles.activeLang]}
                            onPress={() => changeLanguage('en')}>
                            <Text style={[styles.langText, i18n.language === 'en' && styles.activeLangText]}>EN</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity
                            style={[styles.langButton, i18n.language === 'es' && styles.activeLang]}
                            onPress={() => changeLanguage('es')}>
                            <Text style={[styles.langText, i18n.language === 'es' && styles.activeLangText]}>ES</Text>
                        </TouchableOpacity> */}

                        <TouchableOpacity
                            style={[styles.langButton, i18n.language === 'hi' && styles.activeLang]}
                            onPress={() => changeLanguage('hi')}>
                            <Text style={[styles.langText, i18n.language === 'hi' && styles.activeLangText]}>HI</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.langButton, i18n.language === 'kn' && styles.activeLang]}
                            onPress={() => changeLanguage('kn')}>
                            <Text style={[styles.langText, i18n.language === 'kn' && styles.activeLangText]}>KN</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity style={styles.settingItem}>
                    <Bell size={24} color="#FFB340" />
                    <Text style={styles.settingTitle}>{t('settings.notifications')}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingItem}>
                    <Palette size={24} color="#32ADE6" />
                    <Text style={styles.settingTitle}>{t('settings.theme')}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingItem}>
                    <User size={24} color="#FF375F" />
                    <Text style={styles.settingTitle}>{t('settings.profile')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
        padding: 20,
    },
    section: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    settingTitle: {
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
        color: '#1A1A1A',
        marginLeft: 12,
        flex: 1,
    },
    languageButtons: {
        flexDirection: 'row',
        gap: 8,
    },
    langButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        backgroundColor: '#F0F0F0',
    },
    activeLang: {
        backgroundColor: '#007AFF',
    },
    langText: {
        fontSize: 14,
        fontFamily: 'Inter_600SemiBold',
        color: '#666666',
    },
    activeLangText: {
        color: '#FFFFFF',
    },
});