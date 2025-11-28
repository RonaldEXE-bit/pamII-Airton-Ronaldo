import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const STORAGE_KEY = '@subscriptions';

export default function SubscriptionDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  // Id atual (params.id ou subscription.id), sempre como string
  const getCurrentId = () => {
    const pid = params?.id ? String(params.id) : null;
    const sid = subscription?.id ? String(subscription.id) : null;
    return pid || sid || '';
  };

  useEffect(() => {
    loadSubscription();
  }, []);

  const loadSubscription = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      const subscriptions = stored ? JSON.parse(stored) : [];
      const targetId = params?.id ? String(params.id) : null;
      const sub = targetId
        ? subscriptions.find(s => String(s.id) === targetId)
        : null;
      setSubscription(sub || null);
    } catch (error) {
      console.error('Erro ao carregar assinatura:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSubscription = async () => {
    try {
      const currentId = getCurrentId();
      if (!currentId) {
        Alert.alert('Erro', 'ID da assinatura não encontrado.');
        return;
      }

      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      const subscriptions = stored ? JSON.parse(stored) : [];

      const updatedSubscriptions = subscriptions.filter(
        s => String(s.id) !== String(currentId)
      );

      if (updatedSubscriptions.length === subscriptions.length) {
        Alert.alert('Aviso', 'Não foi possível localizar a assinatura para excluir.');
        return;
      }

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSubscriptions));

      if (Platform.OS === 'web') {
        alert('Assinatura excluída com sucesso.');
      } else {
        Alert.alert('Pronto', 'Assinatura excluída com sucesso.');
      }

      router.replace('/'); // volta para dashboard
    } catch (error) {
      console.error('Erro ao excluir assinatura:', error);
      if (Platform.OS === 'web') {
        alert('Não foi possível excluir a assinatura');
      } else {
        Alert.alert('Erro', 'Não foi possível excluir a assinatura');
      }
    }
  };

  const handleDelete = () => {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm('Esta assinatura será excluída. Tem certeza?');
      if (confirmed) {
        deleteSubscription();
      }
    } else {
      Alert.alert(
        'Excluir Assinatura',
        'Esta assinatura será excluída. Tem certeza?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Excluir', style: 'destructive', onPress: () => deleteSubscription() }
        ]
      );
    }
  };

  const handleEdit = () => {
    if (!subscription) return;
    router.push({
      pathname: '/add-subscription',
      params: { edit: 'true', ...subscription }
    });
  };

  const handlePayment = () => {
    if (subscription?.paymentUrl) {
      Linking.openURL(subscription.paymentUrl);
    } else if (subscription?.name) {
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(subscription.name + ' pagamento')}`;
      Linking.openURL(searchUrl);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={{ color: '#fff' }}>Carregando...</Text>
      </View>
    );
  }

  if (!subscription) {
    return (
      <View style={styles.container}>
        <Text style={{ color: '#fff' }}>Assinatura não encontrada</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/')}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes</Text>
        <TouchableOpacity onPress={handleEdit} style={styles.headerEdit}>
          <Ionicons name="create-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Nome e Status */}
        <View style={styles.iconSection}>
          <Ionicons name="tv-outline" size={40} color="#2563EB" />
          <Text style={styles.name}>{subscription.name}</Text>
          <Text style={styles.status}>{subscription.status || 'Ativa'}</Text>
        </View>

        {/* Valor */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Valor</Text>
          <Text style={styles.amount}>R$ {Number(subscription.amount).toFixed(2)}</Text>
        </View>

        {/* Cobrança */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Dia de cobrança</Text>
          <Text style={styles.infoValue}>Dia {subscription.dueDay}</Text>
        </View>

        {/* Informações adicionais */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Categoria</Text>
          <Text style={styles.infoValue}>{subscription.category || 'Não definida'}</Text>

          <Text style={styles.cardLabel}>Método de Pagamento</Text>
          <Text style={styles.infoValue}>{subscription.paymentMethod || 'Não informado'}</Text>

          <Text style={styles.cardLabel}>Notas</Text>
          <Text style={styles.infoValue}>{subscription.notes || 'Sem descrição'}</Text>
        </View>

        {/* Botões */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
            <Text style={styles.buttonText}>Ir para Pagamento</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.buttonText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#1F2937',
    alignItems: 'center'
  },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#fff' },
  headerEdit: { padding: 4 },
  backButton: { padding: 4 },
  content: { padding: 16 },
  iconSection: { alignItems: 'center', marginBottom: 20 },
  name: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginTop: 8 },
  status: { fontSize: 14, color: '#9CA3AF', marginTop: 4 },
  card: {
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12
  },
  cardLabel: { fontSize: 14, fontWeight: '600', color: '#9CA3AF' },
  amount: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  infoValue: { fontSize: 16, color: '#F3F4F6', marginBottom: 8 },
  actions: { marginTop: 20 },
  paymentButton: {
    backgroundColor: '#2563EB',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12
  },
  editButton: {
    backgroundColor: '#4F46E5',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12
  },
  deleteButton: {
    backgroundColor: '#DC2626',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: '600' 
  },
  backButtonText: { 
    color: '#fff', 
    fontSize: 16 
  }
});



