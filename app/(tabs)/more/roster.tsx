import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Clock,
  ChevronDown,
  User,
  Footprints,
  Filter,
} from 'lucide-react-native';
import Colors from '@/constants/colors';
import Header from '@/components/Header';
import { mockSchedules } from '@/mocks/data';

export default function RosterScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleProfilePress = () => {
    router.push('/profile');
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
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
        <View style={styles.filterBar}>
          <Text style={styles.title}>Jadwal</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Minggu Ini</Text>
            <Filter color={Colors.textMuted} size={18} />
          </TouchableOpacity>
        </View>

        <View style={styles.tableHeader}>
          <Text style={[styles.headerCell, styles.cellLocation]}>Lapangan / Tanggal</Text>
          <Text style={[styles.headerCell, styles.cellTime]}>Shift Dimulai</Text>
          <Text style={[styles.headerCell, styles.cellDuration]}>Durasi</Text>
        </View>

        <View style={styles.scheduleList}>
          {mockSchedules.map((schedule) => (
            <TouchableOpacity
              key={schedule.id}
              style={styles.scheduleCard}
              onPress={() => toggleExpand(schedule.id)}
            >
              <View style={styles.scheduleMain}>
                <View style={styles.scheduleInfo}>
                  <Text style={styles.customerSite}>
                    {schedule.customer} : {schedule.site}
                  </Text>
                  <View style={styles.shiftRow}>
                    <Clock color={Colors.primary} size={14} />
                    <Text style={styles.shiftType}>{schedule.shiftType}</Text>
                  </View>
                  <Text style={styles.scheduleDate}>{schedule.date}</Text>
                </View>
                <View style={styles.scheduleTime}>
                  <Text style={styles.timeText}>{schedule.startTime}</Text>
                </View>
                <View style={styles.scheduleDuration}>
                  <Text style={styles.durationText}>{schedule.duration}</Text>
                </View>
                <View style={styles.scheduleIcons}>
                  {schedule.isAssigned && <User color={Colors.primary} size={18} />}
                  {schedule.isActive && <Footprints color={Colors.success} size={18} />}
                  <ChevronDown color={Colors.textMuted} size={20} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

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
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  filterText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerCell: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  cellLocation: {
    flex: 2,
  },
  cellTime: {
    flex: 1,
    textAlign: 'center',
  },
  cellDuration: {
    flex: 1,
    textAlign: 'center',
  },
  scheduleList: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  scheduleCard: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    marginBottom: 8,
    padding: 14,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
  scheduleMain: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scheduleInfo: {
    flex: 2,
  },
  customerSite: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  shiftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  shiftType: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  scheduleDate: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  scheduleTime: {
    flex: 1,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
    color: Colors.text,
  },
  scheduleDuration: {
    flex: 1,
    alignItems: 'center',
  },
  durationText: {
    fontSize: 14,
    color: Colors.text,
  },
  scheduleIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginLeft: 8,
  },
});
