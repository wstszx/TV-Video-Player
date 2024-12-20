import React from 'react';
import { Channel } from '../types/channel';

interface ChannelListProps {
  channels: Channel[];
  currentChannel: Channel;
  onChannelSelect: (channel: Channel) => void;
}

const ChannelList: React.FC<ChannelListProps> = ({
  channels,
  currentChannel,
  onChannelSelect,
}) => {
  return (
    <div className="mt-6 grid grid-cols-3 gap-4">
      {channels.map((channel) => (
        <button
          key={channel.id}
          onClick={() => onChannelSelect(channel)}
          className={`p-2 rounded-lg transition ${
            currentChannel.id === channel.id
              ? 'bg-blue-500 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          {channel.name}
        </button>
      ))}
    </div>
  );
};