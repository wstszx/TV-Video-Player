import { Channel, ValidationResult } from '../types/channel';

export const validateYoutubeUrl = (url: string): boolean => {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
  return youtubeRegex.test(url);
};

export const validateChannel = (channel: Partial<Channel>): ValidationResult => {
  const errors: string[] = [];

  if (!channel.name?.trim()) {
    errors.push('Channel name is required');
  }

  if (!channel.url?.trim()) {
    errors.push('Channel URL is required');
  } else if (channel.type === 'youtube' && !validateYoutubeUrl(channel.url)) {
    errors.push('Invalid YouTube URL format');
  }

  if (!channel.type) {
    errors.push('Channel type is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};