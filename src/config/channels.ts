import { Channel } from '../types/channel';

export const defaultChannels: Channel[] = [
  {
    id: '1',
    name: 'Lofi Girl',
    thumbnail: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
    url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
    type: 'youtube'
  },
  {
    id: '2',
    name: 'Nature Live',
    thumbnail: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b',
    url: 'https://www.youtube.com/watch?v=4qM9fO1ZCQ0',
    type: 'youtube'
  },
  {
    id: '3',
    name: 'Demo Channel',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f',
    url: '',
    type: 'image'
  }
];