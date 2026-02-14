import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Settings,
  Calendar,
  MessageSquare,
  User,
  ChevronRight,
  FileText,
  HelpCircle,
  Info,
  LogOut,
} from 'lucide-react-native';
import Colors from '@/constants/colors';
import Header from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';

export default function MoreScreen() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleProfilePress = () => {
    router.push('/profile');
  };

  const handleLogout = async () => {
    await logout();
  };

  const menuItems = [
    {
      icon: User,
      label: 'Profile',
      onPress: () => router.push('/profile'),
    },
    {
      icon: Calendar,
      label: 'Roster / Schedule',
      onPress: () => router.push('/(tabs)/more/roster'),
    },
    {
      icon: MessageSquare,
      label: 'Messages',
      onPress: () => {},
    },
    {
      icon: Settings,
      label: 'Settings',
      onPress: () => router.push('/(tabs)/more/settings'),
    },
    {
      icon: FileText,
      label: 'Operating Procedures',
      onPress: () => {},
    },
    {
      icon: HelpCircle,
      label: 'FAQ',
      onPress: () => {},
    },
    {
      icon: Info,
      label: 'About',
      onPress: () => {},
    },
  ];

  return (
    <View style={styles.container}>
      <Header onProfilePress={handleProfilePress} />
      
      <ScrollView style={styles.content}>
        <Text style={styles.title}>More</Text>

        <View style={styles.menuList}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={styles.menuIcon}>
                <item.icon color={Colors.primary} size={22} />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <ChevronRight color={Colors.textMuted} size={20} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut color={Colors.danger} size={22} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text,
    padding: 16,
  },
  menuList: {
    backgroundColor: Colors.surface,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    color: Colors.text,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
    marginHorizontal: 16,
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 10,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.danger,
  },
});
