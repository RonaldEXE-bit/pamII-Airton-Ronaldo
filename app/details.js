import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
  Image
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@subscriptions';

export default function SubscriptionDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubscription();
  }, []);

  const loadSubscription = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      const subscriptions = stored ? JSON.parse(stored) : [];
      const sub = subscriptions.find(s => s.id === params.id);
      setSubscription(sub);
    } catch (error) {
      console.error('Erro ao carregar assinatura:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Cancelar Assinatura',
      'Tem certeza que deseja cancelar esta assinatura?',
      [
        { text: 'Não', style: 'cancel' },
        { 
          text: 'Sim', 
          style: 'destructive',
          onPress: deleteSubscription
        }
      ]
    );
  };

  const deleteSubscription = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      const subscriptions = stored ? JSON.parse(stored) : [];
      const updatedSubscriptions = subscriptions.filter(s => s.id !== params.id);
      
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSubscriptions));
      router.back();
    } catch (error) {
      console.error('Erro ao deletar:', error);
      Alert.alert('Erro', 'Não foi possível cancelar a assinatura');
    }
  };

  const handlePayment = () => {
    if (subscription?.paymentUrl) {
      Linking.openURL(subscription.paymentUrl);
    } else {
      // Pesquisa genérica no navegador
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(subscription.name + ' pagamento')}`;
      Linking.openURL(searchUrl);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'cancelled': return '#6B7280';
      case 'expiring': return '#F59E0B';
      default: return '#2563EB';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Ativa';
      case 'cancelled': return 'Cancelada';
      case 'expiring': return 'Próxima';
      default: return 'Ativa';
    }
  };

  const getDaysUntilDue = () => {
    if (!subscription?.dueDay) return null;
    
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    let dueDate = new Date(currentYear, currentMonth, subscription.dueDay);
    
    // Se a data já passou este mês, vai para o próximo mês
    if (dueDate < today) {
      dueDate = new Date(currentYear, currentMonth + 1, subscription.dueDay);
    }
    
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (!subscription) {
    return (
      <View style={styles.container}>
        <Text>Assinatura não encontrada</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const daysUntilDue = getDaysUntilDue();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#2563EB" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes</Text>
        <TouchableOpacity onPress={() => router.push({
          pathname: '/add-subscription',
          params: { edit: true, ...subscription }
        })}>
          <Ionicons name="create-outline" size={24} color="#2563EB" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Ícone e Nome */}
        <View style={styles.iconSection}>
          <View style={[styles.iconContainer, { backgroundColor: '#EFF6FF' }]}>
            <Ionicons name="tv-outline" size={40} color="#2563EB" />
          </View>
          <Text style={styles.name}>{subscription.name}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(subscription.status) }]}>
            <Text style={styles.statusText}>{getStatusText(subscription.status)}</Text>
          </View>
        </View>

        {/* Valor */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Valor</Text>
          <Text style={styles.amount}>R$ {parseFloat(subscription.amount).toFixed(2)}</Text>
          <Text style={styles.periodicity}>{subscription.periodicity === 'yearly' ? 'por ano' : 'por mês'}</Text>
        </View>

        {/* Próxima Cobrança */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Próxima Cobrança</Text>
          <Text style={styles.dueDate}>Dia {subscription.dueDay} de cada mês</Text>
          {daysUntilDue && (
            <Text style={styles.daysUntil}>
              {daysUntilDue === 1 ? 'Amanhã' : `Em ${daysUntilDue} dias`}
            </Text>
          )}
        </View>

        {/* Informações Adicionais */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Informações</Text>
          
          <View style={styles.infoRow}>
            <Ionicons name="pricetag-outline" size={16} color="#6B7280" />
            <Text style={styles.infoLabel}>Categoria:</Text>
            <Text style={styles.infoValue}>{subscription.category || 'Não definida'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="card-outline" size={16} color="#6B7280" />
            <Text style={styles.infoLabel}>Método de Pagamento:</Text>
            <Text style={styles.infoValue}>{subscription.paymentMethod || 'Não informado'}</Text>
          </View>

          {subscription.notes && (
            <View style={styles.infoRow}>
              <Ionicons name="document-text-outline" size={16} color="#6B7280" />
              <Text style={styles.infoLabel}>Notas:</Text>
              <Text style={styles.infoValue}>{subscription.notes}</Text>
            </View>
          )}
        </View>

        {/* Botões de Ação */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
            <Ionicons name="card" size={20} color="#FFFFFF" />
            <Text style={styles.paymentButtonText}>Ir para Pagamento</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={handleDelete}>
            <Ionicons name="close-circle-outline" size={20} color="#EF4444" />
            <Text style={styles.cancelButtonText}>Cancelar Assinatura</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  iconSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
  },
  amount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  periodicity: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  dueDate: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  daysUntil: {
    fontSize: 14,
    color: '#F59E0B',
    marginTop: 4,
    fontWeight: '500',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
    marginRight: 4,
    width: 140,
  },
  infoValue: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
    flex: 1,
  },
  actionsContainer: {
    marginTop: 24,
  },
  paymentButton: {
    backgroundColor: '#2563EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  paymentButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  cancelButtonText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});