import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@subscriptions';

export const getSubscriptions = async () => {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const saveSubscriptions = async (list) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Erro ao salvar:', e);
  }
};

