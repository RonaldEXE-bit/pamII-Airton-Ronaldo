export const ICON_DATABASE = {
  // Streaming
  'netflix': { type: 'material-community', name: 'netflix', color: '#E50914' },
  'spotify': { type: 'material-community', name: 'spotify', color: '#1DB954' },
  'youtube': { type: 'material-community', name: 'youtube', color: '#FF0000' },
  'disney': { type: 'material-community', name: 'disney', color: '#113CCF' },
  'prime video': { type: 'material-community', name: 'amazon', color: '#00A8E1' },
  
  // Software
  'adobe': { type: 'material-community', name: 'adobe', color: '#FF0000' },
  'microsoft': { type: 'material-community', name: 'microsoft', color: '#0078D4' },
  'google': { type: 'material-community', name: 'google', color: '#4285F4' },
  
  // Games
  'steam': { type: 'material-community', name: 'steam', color: '#000000' },
  'xbox': { type: 'material-community', name: 'microsoft-xbox', color: '#107C10' },
  
  // Default por categoria
  'default_streaming': { type: 'material', name: 'television', color: '#2563EB' },
  'default_software': { type: 'material', name: 'laptop', color: '#10B981' },
  'default_games': { type: 'material-community', name: 'gamepad', color: '#F59E0B' },
  'default_music': { type: 'material', name: 'music', color: '#8B5CF6' },
  'default_other': { type: 'material', name: 'cube', color: '#6B7280' }
};

export const CATEGORIES = {
  streaming: { name: 'Streaming', color: '#2563EB', icon: 'television' },
  software: { name: 'Software', color: '#10B981', icon: 'laptop' },
  games: { name: 'Games', color: '#F59E0B', icon: 'gamepad' },
  music: { name: 'Música', color: '#8B5CF6', icon: 'music' },
  other: { name: 'Outros', color: '#6B7280', icon: 'cube' }
};

export const getSubscriptionIcon = (name, category = 'other') => {
  const key = name.toLowerCase();
  return ICON_DATABASE[key] || ICON_DATABASE[`default_${category}`] || ICON_DATABASE.default_other;
};