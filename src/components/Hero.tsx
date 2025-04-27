import { FC, useState } from 'react';
import { Bot, ArrowRight, Shield, Music, MessageSquare, Star, Command, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero: FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverButton, setHoverButton] = useState<string | null>(null);
  
  const features = [
    { icon: Shield, label: "Moderasyon" },
    { icon: Music, label: "Müzik" },
    { icon: MessageSquare, label: "Komutlar" },
    { icon: Star, label: "Eğlence" },
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };
  
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.1 } }
  };
  
  const iconContainerVariants = {
    initial: { rotate: 0 },
    hover: { rotate: 10, transition: { duration: 0.3, ease: "easeInOut" } }
  };
  
  const orbitParticles = Array.from({ length: 8 });

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-16 lg:pt-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-500/30 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <motion.div 
          className="relative inline-block mb-10"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 20,
            delay: 0.2
          }}
          whileHover={{ scale: 1.1 }}
        >
          <div className="relative">
            <Bot className="h-28 w-28 text-purple-500 relative z-10" />
            
            <motion.div
              className="absolute inset-0 bg-purple-500 rounded-full blur-xl"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {orbitParticles.map((_, index) => {
              const angle = (index / orbitParticles.length) * Math.PI * 2;
              const x = Math.cos(angle) * 40;
              const y = Math.sin(angle) * 40;
              
              return (
                <motion.div
                  key={index}
                  className="absolute w-2 h-2 bg-purple-300 rounded-full"
                  style={{ left: "50%", top: "50%" }}
                  animate={{
                    x: [x, x * 1.2, x],
                    y: [y, y * 1.2, y],
                    opacity: [0.5, 1, 0.5],
                    scale: [0.8, 1.2, 0.8]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: "easeInOut"
                  }}
                />
              );
            })}
            
            <motion.div
              animate={{
                rotate: 360
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute w-full h-full rounded-full border border-purple-500/20"
              style={{ 
                left: "50%", 
                top: "50%", 
                transform: "translate(-50%, -50%)",
                width: "110px",
                height: "110px"
              }}
            />
          </div>
        </motion.div>
        
        <motion.h1 
          variants={itemVariants} 
          className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl"
        >
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">NexusUI</span>
          <motion.span 
            className="block text-transparent bg-clip-text bg-gradient-to-r from-[#7B2CBF] to-[#3A0CA3]"
          >
            Gelişmiş Discord Botu
          </motion.span>
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="mt-6 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-8 md:text-xl md:max-w-3xl"
        >
          Moderasyon, müzik, eğlence ve çok daha fazlasıyla Discord sunucunuzu bir üst seviyeye taşıyın!
        </motion.p>
        
        <motion.div variants={itemVariants} className="mt-10 flex flex-wrap justify-center gap-6">
          <motion.a
            href="#"
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onMouseEnter={() => { setHoverButton("add"); }}
            onMouseLeave={() => { setHoverButton(null); }}
            className="group relative px-8 py-4 text-lg font-medium rounded-md text-white transition-all overflow-hidden"
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-[#7B2CBF] to-[#3A0CA3] rounded-md"
              animate={hoverButton === "add" ? { scale: 1.1 } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            />
            
            <motion.div 
              className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"
              initial={{ scale: 0 }}
              animate={hoverButton === "add" ? { scale: 1.5, opacity: 0.3 } : { scale: 0, opacity: 0 }}
              style={{ borderRadius: "50%" }}
            />
            
            <div className="relative z-10 flex items-center">
              <span>Sunucuna Ekle</span>
              <motion.div
                variants={iconContainerVariants}
                initial="initial"
                animate={hoverButton === "add" ? "hover" : "initial"}
                className="ml-2"
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </div>
          </motion.a>
          
          <motion.a
            href="#features"
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onMouseEnter={() => { setHoverButton("features"); }}
            onMouseLeave={() => setHoverButton(null)}
            className="group relative px-8 py-4 text-lg font-medium rounded-md transition-all overflow-hidden"
          >
            <motion.div 
              className="absolute inset-0 bg-purple-900 bg-opacity-20 rounded-md group-hover:bg-opacity-30 transition-all duration-300"
              animate={hoverButton === "features" ? { scale: 1.1 } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            />
            
            <div className="relative z-10 flex items-center text-purple-500">
              <span>Özellikler</span>
              <motion.div
                variants={iconContainerVariants}
                initial="initial"
                animate={hoverButton === "features" ? "hover" : "initial"}
                className="ml-2"
              >
                <Command className="w-5 h-5" />
              </motion.div>
            </div>
          </motion.a>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="mt-28 flex justify-center gap-6 flex-wrap"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex items-center px-4 py-2 backdrop-blur-lg bg-white/5 rounded-full hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { delay: 0.5 + index * 0.1, duration: 0.5 }
              }}
            >
              <feature.icon className="w-5 h-5 text-purple-500 mr-2" />
              <span className="text-gray-300">{feature.label}</span>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center text-gray-400 text-sm"
        >
          <Sparkles className="w-4 h-4 mr-2 text-purple-500" />
          <span>Aşağı kaydırarak inceleyin</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
