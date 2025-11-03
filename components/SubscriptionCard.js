import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getSubscriptionIcon } from '../constants/icons';

const SubscriptionCard = ({ subscription, onPress }) => {
  const iconConfig = getSubscriptionIcon(subscription.name, subscription.category);
  
  const getStatusColor = () => {
    const today = new Date().getDate();
    const daysUntilDue = subscription.due_day - today;
    
    if (daysUntilDue <= 0) return '#EF4444';
    if (daysUntilDue <= 3) return '#F59E0B';
    return '#10B981';
  };

  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons 
          name={iconConfig.name} 
          size={24} 
          color={iconConfig.color} 
        />
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{subscription.name}</Text>
        <Text style={styles.details}>
          R$ {subscription.amount.toFixed(2)} • {subscription.cycle === 'monthly' ? 'mensal' : 'anual'}
        </Text>
        <Text style={styles.category}>{subscription.category}</Text>
      </View>
      
      <View style={styles.dueContainer}>
        <View style={[styles.dueBadge, { backgroundColor: getStatusColor() }]}>
          <Text style={styles.dueText}>Dia {subscription.due_day}</Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={20} color="#9CA3AF" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  details: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  category: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
    textTransform: 'capitalize',
  },
  dueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dueBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  dueText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default SubscriptionCard;