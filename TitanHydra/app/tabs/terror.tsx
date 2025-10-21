import { Link } from 'expo-router';
import { Icon } from '@/components/ui/icon';
import { SearchIcon } from '@/components/ui/icon';
import { useFonts } from 'expo-font';

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
    { id: '61', title: 'O Exorcista', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsu2p-pcjoyi0IbNcKmCHSrij53oAZsjXJGg&s' },
    { id: '62', title: 'It A coisa', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxAxA5zZf_CVkna4nrwVFhMmi721ppW6jGGA&s' },
    { id: '63', title: 'Invocação do Mal 2', image: 'https://br.web.img2.acsta.net/c_310_420/pictures/16/04/18/20/43/025084.jpg' },
    { id: '64', title: 'Invasão Zumbi', image: 'https://play-lh.googleusercontent.com/yBXJ5Jyo2oFdsMTxYGOtZj_F7oqIA550M2mZZKmkXgWxZSCQzRjolQms26WHqM3wzaKT' },
    { id: '65', title: 'guerra mundial z', image: 'https://media.fstatic.com/eP-Fj4_ScwzhsRHA7vPgAylqz8o=/210x312/smart/filters:format(webp)/media/movies/covers/2013/06/guerra-mundial-z_t36965_6.jpg' },
    { id: '66', title: 'O Homem nas Trevas', image: 'https://br.web.img2.acsta.net/pictures/16/08/22/22/44/279579.jpg' },
    { id: '67', title: 'O Bebê de Rosemary', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCdnz3VFA7wUOZklyiDhMqqEMgMk1CmA-lqw&s' },
    { id: '68', title: 'Final Destination Bloodlines', image: 'https://upload.wikimedia.org/wikipedia/pt/thumb/9/99/Premoni%C3%A7%C3%A3o_6_Lacosdesangue.webp/250px-Premoni%C3%A7%C3%A3o_6_Lacosdesangue.webp.png' },
    { id: '69', title: 'Slender Man', image: 'https://br.web.img3.acsta.net/pictures/18/01/22/20/42/2800883.jpg' },
    { id: '70', title: 'Island Escape', image: 'https://m.media-amazon.com/images/M/MV5BZjQyMGNjZDgtMjZlMy00YTgxLTg5M2QtNGVjMDQ1NTU5NGY4XkEyXkFqcGc@._V1_.jpg' },
    { id: '71', title: 'A Sombra do Mal', image: 'https://www.papodecinema.com.br/wp-content/uploads/2024/04/20240430-a-sombra-do-mal-papo-de-cinema-cartaz.webp' },
    { id: '72', title: 'Stopmotion', image: 'https://m.media-amazon.com/images/M/MV5BMWU4Zjk5MGQtNmViOC00MGI1LTg0YjUtMWJjOTAwYTllMTBjXkEyXkFqcGc@._V1_.jpg' },
    { id: '73', title: 'Dark Parasite', image: 'https://m.media-amazon.com/images/S/pv-target-images/d263c5fbd90d92395bfa0109601e9c0fd2ad2275ea74b88e2f8f1a0a436ad51a.jpg' },
    { id: '74', title: 'Skyline', image: 'https://br.web.img2.acsta.net/medias/nmedia/18/87/90/81/19962780.jpg' },
    { id: '75', title: 'Good Boy', image: 'https://images.amcsvod.io/0aa770912cf93137_boxart.jpg?w=600&h=900&fit=crop&crop=edges&auto=format,compress' },
    { id: '76', title: 'White Sky', image: 'https://m.media-amazon.com/images/S/pv-target-images/8124a66069e26c1779a7659d00412bebf7a43bec148d822077e35f97c31bf646._SX1080_FMjpg_.jpg' },
    { id: '77', title: 'Halloween Massacre', image: 'https://m.media-amazon.com/images/S/pv-target-images/42eda516ae45a766270ad09d9e50df00212c1a7dc236bf418a25f2a80cdf3909.jpg' },
    { id: '78', title: "Five Nights at Freddy's", image: 'https://sm.ign.com/t/ign_br/photo/default/fnf-tsr1sheet-freddy1-dateonly-rgb-2-1684318766116_ppp9.600.jpg' },
    { id: '79', title: 'Talk to Me', image: 'https://pics.filmaffinity.com/Haablame-151676190-large.jpg' },
    { id: '80', title: 'Feriado Sangrento', image: 'https://br.web.img3.acsta.net/pictures/23/10/04/22/04/2117619.jpg' },
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