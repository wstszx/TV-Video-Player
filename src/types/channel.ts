export interface Channel {
  id: string;
  name: string;
  url: string;
  description?: string;
  thumbnail: string;
  type: 'youtube' | 'image';
  tags: string[];
  category?: string;
  isEnabled: boolean;
  lastModified: string;
  createdAt: string;
}

export interface ChannelHistory {
  id: string;
  channelId: string;
  changeType: 'create' | 'update' | 'delete';
  changes: Partial<Channel>;
  timestamp: string;
  userId: string;
}

export type ValidationResult = {
  isValid: boolean;
  errors: string[];
}