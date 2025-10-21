import React from 'react';
import { useFonts } from 'expo-font';
import { Icon } from '@/components/ui/icon';

import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black, } from "@expo-google-fonts/inter";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar // Mantenha o StatusBar para controle de estilo da barra do sistema
} from 'react-native';

// --- Componente da Tela de Configurações (SettingsScreen) ---
// Este componente é autônomo e pode ser usado como uma tela em um navegador de abas.

const SettingsScreen = () => {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });

  if (!fontsLoaded) {
    // Exibe um indicador de carregamento enquanto as fontes não estão prontas
    return <Text>Carregando fontes...</Text>;
  }

  return (
    <SafeAreaView style={settingsStyles.fullContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#202020" /> {/* Define o estilo da barra de status */}
      <View style={settingsStyles.container}>
        {/* Cabeçalho do Perfil */}
        <View style={settingsStyles.profileHeader}>
          <Image
            source={{ uri: 'https://play-lh.googleusercontent.com/k2BaLq9MgfgJCSGSTi5HY26FcdiCwlkO5F9X6oZgBPrguMvnWjrWgsER_O8tlsLegZ0' }}
            style={settingsStyles.profileLogo}
          />
          <View style={settingsStyles.profileTextContainer}>
            <Text style={settingsStyles.profileName}>T!tan Hydra</Text>
            <Text style={settingsStyles.profileUserType}>Usuário</Text>
          </View>
        </View>

        {/* Seção de Menu Principal */}
        <ScrollView style={settingsStyles.menuItemsContainer}>
          <TouchableOpacity style={settingsStyles.menuItem}>
            <Text style={[settingsStyles.menuItemText, settingsStyles.menuItemTextActive]}>Filmes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={settingsStyles.menuItem}>
            <Text style={settingsStyles.menuItemText}>Series</Text>
          </TouchableOpacity>
          <TouchableOpacity style={settingsStyles.menuItem}>
            <Text style={settingsStyles.menuItemText}>Favoritos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={settingsStyles.menuItem}>
            <Text style={settingsStyles.menuItemText}>Downloads</Text>
          </TouchableOpacity>

          {/* Separador e Título da Seção Apps */}
          <View style={settingsStyles.sectionDivider} />
          <Text style={settingsStyles.sectionTitle}>Apps</Text>
          <TouchableOpacity style={settingsStyles.menuItem}>
            <Text style={settingsStyles.menuItemText}>Hydra Kids</Text>
          </TouchableOpacity>

          {/* Separador e Título da Seção Suporte */}
          <View style={settingsStyles.sectionDivider} />
          <Text style={settingsStyles.sectionTitle}>Suporte</Text>
          <TouchableOpacity style={settingsStyles.menuItem}>
            <Text style={settingsStyles.menuItemText}>Sigam a gente no Telegram</Text>
          </TouchableOpacity>
          <TouchableOpacity style={settingsStyles.menuItem}>
            <Text style={settingsStyles.menuItemText}>Sigam a gente no Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={settingsStyles.menuItem}>
            <Text style={settingsStyles.menuItemText}>Fechar Sessão</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
// --- Estilos para SettingsScreen ---
const settingsStyles = StyleSheet.create({
  fullContainer: { // Para garantir que a SafeAreaView ocupe toda a tela
    flex: 1,
    backgroundColor: '#202020',
  },
  container: {
    flex: 1,
    backgroundColor: '#000', // Cor de fundo mais escura para o menu lateral
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000', // Mesmo fundo
    borderBottomWidth: 1,
    borderBottomColor: '#303030', // Linha sutil abaixo do cabeçalho
  },
  profileLogo: {
    width: 60,
    height: 60,
    borderRadius: 10, // Arredondado para simular o logo
    marginRight: 15,
    backgroundColor: '#000', // Cor de fundo do placeholder
  },
  profileTextContainer: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },
  profileUserType: {
    fontSize: 16,
    color: '#AAAAAA',
  },
  menuItemsContainer: {
    flex: 1,
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 1, // Pequeno espaçamento entre itens
  },
  menuItemIcon: {
    fontSize: 24,
    color: '#CCCCCC', // Cor padrão dos ícones
    width: 30, // Largura fixa para alinhar ícones e texto
    textAlign: 'center',
    marginRight: 15,
  },
  menuItemIconFilme: { // Texto do ícone de filme
    fontSize: 16, // Tamanho menor para caber no background
    color: 'white',
  },
  menuItemText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '500',
  },
  menuItemTextActive: {
    fontWeight: '700', 
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#303030',
    marginVertical: 15,
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#AAAAAA',
    fontWeight: '600',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
});

export default SettingsScreen;