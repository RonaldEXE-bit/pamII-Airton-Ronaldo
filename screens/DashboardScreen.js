import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSubscriptions } from '../context/SubscriptionContext';
import SubscriptionCard from '../components/SubscriptionCard';
import AddSubscriptionForm from '../components/AddSubscriptionForm';

const DashboardScreen = ({ navigation }) => {
  const { subscriptions, getTotalMonthly, getUpcomingSubscriptions, createSubscription } = useSubscriptions();
  const [showAddForm, setShowAddForm] = useState(false);

  const totalMonthly = getTotalMonthly();
  const upcomingSubscriptions = getUpcomingSubscriptions();

  const handleAddSubscription = async (subscriptionData) => {
    try {
      await createSubscription(subscriptionData);
      setShowAddForm(false);
    } catch (error) {
      alert('Erro ao adicionar assinatura');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>SubTrack</Text>
        <TouchableOpacity>
          <MaterialCommunityIcons name="cog" size={24} color="#6B7280" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Card de Resumo */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total do Mês</Text>
          <Text style={styles.summaryValue}>R$ {totalMonthly.toFixed(2)}</Text>
          <Text style={styles.summarySubtitle}>
            {subscriptions.filter(sub => sub.status === 'active').length} assinaturas ativas
          </Text>
        </View>

        {/* Próximas Cobranças */}
        {upcomingSubscriptions.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Próximas Cobranças</Text>
            </View>
            {upcomingSubscriptions.map((subscription) => (
              <SubscriptionCard
                key={subscription.id}
                subscription={subscription}
                onPress={() => navigation.navigate('Details', { subscription })}
              />
            ))}
          </View>
        )}

        {/* Todas as Assinaturas */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Todas as Assinaturas</Text>
            <Text style={styles.subscriptionCount}>
              {subscriptions.length} itens
            </Text>
          </View>
          {subscriptions.length === 0 ? (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons name="television" size={48} color="#D1D5DB" />
              <Text style={styles.emptyStateText}>Nenhuma assinatura cadastrada</Text>
              <Text style={styles.emptyStateSubtext}>
                Toque no botão + para adicionar sua primeira assinatura
              </Text>
            </View>
          ) : (
            subscriptions.map((subscription) => (
              <SubscriptionCard
                key={subscription.id}
                subscription={subscription}
                onPress={() => navigation.navigate('Details', { subscription })}
              />
            ))
          )}
        </View>
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => setShowAddForm(true)}
      >
        <MaterialCommunityIcons name="plus" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Modal de Adicionar */}
      <AddSubscriptionForm
        visible={showAddForm}
        onClose={() => setShowAddForm(false)}
        onSubmit={handleAddSubscription}
      />
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
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
  },
  content: {
    flex: 1,
  },
  summaryCard: {
    backgroundColor: '#2563EB',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  summaryValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 4,
  },
  summarySubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    marginTop: 4,
  },
  section: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  subscriptionCount: {
    fontSize: 14,
    color: '#6B7280',
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 8,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
});

export default DashboardScreen;