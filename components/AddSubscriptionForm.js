import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CATEGORIES, getSubscriptionIcon } from '../constants/icons';

const AddSubscriptionForm = ({ visible, onClose, onSubmit, editingSubscription }) => {
  const [formData, setFormData] = useState(
    editingSubscription || {
      name: '',
      amount: '',
      dueDay: new Date().getDate().toString(),
      cycle: 'monthly',
      category: 'streaming',
      status: 'active',
      paymentMethod: '',
      notes: ''
    }
  );

  const cycles = [
    { value: 'monthly', label: 'Mensal' },
    { value: 'yearly', label: 'Anual' }
  ];

  const statuses = [
    { value: 'active', label: 'Ativa' },
    { value: 'cancelled', label: 'Cancelada' }
  ];

  const handleSubmit = () => {
    if (!formData.name || !formData.amount) {
      alert('Preencha nome e valor');
      return;
    }

    const submissionData = {
      ...formData,
      amount: parseFloat(formData.amount),
      dueDay: parseInt(formData.dueDay),
      icon: getSubscriptionIcon(formData.name, formData.category).name
    };

    onSubmit(submissionData);
    setFormData({
      name: '',
      amount: '',
      dueDay: new Date().getDate().toString(),
      cycle: 'monthly',
      category: 'streaming',
      status: 'active',
      paymentMethod: '',
      notes: ''
    });
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {editingSubscription ? 'Editar Assinatura' : 'Nova Assinatura'}
          </Text>
          <TouchableOpacity onPress={onClose}>
            <MaterialCommunityIcons name="close" size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.form}>
          {/* Nome */}
          <View style={styles.field}>
            <Text style={styles.label}>Nome do Serviço *</Text>
            <TextInput
              style={styles.input}
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              placeholder="Ex: Netflix, Spotify..."
            />
          </View>

          {/* Valor */}
          <View style={styles.field}>
            <Text style={styles.label}>Valor *</Text>
            <TextInput
              style={styles.input}
              value={formData.amount}
              onChangeText={(text) => setFormData({ ...formData, amount: text })}
              placeholder="0.00"
              keyboardType="decimal-pad"
            />
          </View>

          {/* Dia do Vencimento */}
          <View style={styles.field}>
            <Text style={styles.label}>Dia do Vencimento *</Text>
            <TextInput
              style={styles.input}
              value={formData.dueDay}
              onChangeText={(text) => setFormData({ ...formData, dueDay: text })}
              placeholder="1-31"
              keyboardType="number-pad"
              maxLength={2}
            />
          </View>

          {/* Categoria */}
          <View style={styles.field}>
            <Text style={styles.label}>Categoria</Text>
            <View style={styles.categoryGrid}>
              {Object.entries(CATEGORIES).map(([key, category]) => (
                <TouchableOpacity
                  key={key}
                  style={[
                    styles.categoryButton,
                    formData.category === key && styles.categoryButtonSelected
                  ]}
                  onPress={() => setFormData({ ...formData, category: key })}
                >
                  <MaterialCommunityIcons 
                    name={category.icon} 
                    size={20} 
                    color={formData.category === key ? '#FFFFFF' : category.color} 
                  />
                  <Text style={[
                    styles.categoryText,
                    formData.category === key && styles.categoryTextSelected
                  ]}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Periodicidade */}
          <View style={styles.field}>
            <Text style={styles.label}>Periodicidade</Text>
            <View style={styles.cycleContainer}>
              {cycles.map((cycle) => (
                <TouchableOpacity
                  key={cycle.value}
                  style={[
                    styles.cycleButton,
                    formData.cycle === cycle.value && styles.cycleButtonSelected
                  ]}
                  onPress={() => setFormData({ ...formData, cycle: cycle.value })}
                >
                  <Text style={[
                    styles.cycleText,
                    formData.cycle === cycle.value && styles.cycleTextSelected
                  ]}>
                    {cycle.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Status */}
          <View style={styles.field}>
            <Text style={styles.label}>Status</Text>
            <View style={styles.cycleContainer}>
              {statuses.map((status) => (
                <TouchableOpacity
                  key={status.value}
                  style={[
                    styles.cycleButton,
                    formData.status === status.value && styles.cycleButtonSelected
                  ]}
                  onPress={() => setFormData({ ...formData, status: status.value })}
                >
                  <Text style={[
                    styles.cycleText,
                    formData.status === status.value && styles.cycleTextSelected
                  ]}>
                    {status.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Método de Pagamento */}
          <View style={styles.field}>
            <Text style={styles.label}>Método de Pagamento</Text>
            <TextInput
              style={styles.input}
              value={formData.paymentMethod}
              onChangeText={(text) => setFormData({ ...formData, paymentMethod: text })}
              placeholder="Ex: Cartão final 4512"
            />
          </View>

          {/* Notas */}
          <View style={styles.field}>
            <Text style={styles.label}>Notas</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.notes}
              onChangeText={(text) => setFormData({ ...formData, notes: text })}
              placeholder="Observações..."
              multiline
              numberOfLines={3}
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>
              {editingSubscription ? 'Atualizar' : 'Adicionar'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  form: {
    flex: 1,
    padding: 16,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
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
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    gap: 6,
  },
  categoryButtonSelected: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
  },
  categoryTextSelected: {
    color: '#FFFFFF',
  },
  cycleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  cycleButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  cycleButtonSelected: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  cycleText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  cycleTextSelected: {
    color: '#FFFFFF',
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
  },
  submitButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#2563EB',
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
});

export default AddSubscriptionForm;