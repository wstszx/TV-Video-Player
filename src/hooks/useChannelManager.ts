import { useState, useEffect } from 'react';
import { Channel, ChannelHistory } from '../types/channel';

export const useChannelManager = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [history, setHistory] = useState<ChannelHistory[]>([]);

  // Load channels from localStorage on mount
  useEffect(() => {
    const savedChannels = localStorage.getItem('channels');
    if (savedChannels) {
      setChannels(JSON.parse(savedChannels));
    }
  }, []);

  // Save channels to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('channels', JSON.stringify(channels));
  }, [channels]);

  const addChannel = (channel: Channel) => {
    setChannels(prev => [...prev, channel]);
    addToHistory({
      id: Date.now().toString(),
      channelId: channel.id,
      changeType: 'create',
      changes: channel,
      timestamp: new Date().toISOString(),
      userId: 'current-user' // In a real app, this would come from auth
    });
  };

  const updateChannel = (updatedChannel: Channel) => {
    setChannels(prev => prev.map(ch => 
      ch.id === updatedChannel.id ? { ...updatedChannel, lastModified: new Date().toISOString() } : ch
    ));
    addToHistory({
      id: Date.now().toString(),
      channelId: updatedChannel.id,
      changeType: 'update',
      changes: updatedChannel,
      timestamp: new Date().toISOString(),
      userId: 'current-user'
    });
  };

  const deleteChannel = (channelId: string) => {
    const channel = channels.find(ch => ch.id === channelId);
    if (channel) {
      setChannels(prev => prev.filter(ch => ch.id !== channelId));
      addToHistory({
        id: Date.now().toString(),
        channelId,
        changeType: 'delete',
        changes: channel,
        timestamp: new Date().toISOString(),
        userId: 'current-user'
      });
    }
  };

  const addToHistory = (entry: ChannelHistory) => {
    setHistory(prev => [...prev, entry]);
  };

  return {
    channels,
    history,
    addChannel,
    updateChannel,
    deleteChannel
  };
};