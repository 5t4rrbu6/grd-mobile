import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { User, Lock, Eye, EyeOff, LogIn } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    setIsLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        router.replace('/(tabs)/(home)');
      } else {
        Alert.alert('Error', 'Invalid credentials');
      }
    } catch {
      Alert.alert('Error', 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={[styles.content, { paddingTop: insets.top + 40 }]}>
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <View style={styles.orbitRing}>
              <View style={styles.orbitDot} />
              <View style={[styles.orbitDot, styles.orbitDot2]} />
              <View style={[styles.orbitDot, styles.orbitDot3]} />
            </View>
          </View>
          <Text style={styles.logoText}>orbit</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <User color={Colors.textSecondary} size={20} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email or Mobile number"
              placeholderTextColor={Colors.textMuted}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              testID="email-input"
            />
          </View>

          <View style={styles.inputContainer}>
            <Lock color={Colors.textSecondary} size={20} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={Colors.textMuted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              testID="password-input"
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeButton}
            >
              {showPassword ? (
                <EyeOff color={Colors.textSecondary} size={20} />
              ) : (
                <Eye color={Colors.textSecondary} size={20} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
          onPress={handleLogin}
          disabled={isLoading}
          testID="login-button"
        >
          {isLoading ? (
            <ActivityIndicator color={Colors.textLight} />
          ) : (
            <>
              <LogIn color={Colors.textLight} size={20} />
              <Text style={styles.loginButtonText}>Login</Text>
            </>
          )}
        </TouchableOpacity>

        <View style={styles.avatarIcon}>
          <View style={styles.avatarCircle}>
            <View style={styles.avatarFace}>
              <View style={styles.avatarEyes}>
                <View style={styles.avatarEye} />
                <View style={styles.avatarEye} />
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot password? Tap here</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.privacyLink}>
          <Text style={styles.privacyLinkText}>Privacy Policy</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>V1.0.0+139</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  orbitRing: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: Colors.primary,
    position: 'relative',
  },
  orbitDot: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
    top: -6,
    left: '50%',
    marginLeft: -6,
  },
  orbitDot2: {
    top: 'auto',
    bottom: 10,
    left: 0,
  },
  orbitDot3: {
    top: 'auto',
    bottom: 10,
    left: 'auto',
    right: 0,
  },
  logoText: {
    fontSize: 32,
    fontWeight: '300',
    color: Colors.primary,
    letterSpacing: 2,
  },
  formContainer: {
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    marginBottom: 24,
    paddingVertical: 8,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
    paddingVertical: 8,
  },
  eyeButton: {
    padding: 8,
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondary,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: Colors.textLight,
    fontSize: 18,
    fontWeight: '600',
  },
  avatarIcon: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 16,
  },
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 3,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarFace: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEyes: {
    flexDirection: 'row',
    gap: 8,
  },
  avatarEye: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
  },
  forgotPassword: {
    alignItems: 'center',
    marginBottom: 12,
  },
  forgotPasswordText: {
    color: Colors.primary,
    fontSize: 14,
  },
  privacyLink: {
    alignItems: 'center',
    marginBottom: 8,
  },
  privacyLinkText: {
    color: Colors.primary,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  versionText: {
    textAlign: 'center',
    color: Colors.primary,
    fontSize: 12,
  },
});
