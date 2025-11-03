import React from 'react';
import { View } from 'react-native';
import AddSubscriptionForm from '../components/AddSubscriptionForm';

// Esta tela é apenas um wrapper para o modal
const AddSubscriptionScreen = ({ navigation, route }) => {
  return (
    <View style={{ flex: 1 }}>
      <AddSubscriptionForm
        visible={true}
        onClose={() => navigation.goBack()}
        onSubmit={(data) => {
          // A lógica de submit está no DashboardScreen
          route.params?.onSubmit?.(data);
          navigation.goBack();
        }}
        editingSubscription={route.params?.editingSubscription}
      />
    </View>
  );
};

export default AddSubscriptionScreen;