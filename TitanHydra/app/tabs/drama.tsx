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
import {
  Dimensions, // Para obter a largura da tela e calcular tamanhos responsivos
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
    { id: '101', title: '7 prisioneiros', image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTWXJZF1-IL8SL7ASz3l4J5jHx6jcjXy0oTomc8HoEy2E4q1cXX' },
    { id: '102', title: 'Historia de um casamento', image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT-ulgxB7Zm7IwKO-xjTcDLvFJQaYp0wG-A0U8VreLpJjRejqyd' },
    { id: '103', title: 'A vida é invisivel', image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSBgLRsv6l13oka7uP1Q6Lh4GFuHgRArdZikYckLS1UZDU5fFBK' },
    { id: '104', title: 'O ultimo paraíso', image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRsxlcId30vIWwJUFKl1TCpm5O38yotiwmKVsMtBDAd65TB6cyo' },
    { id: '105', title: 'Como eu era antes de você', image: 'https://m.media-amazon.com/images/M/MV5BMjQ4ZGMyZjYtNDYwNC00MmUyLWE4ZWQtM2ViMTQ0OTc1M2U1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
    { id: '106', title: 'A espera de um milagre', image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTgfL8fCk0-J2UAiA87wBdW5_z66tbJuj6QZX-7fszBkwnuBAcd' },
    { id: '107', title: 'Que horas ela volta?', image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQvgtwwMd9geVvCir9mg0NQG3YWoM4cmxUJP-FJul508Ov70FSH' },
    { id: '108', title: 'O segredo dos seus olhos', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV_fup5agawL5_PC7QqIF0dx8rp0iW0H7gYd8JPzsbfOH90Pjp' },
    { id: '109', title: 'O lobo atrás da porta', image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQEs-mmvyrQhA-k4fc5xLPqE6UPCTUDTX93S2LNytY8zKIFC4PR' },
    { id: '110', title: 'Inéxplicavel', image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSocUp0DtVKlFUltjr7FXbg_ue45WXfuWeGNMyMIl_UQ4h3RekV' },
    { id: '111', title: 'Sonhos roubados', image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS0GkIuWAW-F8BWuIjM188NGXHUXMovQ8DgkidJ2khGmMPZ1src' },
    { id: '112', title: 'Taxi Driver - Motorista de Taxi', image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQZm_Vrjc_j2EKMFkJe06rSXjyCibwDfdK4UgTcWv9_INX-E7o_' },
    { id: '113', title: 'O caso de Cristo', image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRZN7lC7eepF0vD8PkbU7-CDv9KYidIY2ZN2dpkoNbxf9g3byr5' },
    { id: '114', title: 'O desconhecido', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS0KlK7ko9PFJS-3a0AhnTVwZKKVut5AX5OOB2J23AWudc5U7_' },
    { id: '115', title: 'Fome de Sucesso', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzrLEEEoqHEqYZVwcCDkH1VEAuZMMUvi6vLYG182unu9QJu1_S' },
    { id: '116', title: '127 Horas', image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRr7cRamJF_LpCMMbS8sw2flVWWNKSgTaayKp9MH-zvIAJowzh7' },
    { id: '117', title: 'Meu nome é radio', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5slb2qgxwuLrAMZHoRzbc1ZDUxw3BJrWoi9uey21CcLcYPyCH' },
    { id: '118', title: 'As nadadoras', image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS__r48C8XfRB_v6OvkoXwtrezt_FOEUoMZbJN0NBJ-zeCa5yBk' },
    { id: '119', title: 'Nada a perder', image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTprlPN9XtHUKjfIhsxy26eA5zpguBImR8wUpWcsg3v89efKL8l' },
    { id: '120', title: 'Um sonho possivel', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmxHTLKIqSa6s-zvcNrmfrFpJXinYE3oeP-GT5pNpGFzQNquLz' },
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