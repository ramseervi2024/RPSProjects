import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, Factory } from 'lucide-react-native';

export default function SettingsScreen() {
  const { theme, themeName, setThemeName } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      padding: 16,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 16,
    },
    themeContainer: {
      flexDirection: 'row',
      gap: 12,
    },
    themeButton: {
      flex: 1,
      backgroundColor: theme.card,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      borderWidth: 2,
      borderColor: 'transparent',
    },
    activeTheme: {
      borderColor: theme.primary,
    },
    themeText: {
      color: theme.text,
      marginTop: 8,
      fontSize: 16,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Theme</Text>
        <View style={styles.themeContainer}>
          <Pressable
            style={[
              styles.themeButton,
              themeName === 'light' && styles.activeTheme,
            ]}
            onPress={() => setThemeName('light')}>
            <Sun size={24} color={theme.primary} />
            <Text style={styles.themeText}>Light</Text>
          </Pressable>

          <Pressable
            style={[
              styles.themeButton,
              themeName === 'dark' && styles.activeTheme,
            ]}
            onPress={() => setThemeName('dark')}>
            <Moon size={24} color={theme.primary} />
            <Text style={styles.themeText}>Dark</Text>
          </Pressable>

          <Pressable
            style={[
              styles.themeButton,
              themeName === 'industrial' && styles.activeTheme,
            ]}
            onPress={() => setThemeName('industrial')}>
            <Factory size={24} color={theme.primary} />
            <Text style={styles.themeText}>Industrial</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}