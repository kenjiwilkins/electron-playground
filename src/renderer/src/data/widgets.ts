import { Widget } from '../types/widget'

export const WIDGETS: Widget[] = [
  { id: 'clock',      name: 'Clock',      icon: '🕐', description: 'World clocks & time zones', accent: '#FF9500' },
  { id: 'weather',    name: 'Weather',    icon: '🌤',  description: 'Local forecast',             accent: '#007AFF' },
  { id: 'notes',      name: 'Notes',      icon: '📝', description: 'Quick scratch pad',           accent: '#34C759' },
  { id: 'calculator', name: 'Calculator', icon: '🔢', description: 'Basic arithmetic',            accent: '#5856D6' },
  { id: 'tasks',      name: 'Tasks',      icon: '✅', description: 'To-do list',                  accent: '#FF2D55' },
  { id: 'timer',      name: 'Timer',      icon: '⏱',  description: 'Pomodoro & countdown',        accent: '#FF6B35' },
  { id: 'system',     name: 'System',     icon: '📊', description: 'CPU, RAM & disk stats',       accent: '#30D158' },
  { id: 'music',      name: 'Music',      icon: '🎵', description: 'Playback controls',           accent: '#BF5AF2' },
]
