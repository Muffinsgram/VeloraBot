import React, { useState, useRef } from 'react';
import { Search, Command, Zap, Terminal, Copy, Shield, Music } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const Commands: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredCommand, setHoveredCommand] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState<string | null>(null);
  const commandsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(commandsRef, { once: false, amount: 0.2 });

  const commands = [
    { category: 'Moderasyon', name: '/ban', description: 'Bir kullanıcıyı sunucudan yasakla' },
    { category: 'Moderasyon', name: '/kick', description: 'Bir kullanıcıyı sunucudan at' },
    { category: 'Moderasyon', name: '/mute', description: 'Bir kullanıcıyı geçici olarak sustur' },
    { category: 'Genel', name: '/kullanıcıbilgi', description: 'Bir kişinin bilgilerini görün' },
  ];

  const filteredCommands = commands.filter(
    command => 
      command.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      command.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleCopyCommand = (command: string) => {
    void navigator.clipboard.writeText(command);
    setIsCopied(command);
    
    setTimeout(() => {
      setIsCopied(null);
    }, 2000);
  };
  
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'Moderasyon':
        return "from-purple-600 to-purple-800 text-purple-100";
      case 'Müzik':
        return "from-indigo-600 to-indigo-800 text-indigo-100";
      case 'Eğlence':
        return "from-pink-600 to-pink-800 text-pink-100";
      default:
        return "from-purple-600 to-purple-800 text-purple-100";
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };
  
  const cardVariants = {
    hidden: { 
      y: 20, 
      opacity: 0,
      scale: 0.95
    },
    visible: { 
      y: 0, 
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };
  
  const titleVariants = {
    hidden: { 
      opacity: 0,
      y: -20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };
  
  const searchVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: 0.3,
        duration: 0.5
      }
    }
  };
  
  const floatingParticlesVariants = {
    hidden: { 
      opacity: 0 
    },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5,
      }
    }
  };
  
  const particleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0, 0.5, 0],
      y: [0, -20],
      transition: {
        repeat: Infinity,
        duration: 3,
        ease: "easeInOut",
        delay: Math.random() * 2
      }
    }
  };

  return (
    <motion.div 
      id="commands" 
      ref={commandsRef}
      className="relative py-20 overflow-hidden"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
      }}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#1E1E1E]/95 to-[#121212]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        <div className="absolute inset-0 bg-noise opacity-[0.02]" />
        <div className="absolute inset-0 bg-[#7B2CBF]/5 backdrop-blur-[2px]" />
        
        <motion.div 
          className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-[#7B2CBF]/5 blur-3xl pointer-events-none"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute top-40 -right-20 w-96 h-96 rounded-full bg-[#3A0CA3]/5 blur-3xl pointer-events-none"
          animate={{
            y: [0, 20, 0],
            x: [0, -10, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        <motion.div 
          variants={floatingParticlesVariants}
          initial="hidden"
          animate="visible"
          className="absolute inset-0 pointer-events-none"
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              variants={particleVariants}
              className="absolute w-1 h-1 bg-purple-500 rounded-full opacity-0"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
              }}
            />
          ))}
        </motion.div>
      </div>

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
      >
        <motion.div 
          className="text-center mb-16"
          variants={titleVariants}
        >
          <motion.div
            className="inline-flex items-center justify-center mb-3 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Terminal className="h-8 w-8 text-[#7B2CBF] opacity-80" />
            <motion.div
              className="absolute inset-0 bg-[#7B2CBF] rounded-full blur-xl"
              animate={{
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
          
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            Komutlar
          </h2>
          <motion.p 
            className="mt-4 text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Kullanılabilir komutlar listemize göz atın
          </motion.p>
        </motion.div>

        <motion.div 
          className="relative max-w-xl mx-auto mb-16"
          variants={searchVariants}
        >
          <div className="absolute inset-0 bg-[#7B2CBF]/10 rounded-lg blur-md opacity-75 group-focus-within:opacity-100 transition-opacity" />
          <div className="relative overflow-hidden rounded-lg group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#7B2CBF] transition-colors duration-300" />
            
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute bottom-0 h-0.5 left-0 right-0 bg-gradient-to-r from-[#7B2CBF] via-[#3A0CA3] to-[#7B2CBF]/0"
            />
            
            <input
              type="text"
              placeholder="Komutları ara..."
              className="w-full pl-12 pr-4 py-3 bg-[#1E1E1E]/70 backdrop-blur-md rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7B2CBF]/50 border border-[#7B2CBF]/20 transition-all duration-300"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); }}
            />
            
            <motion.div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              animate={{
                rotate: searchTerm ? [0, 360] : 0,
                scale: searchTerm ? [1, 1.2, 1] : 1,
              }}
              transition={{
                duration: 0.5,
              }}
            >
              <Command className={`h-5 w-5 ${searchTerm ? 'text-[#7B2CBF]' : 'text-gray-500'}`} />
            </motion.div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={searchTerm}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {filteredCommands.length > 0 ? (
              filteredCommands.map((command, _index) => (
                <motion.div
                  key={command.name}
                  variants={cardVariants}
                  whileHover={{ 
                    scale: 1.03,
                    transition: { duration: 0.2 }
                  }}
                  className="relative group"
                  onMouseEnter={() => { setHoveredCommand(command.name); }}
                  onMouseLeave={() => { setHoveredCommand(null); }}
                >
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${getCategoryColor(command.category).split(' ')[0]} ${getCategoryColor(command.category).split(' ')[1]} rounded-lg opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300`} />
                  
                  <div className="relative p-6 bg-[#1E1E1E]/60 backdrop-blur-sm rounded-lg overflow-hidden">
                    <motion.div 
                      className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#7B2CBF]/0 via-[#7B2CBF] to-[#7B2CBF]/0"
                      initial={{ scaleX: 0, opacity: 0 }}
                      whileHover={{ scaleX: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-[#7B2CBF]/0 via-[#7B2CBF]/5 to-[#3A0CA3]/0 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <motion.div
                            animate={hoveredCommand === command.name ? {
                              scale: [1, 1.2, 1],
                              rotate: [0, 10, 0],
                            } : {}}
                            transition={{ duration: 1, repeat: 0 }}
                          >
                            {command.category === 'Moderasyon' && <Shield className="h-5 w-5 text-[#7B2CBF]" />}
                            {command.category === 'Müzik' && <Music className="h-5 w-5 text-[#7B2CBF]" />}
                            {command.category === 'Eğlence' && <Zap className="h-5 w-5 text-[#7B2CBF]" />}
                          </motion.div>
                          <code className="text-[#7B2CBF] font-mono text-lg font-semibold overflow-hidden group-hover:text-white transition-colors duration-300">
                            {command.name}
                          </code>
                        </div>
                        
                        <motion.div
                          className={`px-3 py-1 bg-gradient-to-r ${getCategoryColor(command.category)} rounded-full text-xs font-medium flex items-center`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {command.category}
                        </motion.div>
                      </div>
                      
                      <p className="text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
                        {command.description}
                      </p>
                      
                      <motion.div 
                        className="mt-4 flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={{ y: 5 }}
                        whileHover={{ y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.button
                          onClick={() => { handleCopyCommand(command.name); }}
                          className="flex items-center text-xs text-[#7B2CBF] hover:text-white transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {isCopied === command.name ? (
                            <>
                              <motion.span
                                initial={{ opacity: 0, x: -5 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                Kopyalandı!
                              </motion.span>
                            </>
                          ) : (
                            <>
                              <span>Komutu Kopyala</span>
                              <Copy className="ml-1 h-3.5 w-3.5" />
                            </>
                          )}
                        </motion.button>
                      </motion.div>
                    </div>
                    
                    <AnimatePresence>
                      {hoveredCommand === command.name && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 pointer-events-none"
                        >
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-1 h-1 bg-[#7B2CBF]/40 rounded-full"
                              style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                              }}
                              animate={{
                                scale: [0, 1, 0],
                                opacity: [0, 0.8, 0],
                                y: [0, Math.random() * -30],
                                x: [0, (Math.random() - 0.5) * 20],
                              }}
                              transition={{
                                duration: 1 + Math.random(),
                                ease: "easeOut",
                                delay: Math.random() * 0.2,
                              }}
                            />
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Terminal className="mx-auto h-12 w-12 text-gray-500 mb-4" />
                <h3 className="text-xl font-medium text-gray-300 mb-2">Komut bulunamadı</h3>
                <p className="text-gray-500">Farklı bir arama terimi deneyin</p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default Commands;
