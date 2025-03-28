import React, { useState } from 'react';
import { Search } from 'lucide-react';

const Commands = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const commands = [
    { category: 'Moderation', name: '/ban', description: 'Ban a user from the server' },
    { category: 'Moderation', name: '/kick', description: 'Kick a user from the server' },
    { category: 'Moderation', name: '/mute', description: 'Mute a user temporarily' },
    { category: 'Music', name: '/play', description: 'Play a song or playlist' },
    { category: 'Music', name: '/skip', description: 'Skip the current song' },
    { category: 'Music', name: '/queue', description: 'View the current music queue' },
    { category: 'Fun', name: '/poll', description: 'Create a poll' },
    { category: 'Fun', name: '/trivia', description: 'Start a trivia game' },
  ];

  const filteredCommands = commands.filter(
    command => 
      command.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      command.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div id="commands" className="relative py-16 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#1E1E1E]/95 to-[#121212]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        <div className="absolute inset-0 bg-noise opacity-[0.015]" />
        <div className="absolute inset-0 bg-[#7B2CBF]/5 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white">Commands</h2>
          <p className="mt-4 text-gray-400">Browse through our list of available commands</p>
        </div>

        <div className="relative max-w-xl mx-auto mb-12">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search commands..."
            className="w-full pl-10 pr-4 py-2 bg-[#1E1E1E]/60 backdrop-blur-sm rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7B2CBF] border border-[#7B2CBF]/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCommands.map((command, index) => (
            <div
              key={index}
              className="relative group p-6 bg-[#1E1E1E]/60 backdrop-blur-sm rounded-lg hover:bg-[#1E1E1E]/80 transition-all duration-300 transform hover:scale-[1.02]"
            >
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#7B2CBF]/0 via-[#7B2CBF]/5 to-[#3A0CA3]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <code className="text-[#7B2CBF] font-mono text-lg">{command.name}</code>
                  <span className="px-3 py-1 bg-[#7B2CBF] bg-opacity-20 text-[#7B2CBF] rounded-full text-sm">
                    {command.category}
                  </span>
                </div>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  {command.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Commands;