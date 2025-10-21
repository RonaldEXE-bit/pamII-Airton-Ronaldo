import { Link } from 'expo-router';
import { useFonts } from 'expo-font';
import { Icon } from '@/components/ui/icon';
import { SearchIcon } from '@/components/ui/icon';

import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black, } from "@expo-google-fonts/inter";
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions // Para obter a largura da tela e calcular tamanhos responsivos
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
    { id: '1', title: 'Chefes de Estado', image: 'https://br.web.img3.acsta.net/img/0f/12/0f125b89a016dc07513b81f65ac3065e.jpg' },
    { id: '2', title: 'Superman', image: 'https://br.web.img3.acsta.net/img/86/64/8664d1b110b95eb32313683f1a655f5f.jpg' },
    { id: '3', title: 'Vingadores: Ultimato', image: 'https://upload.wikimedia.org/wikipedia/pt/thumb/9/9b/Avengers_Endgame.jpg/250px-Avengers_Endgame.jpg' },
    { id: '4', title: 'Velozes e Furiosos 10', image: 'https://m.media-amazon.com/images/S/pv-target-images/848a155842f8331062bd190b1584e3b152af0271468312ce6b0def838721592b.jpg' },
    { id: '5', title: 'Esquadrão Suicida', image: 'https://br.web.img2.acsta.net/c_310_420/pictures/21/06/22/22/19/1495362.jpg' },
    { id: '6', title: 'Gladiador 2', image: 'https://images.justwatch.com/poster/322099104/s718/gladiator-2.jpg' },
    { id: '7', title: 'Bad Boys: Hasta la Muerte', image: 'https://m.media-amazon.com/images/M/MV5BZWNjZWUwNDgtYTM4ZC00Zjk0LTg3ZWItNGEyZmVkZTIxZDk0XkEyXkFqcGc@._V1_.jpg' },
    { id: '8', title: 'John Wick: Baba Yaga', image: 'https://www.ucicinemas.com.br/Content/Upload/Filmes/Posters/9937/filme_9937.jpg' },
    { id: '9', title: 'Liga da Justiça', image: 'https://play-lh.googleusercontent.com/e9cKG_aLFwCNBKZQqFF9kvqf5OG3vhkeSFdVU4zItFdqUIsirjreZdFG37Jljl1Agqhj=w240-h480-rw' },
    { id: '10', title: 'Adão Negro', image: 'https://cinema10.com.br/upload/featuredImage.php?url=https%3A%2F%2Fcinema10.com.br%2Fupload%2Ffilmes%2Ffilmes_12272_13737-medio.jpg' },
    { id: '11', title: 'Batman', image: 'https://br.web.img3.acsta.net/pictures/22/03/02/19/26/3666027.jpg' },
    { id: '12', title: 'Mulher-Maravilha', image: 'https://images.justwatch.com/poster/9338913/s718/mulher-maravilha-2017.jpg' },
    { id: '13', title: 'Homem de Ferro 3', image: 'https://upload.wikimedia.org/wikipedia/pt/1/19/Iron_Man_3_poster.jpg' },
    { id: '14', title: 'Capitão America: O soldado invernal', image: 'https://upload.wikimedia.org/wikipedia/pt/e/e8/Captain_America_The_Winter_Soldier.jpg' },
    { id: '15', title: 'Rango', image: 'https://m.media-amazon.com/images/M/MV5BMTc4NjEyODE1OV5BMl5BanBnXkFtZTcwMjYzNTkxNA@@._V1_.jpg' },
    { id: '16', title: 'Wall-e', image: 'https://play-lh.googleusercontent.com/s90tRLDG8npS1xHbN3Hu7c7yBdLyv05CuLOwIjAR1Lsk8fj-jCiPiMkdbHamxLPQDTBQ' },
    { id: '17', title: 'Jurassic World', image: 'https://upload.wikimedia.org/wikipedia/en/a/a5/Jurassic_World_Rebirth_poster.jpg' },
    { id: '18', title: '9-A Salvação', image: 'https://m.media-amazon.com/images/S/pv-target-images/8891f293384aa684661951363c1f2db17c9f84048fb1606f8d5063af9df16a09.jpg' },
    { id: '19', title: 'Karate Kid', image: 'https://m.media-amazon.com/images/S/pv-target-images/2600a1b1a374a2a0026bd9ad99ce6cc6070fdd4e78c7cd4614d30633d7e3fb39.jpg' },
    { id: '20', title: 'Ratatouille', image: 'https://www.papodecinema.com.br/wp-content/uploads/2012/08/20181221-medium-ratatouille-poster-size-12-inch-x-18-inch-pack-of-1-original-imafy8d2aqshpguj.webp' },
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
            <Text style={textStyles.categoryText}>INFANTIL</Text>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={textStyles.categoryText}>
            <Link href="/tabs/anime">ANIME</Link>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={textStyles.categoryText}>
            <Link href="/tabs/terror">TERROR</Link>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={textStyles.categoryText}>
            <Link href="/tabs/comedia">COMEDIA</Link>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={textStyles.categoryText}>
            <Link href="/tabs/drama">DRAMA</Link>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={textStyles.categoryText}>
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