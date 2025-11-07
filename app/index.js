import React, { useState, useCallback } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, RefreshControl, StyleSheet
} from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getSubscriptions } from '../utils/storage';
import { getDaysUntilDue } from '../utils/dateUtils';

export default function HomeScreen() {
  const router = useRouter();
  const [subscriptions, setSubscriptions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadSubscriptions = async () => {
    const data = await getSubscriptions();
    setSubscriptions(data);
  };

  useFocusEffect(useCallback(() => {
    loadSubscriptions();
  }, []));

  const getTotalMonthly = () => {
    return subscriptions
      .filter(sub => sub.status !== 'cancelled')
      .reduce((total, sub) => {
        const amt = Number(sub.amount) || 0;
        if (sub.periodicity === 'yearly') return total + amt / 12;
        if (sub.periodicity === 'quarterly') return total + amt / 3;
        return total + amt;
      }, 0).toFixed(2);
  };

  const renderItem = ({ item }) => {
    const days = getDaysUntilDue(item.dueDay);
    const statusColor = item.status === 'cancelled' ? '#6B7280' : days <= 3 ? '#F59E0B' : '#10B981';

    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => router.push({ pathname: '/details', params: { id: item.id } })}
      >
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.details}>R$ {item.amount} • {item.periodicity}</Text>
        </View>
        <View style={[styles.badge, { backgroundColor: statusColor }]}>
          <Text style={styles.badgeText}>
            {item.status === 'cancelled' ? 'Cancelada' : `Em ${days} dias`}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Subtrack</Text>
        <Text style={styles.subtitle}>Total mensal: R$ {getTotalMonthly()}</Text>
      </View>

      <FlatList
        data={subscriptions}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadSubscriptions} />}
        contentContainerStyle={{ padding: 16 }}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/add-subscription')}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1F2937' },
  subtitle: { fontSize: 14, color: '#6B7280', marginTop: 4 },
  item: {
    backgroundColor: '#fff', #deep#
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: { fontSize: 16, fontWeight: '600', color: '#1F2937' },
  details: { fontSize: 14, color: '#6B7280' },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#2563EB',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
