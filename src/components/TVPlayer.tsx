import React, { useState } from 'react';
import { Volume2, VolumeX, Play, Pause, Power, Settings } from 'lucide-react';

interface Channel {
  id: string;
  name: string;
  thumbnail: string;
}

const TVPlayer: React.FC = () => {
  const [isPowered, setIsPowered] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  
  const channels: Channel[] = [
    {
      id: '1',
      name: 'Channel 1',
      thumbnail: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
    },
    {
      id: '2',
      name: 'Channel 2',
      thumbnail: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b',
    },
    {
      id: '3',
      name: 'Channel 3',
      thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f',
    },
  ];

  const [currentChannel, setCurrentChannel] = useState(channels[0]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-8">
      <div className="w-full max-w-4xl bg-black rounded-3xl p-8 shadow-2xl">
        {/* TV Frame */}
        <div className="relative aspect-video bg-gray-950 rounded-2xl overflow-hidden border-4 border-gray-800">
          {/* Screen Content */}
          <div className={`w-full h-full transition-all duration-500 ${isPowered ? 'opacity-100' : 'opacity-0'}`}>
            {isPowered && (
              <img
                src={currentChannel.thumbnail}
                alt="Channel Preview"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Controls Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-white hover:text-blue-400 transition"
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-white hover:text-blue-400 transition"
                  >
                    {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-24 accent-blue-500"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsPowered(!isPowered)}
                  className={`rounded-full p-2 transition ${
                    isPowered ? 'text-green-400 hover:text-green-300' : 'text-red-400 hover:text-red-300'
                  }`}
                >
                  <Power size={24} />
                </button>
                <Settings size={24} className="text-white hover:text-blue-400 transition cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        {/* Channel List */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          {channels.map((channel) => (
            <button
              key={channel.id}
              onClick={() => setCurrentChannel(channel)}
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
      </div>
    </div>
  );
};

export default TVPlayer;