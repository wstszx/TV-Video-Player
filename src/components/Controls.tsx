import React from 'react';
import { Volume2, VolumeX, Play, Pause, Power, Settings } from 'lucide-react';

interface ControlsProps {
  isPlaying: boolean;
  isPowered: boolean;
  isMuted: boolean;
  volume: number;
  onPlayToggle: () => void;
  onPowerToggle: () => void;
  onMuteToggle: () => void;
  onVolumeChange: (value: number) => void;
  onSettingsClick: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  isPlaying,
  isPowered,
  isMuted,
  volume,
  onPlayToggle,
  onPowerToggle,
  onMuteToggle,
  onVolumeChange,
  onSettingsClick,
}) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onPlayToggle}
            className="text-white hover:text-blue-400 transition"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={onMuteToggle}
              className="text-white hover:text-blue-400 transition"
            >
              {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={(e) => onVolumeChange(Number(e.target.value))}
              className="w-24 accent-blue-500"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={onPowerToggle}
            className={`rounded-full p-2 transition ${
              isPowered ? 'text-green-400 hover:text-green-300' : 'text-red-400 hover:text-red-300'
            }`}
          >
            <Power size={24} />
          </button>
          <Settings
            size={24}
            className="text-white hover:text-blue-400 transition cursor-pointer"
            onClick={onSettingsClick}
          />
        </div>
      </div>
    </div>
  );
};