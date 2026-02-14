import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Clock,
  Trash2,
  MessageSquare,
  Bell,
  ChevronRight,
  Check,
  Globe,
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import Header from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { refreshIntervalOptions, messageRetentionOptions, languageOptions } from '@/mocks/data';

export default function SettingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { settings, updateSettings } = useAuth();
  const [showIntervalModal, setShowIntervalModal] = useState<'reports' | 'roster' | null>(null);
  const [showRetentionModal, setShowRetentionModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  

  const handleProfilePress = () => {
    router.push('/profile');
  };

  const formatInterval = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    return `${minutes / 60} hours`;
  };

  const handleClearCache = (type: 'reports' | 'images') => {
    Alert.alert(
      `Clear ${type === 'reports' ? 'Reports' : 'Images'} Cached`,
      `Are you sure you want to clear all cached ${type}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => console.log(`Cleared ${type} cache`) },
      ]
    );
  };

  const IntervalModal = ({ type }: { type: 'reports' | 'roster' }) => {
    const options = type === 'reports' ? refreshIntervalOptions.reports : refreshIntervalOptions.roster;
    const currentValue = type === 'reports' ? settings.reportsRefreshInterval : settings.rosterRefreshInterval;
    const title = type === 'reports' ? 'Reports Refresh Interval' : 'Roster Refresh Interval';

    return (
      <Modal visible={showIntervalModal === type} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { paddingBottom: insets.bottom + 16 }]}>
            <Text style={styles.modalTitle}>{title}</Text>
            {options.map((minutes) => (
              <TouchableOpacity
                key={minutes}
                style={styles.modalOption}
                onPress={() => {
                  updateSettings({ [type === 'reports' ? 'reportsRefreshInterval' : 'rosterRefreshInterval']: minutes });
                  setShowIntervalModal(null);
                }}
              >
                {currentValue === minutes && <Check color={Colors.primary} size={20} />}
                <Text style={[styles.modalOptionText, currentValue === minutes && styles.modalOptionActive]}>
                  {formatInterval(minutes)}
                </Text>
              </TouchableOpacity>
            ))}
            <Text style={styles.modalHint}>
              {type === 'reports' 
                ? 'The patrol reports on the Home page and on the Reports page will be automatically updated periodically according to this selected refresh interval'
                : 'Your work schedule on the Roster page will be automatically updated periodically according to this selected refresh interval'}
            </Text>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <Header onProfilePress={handleProfilePress} />
      
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Settings</Text>

        <View style={styles.settingsList}>
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => setShowIntervalModal('reports')}
          >
            <View style={styles.settingIcon}>
              <Clock color={Colors.textMuted} size={20} />
            </View>
            <Text style={styles.settingLabel}>Reports Refresh Interval</Text>
            <Text style={styles.settingValue}>{settings.reportsRefreshInterval} min</Text>
            <ChevronRight color={Colors.textMuted} size={20} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => setShowIntervalModal('roster')}
          >
            <View style={styles.settingIcon}>
              <Clock color={Colors.textMuted} size={20} />
            </View>
            <Text style={styles.settingLabel}>Roster Refresh Interval</Text>
            <Text style={styles.settingValue}>{settings.rosterRefreshInterval} min</Text>
            <ChevronRight color={Colors.textMuted} size={20} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => handleClearCache('reports')}
          >
            <View style={styles.settingIcon}>
              <Trash2 color={Colors.textMuted} size={20} />
            </View>
            <Text style={styles.settingLabel}>Clear Reports Cached</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => handleClearCache('images')}
          >
            <View style={styles.settingIcon}>
              <Trash2 color={Colors.textMuted} size={20} />
            </View>
            <Text style={styles.settingLabel}>Clear Images Cached</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => setShowRetentionModal(true)}
          >
            <View style={styles.settingIcon}>
              <MessageSquare color={Colors.textMuted} size={20} />
            </View>
            <Text style={styles.settingLabel}>Message Retention</Text>
            <Text style={styles.settingValue}>{settings.messageRetention} days</Text>
            <ChevronRight color={Colors.textMuted} size={20} />
          </TouchableOpacity>

          <View style={styles.settingItem}>
            <View style={styles.settingIcon}>
              <Bell color={Colors.textMuted} size={20} />
            </View>
            <Text style={styles.settingLabel}>Message Notifications</Text>
            <Text style={styles.settingValue}>{settings.messageNotifications ? 'On' : 'Off'}</Text>
            <Switch
              value={settings.messageNotifications}
              onValueChange={(value) => updateSettings({ messageNotifications: value })}
              trackColor={{ false: Colors.border, true: Colors.primary }}
            />
          </View>

          <TouchableOpacity 
            style={[styles.settingItem, { borderBottomWidth: 0 }]}
            onPress={() => setShowLanguageModal(true)}
          >
            <View style={styles.settingIcon}>
              <Globe color={Colors.textMuted} size={20} />
            </View>
            <Text style={styles.settingLabel}>Language</Text>
            <Text style={styles.settingValue}>
              {languageOptions.find(l => l.code === settings.language)?.label || 'English'}
            </Text>
            <ChevronRight color={Colors.textMuted} size={20} />
          </TouchableOpacity>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>

      <IntervalModal type="reports" />
      <IntervalModal type="roster" />

      <Modal visible={showRetentionModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { paddingBottom: insets.bottom + 16 }]}>
            <Text style={styles.modalTitle}>Message Retention</Text>
            {messageRetentionOptions.map((days) => (
              <TouchableOpacity
                key={days}
                style={styles.modalOption}
                onPress={() => {
                  updateSettings({ messageRetention: days });
                  setShowRetentionModal(false);
                }}
              >
                {settings.messageRetention === days && <Check color={Colors.primary} size={20} />}
                <Text style={[styles.modalOptionText, settings.messageRetention === days && styles.modalOptionActive]}>
                  {days} {days === 1 ? 'day' : 'days'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      <Modal visible={showLanguageModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { paddingBottom: insets.bottom + 16 }]}>
            <Text style={styles.modalTitle}>Language</Text>
            {languageOptions.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={styles.modalOption}
                onPress={() => {
                  updateSettings({ language: lang.code });
                  setShowLanguageModal(false);
                }}
              >
                {settings.language === lang.code && <Check color={Colors.primary} size={20} />}
                <Text style={[styles.modalOptionText, settings.language === lang.code && styles.modalOptionActive]}>
                  {lang.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
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
  settingsList: {
    backgroundColor: Colors.surface,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  settingLabel: {
    flex: 1,
    fontSize: 15,
    color: Colors.text,
  },
  settingValue: {
    fontSize: 14,
    color: Colors.textMuted,
    marginRight: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 16,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: Colors.background,
    borderRadius: 8,
    marginBottom: 8,
    gap: 10,
  },
  modalOptionText: {
    fontSize: 15,
    color: Colors.text,
  },
  modalOptionActive: {
    fontWeight: '600',
    color: Colors.primary,
  },
  modalHint: {
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 12,
    lineHeight: 18,
  },
});
