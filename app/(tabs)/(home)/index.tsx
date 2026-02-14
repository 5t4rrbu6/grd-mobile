import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Search,
  MessageSquare,
  Calendar,
} from 'lucide-react-native';
import Colors from '@/constants/colors';
import Header from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { mockMessages } from '@/mocks/data';

export default function HomeScreen() {
  const router = useRouter();
  const { shiftStatus, checkIn, checkOut } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isCheckedIn = shiftStatus.status === 'checked_in';

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleCheckInOut = async () => {
    if (isCheckedIn) {
      await checkOut();
    } else {
      await checkIn('Factory');
    }
  };

  const handleProfilePress = () => {
    router.push('/profile');
  };

  return (
    <View style={styles.container}>
      <Header onProfilePress={handleProfilePress} />
      
      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.statusCard}>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Status</Text>
            <Text style={styles.statusValue}>
              {isCheckedIn ? 'Check in' : 'Not Checked In'}
            </Text>
          </View>
          {isCheckedIn ? (
            <>
              <View style={styles.statusRow}>
                <Text style={styles.statusLabel}>Lapangan</Text>
                <Text style={styles.statusValue}>{shiftStatus.site}</Text>
              </View>
              <View style={styles.statusRow}>
                <Text style={styles.statusLabel}>Waktu Check in</Text>
                <Text style={styles.statusValue}>{shiftStatus.checkInTime}</Text>
              </View>
              <View style={styles.statusRow}>
                <Text style={styles.statusLabel}>Waktu Check-out</Text>
                <Text style={styles.statusValue}>{shiftStatus.checkOutTime}</Text>
              </View>
              <View style={styles.statusRow}>
                <Text style={styles.statusLabel}>Tindakan Terakhir</Text>
                <Text style={styles.statusValue}>{shiftStatus.lastAction || '-'}</Text>
              </View>
            </>
          ) : (
            <>
              <View style={styles.statusRow}>
                <Text style={styles.statusLabel}>Next Shift Site</Text>
                <Text style={styles.statusValue}>{shiftStatus.nextShiftSite}</Text>
              </View>
              <View style={styles.statusRow}>
                <Text style={styles.statusLabel}>Shift Date and Time</Text>
                <Text style={styles.statusValue}>{shiftStatus.nextShiftDateTime}</Text>
              </View>
            </>
          )}
        </View>

        {!isCheckedIn && shiftStatus.nextShiftSite === 'No Site' && (
          <View style={styles.warningBanner}>
            <AlertTriangle color={Colors.text} size={20} />
            <View style={styles.warningContent}>
              <Text style={styles.warningTitle}>Check-in Required</Text>
              <Text style={styles.warningText}>
                You have to be checked in to be able to access this page
              </Text>
            </View>
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.checkButton,
            isCheckedIn ? styles.checkOutButton : styles.checkInButton,
          ]}
          onPress={handleCheckInOut}
          testID="check-in-out-button"
        >
          {isCheckedIn ? (
            <>
              <XCircle color={Colors.textLight} size={22} />
              <Text style={styles.checkButtonText}>Check-out</Text>
            </>
          ) : (
            <>
              <CheckCircle color={Colors.textLight} size={22} />
              <Text style={styles.checkButtonText}>Check In</Text>
            </>
          )}
        </TouchableOpacity>

        <View style={styles.messagesSection}>
          <View style={styles.messagesHeader}>
            <Text style={styles.messagesTitle}>Messages</Text>
            <View style={styles.searchContainer}>
              <Search color={Colors.textMuted} size={18} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search"
                placeholderTextColor={Colors.textMuted}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>

          <View style={styles.messagesList}>
            {mockMessages.length === 0 ? (
              <Text style={styles.noMessagesText}>No messages</Text>
            ) : (
              mockMessages.map((message) => (
                <TouchableOpacity key={message.id} style={styles.messageItem}>
                  <MessageSquare color={Colors.primary} size={20} />
                  <View style={styles.messageContent}>
                    <Text style={styles.messageSender}>{message.sender}</Text>
                    <Text style={styles.messageText} numberOfLines={1}>
                      {message.content}
                    </Text>
                  </View>
                  <Text style={styles.messageTime}>{message.timestamp}</Text>
                </TouchableOpacity>
              ))
            )}
          </View>
        </View>

        <View style={styles.quickLinks}>
          <TouchableOpacity style={styles.quickLink}>
            <MessageSquare color={Colors.primary} size={24} />
            <Text style={styles.quickLinkText}>Messages</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickLink}>
            <Calendar color={Colors.primary} size={24} />
            <Text style={styles.quickLinkText}>Roster</Text>
          </TouchableOpacity>
        </View>
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
  statusCard: {
    backgroundColor: Colors.surface,
    margin: 16,
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: Colors.secondary,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  statusLabel: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '600',
  },
  statusValue: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  warningBanner: {
    flexDirection: 'row',
    backgroundColor: Colors.warningLight,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.warning,
  },
  warningContent: {
    marginLeft: 12,
    flex: 1,
  },
  warningTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  warningText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  checkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 8,
    gap: 8,
  },
  checkInButton: {
    backgroundColor: Colors.secondary,
  },
  checkOutButton: {
    backgroundColor: Colors.dangerLight,
  },
  checkButtonText: {
    color: Colors.textLight,
    fontSize: 16,
    fontWeight: '600',
  },
  messagesSection: {
    marginTop: 24,
    marginHorizontal: 16,
  },
  messagesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  messagesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
  },
  messagesList: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    overflow: 'hidden',
  },
  noMessagesText: {
    padding: 20,
    textAlign: 'center',
    color: Colors.textMuted,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  messageContent: {
    flex: 1,
    marginLeft: 12,
  },
  messageSender: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  messageText: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  messageTime: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  quickLinks: {
    flexDirection: 'row',
    marginTop: 16,
    marginHorizontal: 16,
    marginBottom: 32,
    gap: 12,
  },
  quickLink: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: 14,
    borderRadius: 8,
    gap: 10,
  },
  quickLinkText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
  },
});
