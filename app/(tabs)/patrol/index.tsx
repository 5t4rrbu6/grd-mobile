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
  Play,
  Square,
  Footprints,
  Clock,
  Grid3X3,
  Hand,
} from 'lucide-react-native';
import Colors from '@/constants/colors';
import Header from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { mockPatrols, mockCheckpoints } from '@/mocks/data';

export default function PatrolScreen() {
  const router = useRouter();
  const { shiftStatus } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [activePatrol, setActivePatrol] = useState(mockPatrols[0]);
  const [selectedCheckpoint, setSelectedCheckpoint] = useState(mockCheckpoints[0]);

  

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleProfilePress = () => {
    router.push('/profile');
  };

  const togglePatrol = (patrol: typeof mockPatrols[0]) => {
    setActivePatrol(patrol);
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
            <Text style={styles.statusLabel}>Lapangan</Text>
            <Text style={styles.statusValue}>{shiftStatus.site || 'Factory'}</Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Patroli Aktif</Text>
            <Text style={styles.statusValue}>
              {activePatrol?.name} ({activePatrol?.isStarted ? '09:33' : '-'})
            </Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Jenis</Text>
            <Text style={styles.statusValue}>Diperintahkan</Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Checkpoint Dipindai</Text>
            <Text style={styles.statusValue}>0</Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Tersisa</Text>
            <Text style={styles.statusValue}>{mockCheckpoints.length}</Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Checkpoint Berikutnya</Text>
            <Text style={styles.statusValue}>{selectedCheckpoint?.name}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Footprints color={Colors.primary} size={20} />
            <Text style={styles.sectionTitle}>Patroli-Patroli</Text>
          </View>

          {mockPatrols.map((patrol) => (
            <View key={patrol.id} style={styles.patrolCard}>
              <View style={styles.patrolInfo}>
                <Text style={styles.patrolName}>{patrol.name}</Text>
                <View style={styles.patrolMeta}>
                  <Grid3X3 color={Colors.textMuted} size={14} />
                  <Text style={styles.patrolMetaText}>{patrol.checkpointCount}</Text>
                  <Text style={styles.patrolMetaText}>{patrol.schedule}</Text>
                  <Clock color={Colors.textMuted} size={14} />
                  <Text style={styles.patrolMetaText}>{patrol.timeConstraint}</Text>
                  <Footprints 
                    color={patrol.isActive ? Colors.secondary : Colors.primary} 
                    size={16} 
                  />
                </View>
              </View>
              <TouchableOpacity
                style={[
                  styles.patrolButton,
                  patrol.isStarted ? styles.stopButton : styles.startButton,
                ]}
                onPress={() => togglePatrol(patrol)}
              >
                {patrol.isStarted ? (
                  <Square color={Colors.textLight} size={18} fill={Colors.textLight} />
                ) : (
                  <Play color={Colors.textLight} size={18} fill={Colors.textLight} />
                )}
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.checkpointHeader}>
            <Grid3X3 color={Colors.text} size={18} />
            <Text style={styles.checkpointTitle}>
              {activePatrol?.name} Checkpoint-Check Point: ({mockCheckpoints.length})
            </Text>
            <Text style={styles.checkpointSubtitle}>(Pindai Berurutan)</Text>
          </View>

          {mockCheckpoints.map((checkpoint) => (
            <TouchableOpacity
              key={checkpoint.id}
              style={styles.checkpointItem}
              onPress={() => setSelectedCheckpoint(checkpoint)}
            >
              <Text style={styles.checkpointName}>{checkpoint.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.actionSection}>
          <TouchableOpacity style={styles.scanButton}>
            <Grid3X3 color={Colors.textLight} size={20} />
            <Text style={styles.scanButtonText}>Pindai Checkpoint</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.handButton}>
            <Hand color={Colors.text} size={24} />
          </TouchableOpacity>
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
  statusCard: {
    backgroundColor: Colors.surface,
    margin: 16,
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
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
  section: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  patrolCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: 14,
    borderRadius: 8,
    marginBottom: 8,
  },
  patrolInfo: {
    flex: 1,
  },
  patrolName: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 6,
  },
  patrolMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  patrolMetaText: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  patrolButton: {
    width: 44,
    height: 32,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButton: {
    backgroundColor: Colors.secondary,
  },
  stopButton: {
    backgroundColor: Colors.danger,
  },
  checkpointHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  checkpointTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  checkpointSubtitle: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  checkpointItem: {
    backgroundColor: Colors.surface,
    padding: 14,
    borderRadius: 8,
    marginBottom: 6,
    borderLeftWidth: 3,
    borderLeftColor: Colors.border,
  },
  checkpointName: {
    fontSize: 14,
    color: Colors.text,
  },
  actionSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
    gap: 12,
  },
  scanButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.danger,
    paddingVertical: 14,
    borderRadius: 8,
    gap: 8,
  },
  scanButtonText: {
    color: Colors.textLight,
    fontSize: 15,
    fontWeight: '600',
  },
  handButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
});
