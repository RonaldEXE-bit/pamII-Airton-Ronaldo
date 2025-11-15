import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getServiceIcon } from '../../utils/icons';

export default function SubscriptionDetail() {
  const { id, name, amount, dueDay, category, paymentType, description } = useLocalSearchParams();
  const router = useRouter();

  const handlePay = () => {
    Alert.alert('Pagamento', `Você pagou a assinatura ${name} com sucesso!`);
  };

  const handleEdit = () => {
    router.push({
      pathname: '/edit-subscription',
      params: { id, name, amount, dueDay, category, paymentType, description },
    });
  };

  const handleDelete = () => {
    Alert.alert(
      'Excluir assinatura',
      `Tem certeza que deseja excluir ${name}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            // TODO: implementar removeSubscription(id)
            router.back();
          },
        },
      ]
    );
  };

  const handleBack = () => {
    router.push('/'); // volta para a tela inicial (index.js)
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Ícone dinâmico */}
        <View style={{ alignItems: 'center', marginBottom: 12 }}>
          {getServiceIcon(name, 50)}
        </View>

        {/* Nome */}
        <Text style={styles.title}>{name}</Text>

        {/* Caixinhas com borda e cores diferentes */}
        <View style={[styles.box, { borderColor: '#F59E0B' }]}>
          <Text style={styles.boxLabel}>💰 Valor</Text>
          <Text style={styles.boxValue}>R$ {parseFloat(amount).toFixed(2)}</Text>
        </View>

        <View style={[styles.box, { borderColor: '#3B82F6' }]}>
          <Text style={styles.boxLabel}>📅 Dia de cobrança</Text>
          <Text style={styles.boxValue}>{dueDay}</Text>
        </View>

        <View style={[styles.box, { borderColor: '#10B981' }]}>
          <Text style={styles.boxLabel}>💳 Tipo de pagamento</Text>
          <Text style={styles.boxValue}>{paymentType || 'Não informado'}</Text>
        </View>

        <View style={[styles.box, { borderColor: '#8B5CF6' }]}>
          <Text style={styles.boxLabel}>📝 Descrição</Text>
          <Text style={styles.boxValue}>{description || 'Sem descrição'}</Text>
        </View>

        {/* Badge de categoria */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{category}</Text>
        </View>

        {/* Botões de ação */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.payButton} onPress={handlePay}>
            <Text style={styles.buttonText}>💳 Pagar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Text style={styles.buttonText}>✏️ Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.buttonText}>🗑️ Excluir</Text>
          </TouchableOpacity>
        </View>

        {/* Botão voltar */}
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.buttonText}>⬅️ Voltar ao início</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', padding: 20 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#111827',
    textAlign: 'center',
  },
  box: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  boxLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  boxValue: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '600',
  },
  badge: {
    marginTop: 8,
    alignSelf: 'flex-start',
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  badgeText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  payButton: {
    backgroundColor: '#059669',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  editButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  deleteButton: {
    backgroundColor: '#DC2626',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  backButton: {
    backgroundColor: '#6B7280',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    marginTop: 16,
    alignSelf: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
