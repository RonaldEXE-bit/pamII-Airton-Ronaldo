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
    { id: '41', title: 'Princesa Mononoke', image: 'https://upload.wikimedia.org/wikipedia/pt/e/ec/Mononoke_Hime_p%C3%B4ster.png' },
    { id: '42', title: 'Akira', image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQb9fRsL5yPnkL99D0IZJbQb9PaepHmXiOS44_n33pcTcwXuVtQ' },
    { id: '43', title: 'Ponyo: Uma Amizade que veio do mar', image: 'https://upload.wikimedia.org/wikipedia/pt/e/e2/Ponyo_p%C3%B4ster.png' },
    { id: '44', title: 'Demon Slayer: Mugen Train: O filme', image: 'https://upload.wikimedia.org/wikipedia/pt/5/57/P%C3%B4ster_Kimetsu_no_Yaiba_Mugen_Ressha-hen.jpg' },
    { id: '45', title: 'A viagem de Chihiro', image: 'https://br.web.img3.acsta.net/pictures/210/527/21052756_20131024195513383.jpg' },
    { id: '46', title: 'The End of Evangelion', image: 'https://translate.google.com/website?sl=en&tl=pt&hl=pt&client=srp&u=https://upload.wikimedia.org/wikipedia/en/9/9e/Eoeposter.JPG' },
    { id: '47', title: 'Além do Céu', image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ5KGkwkpaS2HuExPK18PuENYaAkCh5s0uhdADHSuMEFQGz-bII' },
    { id: '48', title: 'Naruto: O Filme', image: 'https://upload.wikimedia.org/wikipedia/pt/5/59/Naruto_the_Movie_cover.jpg' },
    { id: '49', title: 'My Hero Academia. O Despertar dos Heróis', image: 'https://translate.google.com/website?sl=en&tl=pt&hl=pt&client=srp&u=https://static.wikia.nocookie.net/bokunoheroacademia/images/e/e9/Heroes_Rising_Promotional_Poster_2.png/revision/latest?cb%3D20190927203442' },
    { id: '50', title: 'Jujutsu Kaisen 0: O filme', image: 'https://upload.wikimedia.org/wikipedia/pt/1/19/Jujutsu_Kaisen_0.jpg' },
    { id: '51', title: 'O Estranho na Praia', image: 'https://m.media-amazon.com/images/M/MV5BMWM1ZTFkNDItNzY4MC00ZDljLWFiM2UtYWZhMDkzOWMwN2RiXkEyXkFqcGc@._V1_QL75_UY281_CR4,0,190,281_.jpg' },
    { id: '52', title: 'Neon Genesis Evangelion: Death & Rebirth', image: 'https://upload.wikimedia.org/wikipedia/it/d/d2/Deathrebirth.jpg' },
    { id: '53', title: 'Bleach: The DiamondDust Rebellion', image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSAJ34vXBW9GbAAtB7aoY4YVYjQvFqh4zyPcE6xtBcQxNJQ4kVO' },
    { id: '54', title: 'One Piece: Stampede', image: 'https://m.media-amazon.com/images/S/pv-target-images/592dee431ac54faff4a9cbc72d816cdaea4615e63b51e42d699752a2b0f5aabe.jpg' },
    { id: '55', title: 'O tempo com você', image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRPJOkUHeyiw_KO9MATJXet17z994MRLUG2D8D8MEmqkYEXi4wP' },
    { id: '56', title: 'Sailor Moon Eternal', image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQDPy5NgIk00pxT_bbGJwsgpaMBfBxnBSpszC4UbPCu8MKtC7zw' },
    { id: '57', title: 'Os Sete Pecados Capitais', image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR1hVftAcigip5AC5KyeMD8y8x82ZardhCyY9kuILeLMrbJRfaA' },
    { id: '58', title: 'O castelo animado', image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR0Pxx4UCeEGsmDi8Y13i1WhaY085t_cQu6CpohK0nyS8_I0zbz' },
    { id: '59', title: 'Boruto: Naruto the movie', image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcThUknWKOMknf8UAbUQbrpfXvXfVuYJ52Adr54eafOJ8fYdRcRt' },
    { id: '60', title: 'Naruto Shippuden: O filme', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScszQjbnsxYKqDNbcmv1QDHXorJMklMOldzWp5clThJjDCNmxC' },
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