import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  User,
  ChevronRight,
  CheckCircle,
  Footprints,
  FileText,
  QrCode,
  MessageSquare,
  Clock,
  TrendingUp,
  Key,
  Camera,
} from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';
import { mockUsageStats } from '@/mocks/data';

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft color={Colors.textLight} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile Information</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <User color={Colors.primary} size={60} />
            </View>
            <TouchableOpacity style={styles.cameraButton}>
              <Camera color={Colors.textLight} size={14} />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileName}>{user?.displayName} {user?.lastName}</Text>
          <Text style={styles.profileSubname}>{user?.displayName} {user?.lastName}</Text>
          <Text style={styles.profileEmail}>Email: {user?.email}</Text>
          <Text style={styles.profileGuardId}>Guard ID: {user?.guardId}</Text>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <User color={Colors.textMuted} size={18} />
            <Text style={styles.actionButtonText}>View Profile</Text>
            <ChevronRight color={Colors.textMuted} size={20} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/change-password')}
          >
            <Key color={Colors.textMuted} size={18} />
            <Text style={styles.actionButtonText}>Change Password</Text>
            <ChevronRight color={Colors.textMuted} size={20} />
          </TouchableOpacity>
        </View>

        <View style={styles.statsSection}>
          <View style={styles.statsHeader}>
            <TrendingUp color={Colors.text} size={18} />
            <Text style={styles.statsTitle}>Usage Stats</Text>
          </View>
          <View style={styles.statsCard}>
            <View style={styles.statItem}>
              <CheckCircle color={Colors.success} size={16} />
              <Text style={styles.statLabel}>Check-ins</Text>
              <Text style={styles.statValue}>{mockUsageStats.checkIns}</Text>
            </View>
            <View style={styles.statItem}>
              <Footprints color={Colors.primary} size={16} />
              <Text style={styles.statLabel}>Patrols completed</Text>
              <Text style={styles.statValue}>{mockUsageStats.patrolsCompleted}</Text>
            </View>
            <View style={styles.statItem}>
              <FileText color={Colors.info} size={16} />
              <Text style={styles.statLabel}>Reports sent</Text>
              <Text style={styles.statValue}>{mockUsageStats.reportsSent}</Text>
            </View>
            <View style={styles.statItem}>
              <QrCode color={Colors.warning} size={16} />
              <Text style={styles.statLabel}>Checkpoints scanned</Text>
              <Text style={styles.statValue}>{mockUsageStats.checkpointsScanned}</Text>
            </View>
            <View style={styles.statItem}>
              <MessageSquare color={Colors.secondary} size={16} />
              <Text style={styles.statLabel}>Message sent</Text>
              <Text style={styles.statValue}>{mockUsageStats.messagesSent}</Text>
            </View>
            <View style={styles.statItem}>
              <Clock color={Colors.textMuted} size={16} />
              <Text style={styles.statLabel}>Hours worked</Text>
              <Text style={styles.statValue}>{mockUsageStats.hoursWorked}</Text>
            </View>
            <View style={styles.statItem}>
              <Clock color={Colors.textMuted} size={16} />
              <Text style={styles.statLabel}>OTalk Usage Last Month (MB)</Text>
              <Text style={styles.statValue}>{mockUsageStats.otalkUsageLastMonth}</Text>
            </View>
            <View style={styles.statItem}>
              <Clock color={Colors.textMuted} size={16} />
              <Text style={styles.statLabel}>OTalk Usage This Month (MB)</Text>
              <Text style={styles.statValue}>{mockUsageStats.otalkUsageThisMonth}</Text>
            </View>
          </View>
        </View>

        <View style={{ height: insets.bottom + 32 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.headerBackground,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textLight,
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: Colors.primaryLight,
  },
  cameraButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 2,
  },
  profileSubname: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  profileGuardId: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  actionButtons: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  actionButtonText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: Colors.text,
  },
  statsSection: {
    marginHorizontal: 16,
  },
  statsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  statsCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: Colors.secondary,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  statLabel: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: Colors.text,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
});
