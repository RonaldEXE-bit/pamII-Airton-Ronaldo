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
    { id: '121', title: 'Forrest Gump', image: 'https://images.justwatch.com/poster/301039564/s718/forrest-gump-o-contador-de-historias.jpg' },
    { id: '122', title: 'A beal e a Fera', image: 'https://br.web.img3.acsta.net/pictures/17/01/09/12/22/442219.jpg' },
    { id: '123', title: 'Tempos Modernos', image: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Modern_Times_poster.jpg' },
    { id: '124', title: 'Titanic', image: 'https://upload.wikimedia.org/wikipedia/pt/2/22/Titanic_poster.jpg' },
    { id: '125', title: 'Luzes da Cidade', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/City_Lights_%281931_theatrical_poster_-_retouched%29.jpg/1200px-City_Lights_%281931_theatrical_poster_-_retouched%29.jpg' },
    { id: '126', title: 'Diário de uma Paixão', image: 'https://m.media-amazon.com/images/M/MV5BZjY0YzYwMDQtYmJjNi00Yzg5LWE3OTYtNDQzOGYxN2JiNGQ4XkEyXkFqcGc@._V1_.jpg' },
    { id: '127', title: 'Questão de Tempo', image: 'https://br.web.img2.acsta.net/c_310_420/pictures/210/530/21053062_20131025204305591.jpg' },
    { id: '128', title: '...E o Vento Levou', image: 'https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/90/95/72/20122043.jpg' },
    { id: '129', title: 'Crepúsculo dos Deuses', image: 'https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/95/48/07/20407374.jpg' },
    { id: '130', title: 'Orgulho e Preconceito', image: 'https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/87/84/14/20028635.jpg' },
    { id: '131', title: 'Quanto Mais Quente Melhor', image: 'https://br.web.img2.acsta.net/c_310_420/medias/nmedia/18/90/24/45/20194712.jpg' },
    { id: '132', title: 'O Curioso Caso de Benjamin Button', image: 'https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/87/04/17/19871392.jpg' },
    { id: '133', title: 'Uma Linda Mulher', image: 'https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/95/60/14/20417708.jpg' },
    { id: '134', title: 'Edwar: Mãos de Tesoura', image: 'https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/91/33/63/20140763.jpg' },
    { id: '135', title: 'As Vantagens de Ser Invisível', image: 'https://br.web.img2.acsta.net/c_310_420/medias/nmedia/18/90/78/52/20295598.jpg' },
    { id: '136', title: 'Nasce uma Estrela', image: 'https://br.web.img3.acsta.net/c_310_420/pictures/18/06/06/19/11/3472306.jpg' },
    { id: '137', title: 'O Segredo dos Seus Olhos', image: 'https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/87/31/87/19874264.jpg' },
    { id: '138', title: 'Dirty Dancing - Ritmo Quente', image: 'https://br.web.img2.acsta.net/c_310_420/medias/nmedia/18/91/37/92/20142319.jpg' },
    { id: '139', title: 'À Prova de Fogo', image: 'https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/97/26/66/20519352.jpg' },
    { id: '140', title: 'O Artista', image: 'https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/87/37/13/20039798.jpg' },
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