import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { SubscriptionProvider } from './context/SubscriptionContext';

// Screens
import DashboardScreen from './screens/DashboardScreen';
import SubscriptionDetailsScreen from './screens/SubscriptionDetailsScreen';
import AddSubscriptionScreen from './screens/AddSubscriptionScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SubscriptionProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: '#F9FAFB' }
          }}
        >
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Details" component={SubscriptionDetailsScreen} />
          <Stack.Screen name="AddSubscription" component={AddSubscriptionScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SubscriptionProvider>
  );
}