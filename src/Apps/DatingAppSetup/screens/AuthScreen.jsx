import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import { Heart } from 'lucide-react-native';

export default function AuthScreen() {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
        },
        gradient: {
            flex: 1,
            //   padding: 20,
            alignItems: 'center',
            justifyContent: 'center',
        },
        logo: {
            marginBottom: 40,
            alignItems: 'center',
        },
        title: {
            fontSize: 32,
            fontFamily: isRTL ? 'Cairo-Bold' : 'Inter-Bold',
            color: '#fff',
            marginTop: 16,
            textAlign: isRTL ? 'right' : 'left',
        },
        input: {
            width: '100%',
            height: 50,
            backgroundColor: 'rgba(255,255,255,0.9)',
            borderRadius: 10,
            marginBottom: 16,
            paddingHorizontal: 16,
            fontFamily: isRTL ? 'Cairo-Regular' : 'Inter-Regular',
            textAlign: isRTL ? 'right' : 'left',
        },
        button: {
            width: '100%',
            height: 50,
            backgroundColor: '#FF4B6E',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 16,
        },
        buttonText: {
            color: '#fff',
            fontSize: 18,
            fontFamily: isRTL ? 'Cairo-Bold' : 'Inter-Bold',
        },
        languageButton: {
            position: 'absolute',
            top: 40,
            right: isRTL ? undefined : 20,
            left: isRTL ? 20 : undefined,
            backgroundColor: 'rgba(255,255,255,0.2)',
            padding: 10,
            borderRadius: 8,
            marginTop:30
        },
        languageText: {
            color: '#fff',
            fontFamily: isRTL ? 'Cairo-Regular' : 'Inter-Regular',
        },
    });

    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en');
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#FF4B6E', '#FF8A71']}
                style={styles.gradient}
            >
                <TouchableOpacity
                    style={styles.languageButton}
                    onPress={toggleLanguage}
                >
                    <Text style={styles.languageText}>
                        {i18n.language === 'en' ? 'العربية' : 'English'}
                    </Text>
                </TouchableOpacity>
                <View style={{ width: '80%' }}>
                    <View style={styles.logo}>
                        <Heart size={64} color="#fff" />
                        <Text style={styles.title}>{t('common.appName')}</Text>
                    </View>

                    <TextInput
                        style={styles.input}
                        placeholder={t('auth.email')}
                        placeholderTextColor="#666"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder={t('auth.password')}
                        placeholderTextColor="#666"
                        secureTextEntry
                    />

                    <View href="/(tabs)" asChild>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>{t('auth.signIn')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
}