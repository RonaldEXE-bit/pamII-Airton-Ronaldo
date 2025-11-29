import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getServiceIcon } from '../../utils/icons';
import { removeSubscription } from '../../utils/storage';

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
        { text: 'Excluir', style: 'destructive',
          onPress: async () => {
            await removeSubscription(id);
            router.push('/');
          },
        },
      ]
    );
  };

  const handleBack = () => {
    router.push('/');
  };

  const darkMode = true;

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? '#0F172A' : '#0f172a' }]}>
      <View style={[styles.card, { backgroundColor: darkMode ? '#1F2937' : '#1f2937', borderColor: darkMode ? '#374151' : '#E5E7EB' }]}>
        {/* Ícone dinâmico */}
        <View style={{ alignItems: 'center', marginBottom: 12 }}>
          {getServiceIcon(name, 50)}
        </View>

        {/* Nome */}
        <Text style={[styles.title, { color: darkMode ? '#F3F4F6' : '#111827' }]}>{name}</Text>

        {/* Caixinhas */}
        <View style={[styles.box, { borderColor: '#F59E0B' }]}>
          <Text style={styles.boxLabel}>Valor</Text>
          <Text style={[styles.boxValue, { color: darkMode ? '#F3F4F6' : '#111827' }]}>R$ {parseFloat(amount).toFixed(2)}</Text>
        </View>

        <View style={[styles.box, { borderColor: '#3B82F6' }]}>
          <Text style={styles.boxLabel}>Dia de cobrança</Text>
          <Text style={[styles.boxValue, { color: darkMode ? '#F3F4F6' : '#111827' }]}>{dueDay}</Text>
        </View>

        <View style={[styles.box, { borderColor: '#10B981' }]}>
          <Text style={styles.boxLabel}>Tipo de pagamento</Text>
          <Text style={[styles.boxValue, { color: darkMode ? '#F3F4F6' : '#111827' }]}>{paymentType || 'Não informado'}</Text>
        </View>

        <View style={[styles.box, { borderColor: '#8B5CF6' }]}>
          <Text style={styles.boxLabel}>Descrição</Text>
          <Text style={[styles.boxValue, { color: darkMode ? '#F3F4F6' : '#111827' }]}>{description || 'Sem descrição'}</Text>
        </View>

        {/* Badge */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{category}</Text>
        </View>

        {/* Botões */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.payButton} onPress={handlePay}>
            <Text style={styles.buttonText}>Pagar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.buttonText}>Excluir</Text>
          </TouchableOpacity>
        </View>

        {/* Voltar */}
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.buttonText}>Voltar ao início</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  card: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
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
    color: '#9CA3AF',
    marginBottom: 4,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  boxValue: {
    fontSize: 16,
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
