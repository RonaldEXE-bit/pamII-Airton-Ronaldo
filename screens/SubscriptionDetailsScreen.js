import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSubscriptions } from '../context/SubscriptionContext';
import { getSubscriptionIcon } from '../constants/icons';

const SubscriptionDetailsScreen = ({ route, navigation }) => {
  const { subscription } = route.params;
  const { removeSubscription } = useSubscriptions();
  const iconConfig = getSubscriptionIcon(subscription.name, subscription.category);

  const handleDelete = () => {
    Alert.alert(
      'Excluir Assinatura',
      `Tem certeza que deseja excluir ${subscription.name}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive',
          onPress: async () => {
            await removeSubscription(subscription.id);
            navigation.goBack();
          }
        }
      ]
    );
  };

  const handlePay = () => {
    // Simula abertura do app/site para pagamento
    const serviceUrl = `https://${subscription.name.toLowerCase().replace(' ', '')}.com`;
    Linking.openURL(serviceUrl).catch(() => {
      Alert.alert('Erro', `Não foi possível abrir ${subscription.name}`);
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#6B7280" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes</Text>
        <TouchableOpacity onPress={handleDelete}>
          <MaterialCommunityIcons name="trash-can-outline" size={24} color="#EF4444" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Ícone e Nome */}
        <View style={styles.iconSection}>
          <View style={styles.iconLarge}>
            <MaterialCommunityIcons 
              name={iconConfig.name} 
              size={32} 
              color={iconConfig.color} 
            />
          </View>
          <Text style={styles.serviceName}>{subscription.name}</Text>
          <View style={[
            styles.statusBadge,
            { backgroundColor: subscription.status === 'active' ? '#10B981' : '#6B7280' }
          ]}>
            <Text style={styles.statusText}>
              {subscription.status === 'active' ? 'Ativa' : 'Cancelada'}
            </Text>
          </View>
        </View>

        {/* Informações Principais */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="cash" size={20} color="#6B7280" />
            <Text style={styles.infoLabel}>Valor:</Text>
            <Text style={styles.infoValue}>R$ {subscription.amount.toFixed(2)}</Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="calendar" size={20} color="#6B7280" />
            <Text style={styles.infoLabel}>Vencimento:</Text>
            <Text style={styles.infoValue}>Dia {subscription.due_day}</Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="repeat" size={20} color="#6B7280" />
            <Text style={styles.infoLabel}>Periodicidade:</Text>
            <Text style={styles.infoValue}>
              {subscription.cycle === 'monthly' ? 'Mensal' : 'Anual'}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="tag" size={20} color="#6B7280" />
            <Text style={styles.infoLabel}>Categoria:</Text>
            <Text style={styles.infoValue}>{subscription.category}</Text>
          </View>

          {subscription.paymentMethod && (
            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="credit-card" size={20} color="#6B7280" />
              <Text style={styles.infoLabel}>Pagamento:</Text>
              <Text style={styles.infoValue}>{subscription.paymentMethod}</Text>
            </View>
          )}
        </View>

        {/* Notas */}
        {subscription.notes && (
          <View style={styles.notesSection}>
            <Text style={styles.sectionTitle}>Notas</Text>
            <Text style={styles.notesText}>{subscription.notes}</Text>
          </View>
        )}
      </ScrollView>

      {/* Botão de Ação */}
      {subscription.status === 'active' && (
        <View style={styles.footer}>
          <TouchableOpacity style={styles.payButton} onPress={handlePay}>
            <MaterialCommunityIcons name="link" size={20} color="#FFFFFF" />
            <Text style={styles.payButtonText}>Ir para Pagamento</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
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
  },
  iconSection: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  iconLarge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  infoSection: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  infoLabel: {
    flex: 1,
    fontSize: 16,
    color: '#6B7280',
    marginLeft: 12,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  notesSection: {
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  notesText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  footer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  payButton: {
    flexDirection: 'row',
    backgroundColor: '#2563EB',
    paddingVertical: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  payButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SubscriptionDetailsScreen;