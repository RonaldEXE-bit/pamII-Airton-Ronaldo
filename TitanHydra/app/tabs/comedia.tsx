import { Link } from 'expo-router';
import { useFonts } from 'expo-font';
import { Icon } from '@/components/ui/icon';
import { SearchIcon } from '@/components/ui/icon';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import React from 'react';
import {
  Dimensions // Para obter a largura da tela e calcular tamanhos responsivos
  ,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// Obtém a largura da tela para cálculos responsivos
const { width } = Dimensions.get('window');
// Definindo uma largura base para o pôster, considerando 4 colunas e espaçamento
const numColumns = 4;
const screenPadding = 20; // 10 em cada lado (paddingHorizontal do movieGridContainer)
const itemSpacing = 10; // Espaçamento entre os itens
const posterWidth = (width - screenPadding - (numColumns - 1) * itemSpacing) / numColumns;


const MovieScreen = () => {
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
  // Dados de exemplo para os
  //  filmes. Em uma aplicação real, estes dados viriam de uma API.
  // As URLs das imagens foram substituídas por placeholders para garantir a compilação no ambiente.
  const movies = [
    { id: '81', title: 'Tá rindo do quê?', image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjkvyRsdAIwJ1L_GsKZL4u-d8OAdT-WMt4RvN8RAjkesF-sPB6ZlBMcPf6FlEuzl0sZP7sYqiDmHhGSBmLpObwu0xkEKE-mVRLfARG8eJFOg5TNf_5Ck7LGd3YWqR3i013f0vN3FbVi7FA/s1600/TARINDODOQUE.jpg' },
    { id: '82', title: 'Barraco de familia', image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQqWKntvHE23e6H0YMk4_lymKJrw1Iyr18ZDfxs-5DRHtYl9upB' },
    { id: '83', title: 'Divorcio', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHUybAnDng5uPir-dpkmTbTwBVYDw9jYp9RsxICQAwSaR9MX7D' },
    { id: '84', title: 'Partiu America', image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSKo2YH0e1r24_C366j_uNpfNQPOO3U5cVqL6qkXwyZZf57XrI2' },
    { id: '85', title: 'Meu pai é um perigo', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzZpAQDwc5dp_-Bxa32o456_hMGPrRZ2DcfyEO1-5ZfLpxBGCR' },
    { id: '86', title: 'O candidato perfeito', image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQhwxdYG25jL0aSd3ydEBWRI3G8a7Ff7o9u3h9rat_gSTqYETk9' },
    { id: '87', title: 'Passagrana', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHPH-q5Sc-5dtTPX1RMnTG5HkdJtzOB4zXzjAn6FQ&usqp=CAE&s' },
    { id: '88', title: 'Minha mãe é uma peça', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZHANY_snfv70egUCamnC53zmyqabZMC39Bjho0ZkiRtdUFNCa' },
    { id: '89', title: 'Gente Grande', image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS3KC5CYzKSIx0aKLEL-lYfeeF7lfTqcd4nVGWOwO2IZaBzfdaz' },
    { id: '90', title: 'Todo mundo em pânico', image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ2CtYDjIMmLqklwJTi1EEtnNhHKV9-V8aL8x0zh-3_0OcF_NUM' },
    { id: '91', title: 'Os vampiros que se mordam', image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTTMUCF37JcqCtVK-yBi_7VWKP5rt0rZD9fmX1uianwGArITWtR' },
    { id: '92', title: 'Deu a louca em Hollywood', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLSm7emsnNy3OczrY-pcnuXpKz5rlq1q8GMgPXsmUO2gbJRjL5' },
    { id: '93', title: 'Todo mundo em pânico 4', image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTx-1JFxLUbWNd4BQqESlav6ycAFXHmHs2gnEjs_UDcWr6p3obN' },
    { id: '94', title: 'Os espartalhões', image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRNIkCKYr-wRbRxRs6XlR819Iv5K2zb41PY1skB9abiqjeOzAnP' },
    { id: '95', title: 'Todo mundo em pânico 3', image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSFWGzdf7NBfHTKzgjs7rSiaUDyih6zN1Ehq8Vs6SYRCSMzbUJz' },
    { id: '96', title: 'Não se aceitam devoluções', image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSZZ1cKKWuQe9MwFJsDsSp_l_s67NSGwG-V2hFv6tB8ewC_W4mL' },
    { id: '97', title: 'Ela é o cara', image: 'https://br.web.img3.acsta.net/medias/nmedia/18/87/02/43/19871212.jpg' },
    { id: '98', title: 'Operação Natal', image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRooVp3qWP5b803QGT3l0U95_epTKSbJ0-3XBh1HNZ7dRfm--ry' },
    { id: '99', title: 'Bobeou Dancou', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu-LABA5rlI18eQo2mk8vwnbvw8PJvnIHTkYhS7_66_y-ot77I' },
    { id: '100', title: 'Até que a sorte nos separe', image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQdRMYceE60sg0MFewT_470b9AF5sl_E9tlbreGPA9LVVrRwA2m' },

  ];

  // Função para agrupar os filmes em linhas de 4 para o grid
  const rows = [];
  for (let i = 0; i < movies.length; i += numColumns) {
    rows.push(movies.slice(i, i + numColumns));
  }

  return (
    // Container principal que ocupa toda a tela
    <View style={viewStyles.container}>
      {/* Configura a barra de status (hora, bateria, etc.) para texto claro */}
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Cabeçalho da aplicação */}
      <View style={viewStyles.header}>
        {/* Ícone de menu */}
        <TouchableOpacity style={viewStyles.iconButton}>
          <Link href='/tabs/configuracoes'>
            <Text style={textStyles.headerIcon}>☰</Text>
          </Link>
        </TouchableOpacity>
        {/* Título da tela */}
        <Text style={textStyles.headerTitle}>Filmes</Text>
        {/* Ícone de pesquisa */}
        <TouchableOpacity style={viewStyles.iconButton}>
          <Icon as={SearchIcon} className="text-typography-500 m-2 w-4 h-4" />
        </TouchableOpacity>
      </View>

      {/* Abas de categorias - ScrollView horizontal para permitir rolagem das categorias */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={viewStyles.categoryContainer}
      >
        <TouchableOpacity>
          <Link href="/tabs/acao">
            <Text style={[textStyles.categoryText, textStyles.activeCategory]}>AÇÃO</Text>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity>
          <Link href="/tabs/infantil">
            <Text style={[textStyles.categoryText, textStyles.activeCategory]}>INFANTIL</Text>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[textStyles.categoryText, textStyles.activeCategory]}>
            <Link href="/tabs/anime">ANIME</Link>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[textStyles.categoryText, textStyles.activeCategory]}>
            <Link href="/tabs/terror">TERROR</Link>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[textStyles.categoryText, textStyles.activeCategory]}>
            <Link href="/tabs/comedia">COMEDIA</Link>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[textStyles.categoryText, textStyles.activeCategory]}>
            <Link href="/tabs/drama">DRAMA</Link>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[textStyles.categoryText, textStyles.activeCategory]}>
            <Link href="/tabs/romance">ROMANCE</Link>
          </Text>
        </TouchableOpacity>
        {/* Adicione mais categorias aqui conforme necessário */}
      </ScrollView>

      {/* Grid de Filmes - ScrollView vertical para permitir rolagem dos pôsteres */}
      <ScrollView contentContainerStyle={viewStyles.movieGridContainer}>
        {rows.map((row, rowIndex) => (
          // Cada View representa uma linha do grid de filmes
          <View key={rowIndex} style={viewStyles.movieRow}>
            {row.map(movie => (
              // Cada TouchableOpacity representa um pôster de filme clicável
              <TouchableOpacity key={movie.id} style={viewStyles.moviePosterContainer}>
                {/* Imagem do pôster do filme */}
                {/* source={{ uri: movie.image }} é usado para carregar imagens de URLs */}
                <Image source={{ uri: movie.image }} style={imageStyles.moviePoster} />
              </TouchableOpacity>
            ))}
            {/* Adiciona "espaços vazios" para manter o alinhamento do grid
                se a última linha não tiver 4 filmes */}
            {row.length < numColumns && Array(numColumns - row.length).fill(null).map((_, index) => (
              <View key={`placeholder-${rowIndex}-${index}`} style={viewStyles.moviePosterContainer} />
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

// Estilos separados por tipo para evitar conflitos de tipos
const viewStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: StatusBar.currentHeight || 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start', // Corrigido de 'left' para 'flex-start'
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#333',
  },
  movieGridContainer: {
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  movieRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  moviePosterContainer: {
    width: posterWidth,
    aspectRatio: 2 / 3,
    borderRadius: 1.5,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#1a1a1a',
    marginHorizontal: itemSpacing / 2,
  },
  iconButton: {
    padding: 5,
    color: '#fff',
  },
});

const textStyles = StyleSheet.create({
  headerIcon: {
    color: '#fff',
    fontSize: 24,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  categoryText: {
    color: '#888',
    fontSize: 16,
    marginRight: 20,
    paddingBottom: 5,
  },
  activeCategory: {
    color: '#fff',
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: 'red',
  },
  movieTitleOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: '#fff',
    fontSize: 9,
    paddingVertical: 5,
    paddingHorizontal: 5,
    textAlign: 'center',
  },
});

const imageStyles = StyleSheet.create({
  moviePoster: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default MovieScreen;