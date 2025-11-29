import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ThemeToggle from '../components/ThemeToggle';
import { getDaysUntilDue } from '../utils/dateUtils';
import { getServiceIcon } from '../utils/icons';
import { getSubscriptions } from '../utils/storage';

export default function HomeScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      loadSubscriptions();
    }, [])
  );

  const loadSubscriptions = async () => {
    const subs = await getSubscriptions();
    setSubscriptions(subs);
  };

  return (
    <View style={{ flex: 1, backgroundColor: darkMode ? '#111827' : '#111827' }}>
      {/* Botão de tema */}
      <View style={{ alignItems: 'flex-end', padding: 16 }}>
        <ThemeToggle onToggle={setDarkMode} />
      </View>

      {/* Título */}
      <Text style={[styles.title, { color: darkMode ? '#fff' : '#fff' }]}>
        Subtrack
      </Text>

      {/* Total mensal */}
      <Text style={[styles.subtitle, { color: darkMode ? '#fff' : '#fff' }]}>
        Total mensal: R$ {subscriptions.reduce((acc, s) => acc + s.amount, 0).toFixed(2)}
      </Text>

      {/* Botão adicionar */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/add-subscription')}
      >
        <Text style={styles.addButtonText}>+ Adicionar</Text>
      </TouchableOpacity>

      {/* Lista */}
      <FlatList
        data={subscriptions}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadSubscriptions} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: '/subscription/details',
                params: {
                  id: item.id,
                  name: item.name,
                  amount: item.amount,
                  dueDay: item.dueDay,
                  category: item.category,
                  paymentMethod: item.paymentMethod,
                  notes: item.notes,                
                  status: item.status,
                  periodicity: item.periodicity,
                },
              })
            }
          >
            <View style={[
              styles.card,
              { backgroundColor: darkMode ? '#1F2937' : '#1f2937' }
            ]}>
              {/* Ícone dinâmico */}
              <View style={{ alignItems: 'center', marginBottom: 8 }}>
                {getServiceIcon(item.name, 40)}
              </View>

              {/* Nome */}
              <Text style={[styles.cardTitle, { color: darkMode ? '#fff' : '#fff' }]}>
                {item.name}
              </Text>

              {/* Valor + vencimento */}
              <Text style={[styles.cardSubtitle, { color: darkMode ? '#9CA3AF' : '#9ca3af' }]}>
                R$ {item.amount.toFixed(2)} — vence em {getDaysUntilDue(item.dueDay)} dias
              </Text>

              {/* Tipo de pagamento */}
              {item.paymentMethod ? (
                <Text style={[styles.cardSubtitle, { color: darkMode ? '#9CA3AF' : '#9ca3af' }]}>
                  💳 {item.paymentMethod}
                </Text>
              ) : null}

              {/* Notas */}
              {item.notes ? (
                <Text style={[styles.cardSubtitle, { color: darkMode ? '#9CA3AF' : '#9ca3af' }]}>
                  📝 {item.notes}
                </Text>
              ) : null}

              {/* Badge */}
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.category}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginTop: 8,
  },
  subtitle: {
    marginLeft: 16,
    marginBottom: 8,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginLeft: 16,
    marginBottom: 12,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    marginBottom: 6,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 6,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});
