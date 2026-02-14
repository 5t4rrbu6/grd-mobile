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
  AlertTriangle,
  AlertCircle,
  Info,
  Bell,
  CheckCircle,
} from 'lucide-react-native';
import Colors from '@/constants/colors';
import Header from '@/components/Header';
import { mockAlerts } from '@/mocks/data';

export default function AlertScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [alerts, setAlerts] = useState(mockAlerts);

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
      case 'critical':
        return <AlertCircle color={Colors.danger} size={22} />;
      case 'high':
        return <AlertTriangle color={Colors.warning} size={22} />;
      case 'medium':
        return <Info color={Colors.info} size={22} />;
      default:
        return <Bell color={Colors.textMuted} size={22} />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return Colors.danger;
      case 'high':
        return Colors.warning;
      case 'medium':
        return Colors.info;
      default:
        return Colors.textMuted;
    }
  };

  const markAsRead = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, isRead: true } : alert
    ));
  };

  const unreadCount = alerts.filter(a => !a.isRead).length;

  return (
    <View style={styles.container}>
      <Header onProfilePress={handleProfilePress} />
      
      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <Text style={styles.title}>Alerts</Text>
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          )}
        </View>

        {alerts.length === 0 ? (
          <View style={styles.emptyState}>
            <Bell color={Colors.textMuted} size={48} />
            <Text style={styles.emptyText}>No alerts at this time</Text>
          </View>
        ) : (
          <View style={styles.alertsList}>
            {alerts.map((alert) => (
              <TouchableOpacity
                key={alert.id}
                style={[
                  styles.alertCard,
                  !alert.isRead && styles.alertUnread,
                  { borderLeftColor: getSeverityColor(alert.severity) },
                ]}
                onPress={() => markAsRead(alert.id)}
              >
                <View style={styles.alertIcon}>
                  {getSeverityIcon(alert.severity)}
                </View>
                <View style={styles.alertContent}>
                  <View style={styles.alertHeader}>
                    <Text style={styles.alertTitle}>{alert.title}</Text>
                    <Text style={styles.alertTime}>{alert.timestamp}</Text>
                  </View>
                  <Text style={styles.alertDescription}>{alert.description}</Text>
                  {alert.site && (
                    <Text style={styles.alertSite}>Site: {alert.site}</Text>
                  )}
                </View>
                {alert.isRead && (
                  <CheckCircle color={Colors.success} size={18} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text,
  },
  badge: {
    backgroundColor: Colors.danger,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  badgeText: {
    color: Colors.textLight,
    fontSize: 12,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: Colors.textMuted,
  },
  alertsList: {
    paddingHorizontal: 16,
  },
  alertCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.surface,
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
  },
  alertUnread: {
    backgroundColor: '#F8F9FA',
  },
  alertIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  alertContent: {
    flex: 1,
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  alertTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
  },
  alertTime: {
    fontSize: 12,
    color: Colors.textMuted,
    marginLeft: 8,
  },
  alertDescription: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  alertSite: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 6,
  },
});
