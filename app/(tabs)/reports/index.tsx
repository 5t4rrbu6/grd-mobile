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
  CheckCircle,
  Info,
  AlertTriangle,
  AlertCircle,
  Image as ImageIcon,
  Filter,
  CheckCheck,
} from 'lucide-react-native';
import Colors from '@/constants/colors';
import Header from '@/components/Header';
import { mockReports } from '@/mocks/data';

export default function ReportsScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedSite] = useState('Factory');

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleProfilePress = () => {
    router.push('/profile');
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'normal':
        return <CheckCircle color={Colors.success} size={20} />;
      case 'info':
        return <Info color={Colors.info} size={20} />;
      case 'warning':
        return <AlertTriangle color={Colors.warning} size={20} />;
      case 'critical':
        return <AlertCircle color={Colors.danger} size={20} />;
      default:
        return <CheckCircle color={Colors.success} size={20} />;
    }
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
          <View style={styles.filterLeft}>
            <Text style={styles.filterLabel}>Laporan</Text>
            <TouchableOpacity style={styles.siteSelector}>
              <Text style={styles.siteName}>{selectedSite}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.filterRight}>
            <TouchableOpacity style={styles.filterButton}>
              <Filter color={Colors.textMuted} size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <CheckCheck color={Colors.textMuted} size={20} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.reportsList}>
          {mockReports.map((report) => (
            <TouchableOpacity key={report.id} style={styles.reportCard}>
              <View style={styles.reportIcon}>
                {getSeverityIcon(report.severity)}
              </View>
              <View style={styles.reportContent}>
                <Text style={styles.reportGuard}>
                  {report.guardName} ({report.guardNickname})
                </Text>
                <Text style={styles.reportDescription}>{report.description}</Text>
              </View>
              <View style={styles.reportRight}>
                <Text style={styles.reportTime}>{report.timestamp}</Text>
                {report.hasImage && (
                  <ImageIcon color={Colors.textMuted} size={18} style={styles.imageIcon} />
                )}
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
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  filterLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  siteSelector: {
    backgroundColor: Colors.background,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  siteName: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  filterRight: {
    flexDirection: 'row',
    gap: 12,
  },
  filterButton: {
    padding: 8,
  },
  reportsList: {
    padding: 16,
  },
  reportCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.surface,
    padding: 14,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: Colors.border,
  },
  reportIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  reportContent: {
    flex: 1,
  },
  reportGuard: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  reportDescription: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  reportRight: {
    alignItems: 'flex-end',
  },
  reportTime: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  imageIcon: {
    marginTop: 6,
  },
});
