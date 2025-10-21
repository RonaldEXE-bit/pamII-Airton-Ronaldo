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
  // Dados de exemplo para os filmes. Em uma aplicação real, estes dados viriam de uma API.
  // As URLs das imagens foram substituídas por placeholders para garantir a compilação no ambiente.
  const movies = [
    { id: '21', title: 'Pokêmon: O Filme', image: 'https://play-lh.googleusercontent.com/BEgD7H9DDBp581nxdJ1zCcTmObenUvo3cd7tLGkpx9_NT412i5NS-X_n-8AmpcA9biX2' },
    { id: '22', title: 'O Espanta Tubarões', image: 'https://upload.wikimedia.org/wikipedia/pt/3/30/Shark_Tale.jpg' },
    { id: '23', title: 'Por Água Abaixo', image: 'https://upload.wikimedia.org/wikipedia/pt/a/a0/PorAguaAbaixo.jpg' },
    { id: '24', title: 'Bee Movie', image: 'https://upload.wikimedia.org/wikipedia/pt/f/f9/Bee_movie.jpg' },
    { id: '25', title: 'Bob Esponja: O filme', image: 'https://upload.wikimedia.org/wikipedia/pt/2/2f/6875.jpg' },
    { id: '26', title: 'Monstros S.A', image: 'https://upload.wikimedia.org/wikipedia/pt/7/75/Monsters_Inc.jpg' },
    { id: '27', title: 'Carros', image: 'https://upload.wikimedia.org/wikipedia/pt/9/9b/Carros_p%C3%B4ster.jpg' },
    { id: '28', title: 'Garfield: Fora de Casa', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0F5H6gdg59kKwY0XkPNu3Ipd4-HqjSj77kw&s' },
    { id: '29', title: 'Meu Malvado Favorito 2', image: 'https://upload.wikimedia.org/wikipedia/pt/2/26/Despicable_Me_2.jpg' },
    { id: '30', title: 'Os Caras Malvados 2', image: 'https://tse2.mm.bing.net/th/id/OIF.kUc6I94HAXdWY07RvxQPfQ?rs=1&pid=ImgDetMain&o=7&rm=3' },
    { id: '31', title: 'Gato de Botas 2', image: 'https://www.atoupeira.com.br/wp-content/uploads/2023/01/gato-de-botas-2-poster-nacional-critica.jpg' },
    { id: '32', title: 'Up: Altas Aventuras', image: 'https://upload.wikimedia.org/wikipedia/pt/a/a8/Up_p%C3%B4ster.jpg' },
    { id: '33', title: 'Procurando Nemo', image: 'https://upload.wikimedia.org/wikipedia/pt/2/29/Finding_Nemo.jpg' },
    { id: '34', title: 'Viva: A vida é uma Festa', image: 'https://upload.wikimedia.org/wikipedia/pt/a/ae/Cocofilme.png' },
    { id: '35', title: 'Rango', image: 'https://m.media-amazon.com/images/M/MV5BMTc4NjEyODE1OV5BMl5BanBnXkFtZTcwMjYzNTkxNA@@._V1_.jpg' },
    { id: '36', title: 'Wall-e', image: 'https://play-lh.googleusercontent.com/s90tRLDG8npS1xHbN3Hu7c7yBdLyv05CuLOwIjAR1Lsk8fj-jCiPiMkdbHamxLPQDTBQ' },
    { id: '37', title: 'Os Incriveis', image: 'https://upload.wikimedia.org/wikipedia/pt/4/4b/Os_Incr%C3%ADveis.jpg' },
    { id: '38', title: 'Angry Birds: O filme', image: 'https://upload.wikimedia.org/wikipedia/pt/e/e5/Angry_birds_poster.jpg' },
    { id: '39', title: 'Meu Malvado Favorito 4', image: 'https://br.web.img3.acsta.net/img/6c/71/6c71afa89fd8ed8999b3e04d8d794a0e.jpg' },
    { id: '40', title: 'Ratatouille', image: 'https://www.papodecinema.com.br/wp-content/uploads/2012/08/20181221-medium-ratatouille-poster-size-12-inch-x-18-inch-pack-of-1-original-imafy8d2aqshpguj.webp' },
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