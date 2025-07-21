import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet } from 'react-native';

interface GradientBackgroundProps {
  colors: string[];
  children: React.ReactNode;
}

export default function GradientBackground({ colors, children }: GradientBackgroundProps) {
  return (
    <LinearGradient colors={colors} style={styles.container}>
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});