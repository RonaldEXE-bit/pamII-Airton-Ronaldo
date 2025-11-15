import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Toast from 'react-native-toast-message';

const STORAGE_KEY = '@subscriptions';
const CATEGORIES = ['Streaming', 'Música', 'Software', 'Games', 'Cloud', 'Outros'];

export default function AddSubscription() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const isEdit = params.edit === 'true';
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDay, setDueDay] = useState('1');
  const [periodicity, setPeriodicity] = useState('monthly');
  const [category, setCategory] = useState('Streaming');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('active');

  useEffect(() => {
    if (isEdit) {
      loadSubscriptionData();
    }
  }, []);

  const loadSubscriptionData = () => {
    setName(params.name || '');
    setAmount(params.amount?.toString() || '');
    setDueDay(params.dueDay?.toString() || '1');
    setPeriodicity(params.periodicity || 'monthly');
    setCategory(params.category || 'Streaming');
    setPaymentMethod(params.paymentMethod || '');
    setNotes(params.notes || '');
    setStatus(params.status || 'active');
  };

  const validateForm = () => {
    if (!name.trim()) {
      Alert.alert('Erro', 'Por favor, informe o nome da assinatura');
      return false;
    }

    const parsedAmount = Number(String(amount).replace(',', '.').trim());
    if (!isFinite(parsedAmount) || parsedAmount <= 0) {
      Alert.alert('Erro', 'Por favor, informe um valor válido');
      return false;
    }

    const parsedDueDay = parseInt(dueDay);
    if (!parsedDueDay || parsedDueDay < 1 || parsedDueDay > 31) {
      Alert.alert('Erro', 'Por favor, informe um dia válido (1-31)');
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
  
    setLoading(true);
  
    try {
      // Carrega assinaturas já salvas
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      let subscriptions = [];
  
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          subscriptions = Array.isArray(parsed) ? parsed : [];
        } catch {
          subscriptions = [];
        }
      }
      
      
      // Cria nova assinatura
      const parsedAmount = Number(String(amount).replace(',', '.').trim());
      const parsedDueDay = parseInt(dueDay);
  
      const subscriptionData = {
        id: isEdit ? params.id : Date.now().toString(),
        name: name.trim(),
        amount: parsedAmount,
        dueDay: parsedDueDay,
        periodicity,
        category,
        paymentMethod: paymentMethod.trim(),
        notes: notes.trim(),
        status,
        createdAt: isEdit ? params.createdAt || new Date().toISOString() : new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
  
      // Atualiza lista
      let updatedSubscriptions;
      if (isEdit) {
        updatedSubscriptions = subscriptions.map(sub =>
          sub.id === params.id ? { ...sub, ...subscriptionData } : sub
        );
      } else {
        updatedSubscriptions = [...subscriptions, subscriptionData];
      }
  
      // Salva no AsyncStorage
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSubscriptions));
  
      // Toast de sucesso
      Toast.show({
        type: 'success',
        text1: 'Assinatura adicionada!',
        text2: `${subscriptionData.name} foi salva com sucesso.`,
      });
  
      // Volta para o dashboard
      router.replace('/');
    } catch (error) {
      console.error('Erro ao salvar assinatura:', error);
      Alert.alert('Erro', 'Não foi possível salvar a assinatura');
    } finally {
      setLoading(false);
    }
  };
  

  const renderDayOptions = () => {
    const days = [];
    for (let i = 1; i <= 31; i++) {
      days.push(
        <Picker.Item key={i} label={`Dia ${i}`} value={i.toString()} />
      );
    }
    return days;
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#2563EB" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isEdit ? 'Editar Assinatura' : 'Nova Assinatura'}
        </Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome do Serviço *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Netflix, Spotify..."
            value={name}
            onChangeText={setName}
            maxLength={50}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
            <Text style={styles.label}>Valor *</Text>
            <View style={styles.amountContainer}>
              <Text style={styles.currencySymbol}>R$</Text>
              <TextInput
                style={styles.amountInput}
                placeholder="0,00"
                value={amount}
                onChangeText={setAmount}
                keyboardType="decimal-pad"
                maxLength={10}
              />
            </View>
          </View>

          <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
            <Text style={styles.label}>Periodicidade</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={periodicity}
                onValueChange={setPeriodicity}
                style={styles.picker}
              >
                <Picker.Item label="Mensal" value="monthly" />
                <Picker.Item label="Anual" value="yearly" />
                <Picker.Item label="Trimestral" value="quarterly" />
              </Picker>
            </View>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Dia do mês para cobrança *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={dueDay}
              onValueChange={setDueDay}
              style={styles.picker}
            >
              {renderDayOptions()}
            </Picker>
          </View>
          <Text style={styles.hint}>
            Ex: 15 para cobrança no dia 15 de cada mês ou ano
          </Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Categoria</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={category}
              onValueChange={setCategory}
              style={styles.picker}
            >
              {CATEGORIES.map(cat => (
                <Picker.Item key={cat} label={cat} value={cat} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Método de Pagamento</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Cartão final 4512, PIX..."
            value={paymentMethod}
            onChangeText={setPaymentMethod}
            maxLength={30}
          />
        </View>

        {isEdit && (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Status</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={status}
                onValueChange={setStatus}
                style={styles.picker}
              >
                <Picker.Item label="Ativa" value="active" />
                <Picker.Item label="Cancelada" value="cancelled" />
                <Picker.Item label="Suspensa" value="paused" />
              </Picker>
            </View>
          </View>
        )}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Notas</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Observações, detalhes do plano..."
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={3}
            maxLength={200}
            textAlignVertical="top"
          />
                    <Text style={styles.charCount}>{notes.length}/200</Text>
        </View>

        <TouchableOpacity 
          style={[
            styles.saveButton, 
            loading && styles.saveButtonDisabled
          ]} 
          onPress={handleSave}
          disabled={loading}
        >
          {loading ? (
            <Text style={styles.saveButtonText}>Salvando...</Text>
          ) : (
            <>
              <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
              <Text style={styles.saveButtonText}>
                {isEdit ? 'Atualizar' : 'Criar'} Assinatura
              </Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={() => router.back()}
        >
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
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
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  textArea: {
    minHeight: 80,
  },
  charCount: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'right',
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  currencySymbol: {
    fontSize: 16,
    color: '#6B7280',
    marginRight: 4,
  },
  amountInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  pickerContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  saveButton: {
    backgroundColor: '#2563EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 12,
  },
  saveButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  cancelButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  cancelButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '500',
  },
  hint: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
});
