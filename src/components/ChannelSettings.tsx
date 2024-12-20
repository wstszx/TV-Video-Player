import React, { useState } from 'react';
import { Channel } from '../types/channel';
import { validateChannel } from '../utils/channelValidation';
import { X, Plus, Save, Trash2, Upload, Download } from 'lucide-react';

interface ChannelSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  channels: Channel[];
  onChannelAdd: (channel: Channel) => void;
  onChannelUpdate: (channel: Channel) => void;
  onChannelDelete: (channelId: string) => void;
}

const ChannelSettings: React.FC<ChannelSettingsProps> = ({
  isOpen,
  onClose,
  channels,
  onChannelAdd,
  onChannelUpdate,
  onChannelDelete,
}) => {
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedChannel) return;

    const validation = validateChannel(selectedChannel);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    if (selectedChannel.id) {
      onChannelUpdate(selectedChannel);
    } else {
      const newChannel: Channel = {
        ...selectedChannel,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString(),
        isEnabled: true,
        tags: selectedChannel.tags || [],
      };
      onChannelAdd(newChannel);
    }
    resetForm();
  };

  const resetForm = () => {
    setSelectedChannel(null);
    setErrors([]);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const importedChannels = JSON.parse(event.target?.result as string);
          importedChannels.forEach((channel: Channel) => {
            onChannelAdd({ ...channel, id: Date.now().toString() });
          });
        } catch (error) {
          setErrors(['Invalid import file format']);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleExport = () => {
    const data = JSON.stringify(channels, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'channels.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center overflow-y-auto p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-4xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Channel Management</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Channel List */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Channels</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedChannel({
                  id: '',
                  name: '',
                  url: '',
                  thumbnail: '',
                  type: 'youtube',
                  tags: [],
                  isEnabled: true,
                  lastModified: '',
                  createdAt: ''
                })}
                className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                <Plus size={16} />
                Add Channel
              </button>
              <label className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer">
                <Upload size={16} />
                Import
                <input type="file" accept=".json" onChange={handleImport} className="hidden" />
              </label>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
              >
                <Download size={16} />
                Export
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {channels.map(channel => (
              <div
                key={channel.id}
                className="flex items-center justify-between p-3 bg-gray-700 rounded"
              >
                <div>
                  <h4 className="font-medium text-white">{channel.name}</h4>
                  <p className="text-sm text-gray-300">{channel.url}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedChannel(channel)}
                    className="p-2 text-blue-400 hover:text-blue-300"
                  >
                    <Save size={16} />
                  </button>
                  <button
                    onClick={() => onChannelDelete(channel.id)}
                    className="p-2 text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Channel Form */}
        {selectedChannel && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Channel Name
              </label>
              <input
                type="text"
                value={selectedChannel.name}
                onChange={e => setSelectedChannel({ ...selectedChannel, name: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Channel URL
              </label>
              <input
                type="text"
                value={selectedChannel.url}
                onChange={e => setSelectedChannel({ ...selectedChannel, url: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Description
              </label>
              <textarea
                value={selectedChannel.description || ''}
                onChange={e => setSelectedChannel({ ...selectedChannel, description: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={selectedChannel.tags?.join(', ')}
                onChange={e => setSelectedChannel({
                  ...selectedChannel,
                  tags: e.target.value.split(',').map(tag => tag.trim())
                })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Category
              </label>
              <input
                type="text"
                value={selectedChannel.category || ''}
                onChange={e => setSelectedChannel({ ...selectedChannel, category: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
            </div>

            {errors.length > 0 && (
              <div className="bg-red-500/20 border border-red-500 rounded p-3">
                <ul className="list-disc list-inside text-red-400">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 text-gray-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save Channel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};