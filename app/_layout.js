import { Slot, Stack } from 'expo-router';
import Toast from 'react-native-toast-message';

export default function AppLayout() {
  return (
    <>
      {/* Slot renderiza as rotas filhas */}
      <Slot />
      {/* Toast global para notificações */}
      <Toast />
    </>
  );
}

// Se quiser controlar headers globais:
export function LayoutStack() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
