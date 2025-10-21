import { Stack } from "expo-router";
import MovieScreen from ".";
import SettingsScreen from "./tabs/configuracoes";

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';

export default function RootLayout() {
  return <Stack />;
}
