import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Menu, User } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';

interface HeaderProps {
  showMenu?: boolean;
  onProfilePress?: () => void;
}

export default function Header({ showMenu = true, onProfilePress }: HeaderProps) {
  const insets = useSafeAreaInsets();
  const { user, toggleDrawer } = useAuth();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.content}>
        {showMenu && (
          <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton} testID="menu-button">
            <Menu color={Colors.textLight} size={24} />
          </TouchableOpacity>
        )}
        
        <View style={styles.statusContainer}>
          <View style={styles.onlineBadge}>
            <Text style={styles.onlineText}>Online</Text>
            <View style={styles.onlineCount}>
              <Text style={styles.onlineCountText}>0</Text>
            </View>
          </View>
          <Text style={styles.userName} numberOfLines={1}>
            {user?.displayName || 'User'}
          </Text>
        </View>

        <TouchableOpacity onPress={onProfilePress} style={styles.profileButton} testID="profile-button">
          <View style={styles.avatarContainer}>
            <User color={Colors.primary} size={28} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.headerBackground,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  menuButton: {
    padding: 8,
  },
  statusContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  onlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.statusOnline,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  onlineText: {
    color: Colors.textLight,
    fontSize: 12,
    fontWeight: '600',
  },
  onlineCount: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginLeft: 6,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 10,
  },
  onlineCountText: {
    color: Colors.textLight,
    fontSize: 11,
    fontWeight: '600',
  },
  userName: {
    color: Colors.textLight,
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 12,
    flex: 1,
  },
  profileButton: {
    padding: 4,
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.primaryLight,
  },
});
