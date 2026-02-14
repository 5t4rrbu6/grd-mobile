import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
  Switch,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Settings,
  LogOut,
  FileText,
  HelpCircle,
  Info,
  Moon,
  Languages,
  ClipboardList,
  ChevronDown,
  ChevronUp,
  Check,
} from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.75;

type Language = 'en' | 'id';

const languages = [
  { code: 'en' as Language, label: 'English', flag: '🇺🇸' },
  { code: 'id' as Language, label: 'Indonesia', flag: '🇮🇩' },
];

export default function Drawer() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { drawerOpen, closeDrawer, logout, settings, updateSettings } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);

  const currentLanguage = languages.find(l => l.code === (settings.language || 'en')) || languages[0];

  const handleNavigation = (route: string) => {
    closeDrawer();
    router.push(route as any);
  };

  const handleLogout = async () => {
    closeDrawer();
    await logout();
  };

  const handleLanguageSelect = (langCode: Language) => {
    updateSettings({ language: langCode });
    setLanguageDropdownOpen(false);
  };

  const menuItems = [
    { icon: ClipboardList, label: 'Operating Procedures', onPress: () => {} },
    { icon: Languages, label: 'Change Language', onPress: () => setLanguageDropdownOpen(!languageDropdownOpen), isLanguage: true },
    { icon: Settings, label: 'Settings', onPress: () => handleNavigation('/(tabs)/more/settings') },
    { icon: Moon, label: 'Dark Mode', toggle: true },
    { icon: LogOut, label: 'Logout', onPress: handleLogout },
    { icon: FileText, label: 'Terms of Service', onPress: () => {} },
    { icon: HelpCircle, label: 'Frequently Asked Questions', onPress: () => {} },
    { icon: Info, label: 'About', onPress: () => {} },
  ];

  return (
    <Modal
      visible={drawerOpen}
      transparent
      animationType="fade"
      onRequestClose={closeDrawer}
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} onPress={closeDrawer} activeOpacity={1} />
        <Animated.View style={[styles.drawer, { paddingTop: insets.top }]}>
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <View style={styles.logoPlaceholder}>
                <Text style={styles.logoText}>T.A.G.S</Text>
              </View>
              <Text style={styles.companySubtext}>PT. TUNAS ARTHA GARDATAMA SEKURITI</Text>
            </View>
          </View>

          <View style={styles.menuContainer}>
            {menuItems.map((item, index) => (
              <View key={index}>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={item.onPress}
                  disabled={item.toggle}
                >
                  <item.icon color={Colors.primary} size={22} />
                  <Text style={styles.menuLabel}>{item.label}</Text>
                  {item.toggle && (
                    <Switch
                      value={darkMode}
                      onValueChange={setDarkMode}
                      trackColor={{ false: '#E0E0E0', true: Colors.primary }}
                      thumbColor={darkMode ? Colors.warning : '#f4f3f4'}
                    />
                  )}
                  {item.isLanguage && (
                    <View style={styles.languageIndicator}>
                      <Text style={styles.currentLangFlag}>{currentLanguage.flag}</Text>
                      {languageDropdownOpen ? (
                        <ChevronUp color={Colors.textSecondary} size={18} />
                      ) : (
                        <ChevronDown color={Colors.textSecondary} size={18} />
                      )}
                    </View>
                  )}
                </TouchableOpacity>
                {item.isLanguage && languageDropdownOpen && (
                  <View style={styles.languageDropdown}>
                    {languages.map((lang) => (
                      <TouchableOpacity
                        key={lang.code}
                        style={[
                          styles.languageOption,
                          currentLanguage.code === lang.code && styles.languageOptionActive,
                        ]}
                        onPress={() => handleLanguageSelect(lang.code)}
                      >
                        <Text style={styles.languageFlag}>{lang.flag}</Text>
                        <Text style={[
                          styles.languageLabel,
                          currentLanguage.code === lang.code && styles.languageLabelActive,
                        ]}>
                          {lang.label}
                        </Text>
                        {currentLanguage.code === lang.code && (
                          <Check color={Colors.primary} size={18} />
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>

          <View style={styles.footer}>
            <Text style={styles.missingFeatures}>Missing Features</Text>
            <TouchableOpacity style={styles.feedbackButton}>
              <View style={styles.feedbackIcon}>
                <Text style={styles.feedbackIconText}>!</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  drawer: {
    width: DRAWER_WIDTH,
    backgroundColor: Colors.surface,
    height: '100%',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoPlaceholder: {
    width: 120,
    height: 60,
    backgroundColor: Colors.background,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  companySubtext: {
    fontSize: 10,
    color: Colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  menuContainer: {
    flex: 1,
    paddingTop: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  menuLabel: {
    flex: 1,
    marginLeft: 16,
    fontSize: 15,
    color: Colors.text,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  missingFeatures: {
    color: Colors.danger,
    fontSize: 14,
    fontWeight: '500',
  },
  feedbackButton: {
    marginTop: 8,
  },
  feedbackIcon: {
    width: 32,
    height: 32,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedbackIconText: {
    color: Colors.danger,
    fontSize: 18,
    fontWeight: 'bold',
  },
  languageIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  currentLangFlag: {
    fontSize: 16,
  },
  languageDropdown: {
    backgroundColor: Colors.background,
    marginHorizontal: 20,
    marginLeft: 58,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 4,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  languageOptionActive: {
    backgroundColor: Colors.primaryLight,
  },
  languageFlag: {
    fontSize: 18,
    marginRight: 12,
  },
  languageLabel: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
  },
  languageLabelActive: {
    color: Colors.primary,
    fontWeight: '600',
  },
});
