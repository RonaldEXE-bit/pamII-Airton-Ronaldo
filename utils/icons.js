import Icon from 'react-native-vector-icons/FontAwesome';

export function getServiceIcon(serviceName, size = 40) {
  const name = serviceName.toLowerCase();

  if (name.includes('youtube')) {
    return <Icon name="youtube-play" size={size} color="#FF0000" />;
  }
  if (name.includes('spotify')) {
    return <Icon name="spotify" size={size} color="#1DB954" />;
  }
  if (name.includes('netflix')) {
    return <Icon name="film" size={size} color="#E50914" />;
  }
  if (name.includes('amazon')) {
    return <Icon name="amazon" size={size} color="#FF9900" />;
  }
  if (name.includes('disney')) {
    return <Icon name="star" size={size} color="#1E40AF" />;
  }

  // Ícone padrão
  return <Icon name="credit-card" size={size} color="#374151" />;
}
