import React, { useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield, Music, MessageSquare, Star, ArrowRight, Sparkles, Zap } from 'lucide-react';

interface FeatureItem {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  color: string;
  secondaryColor: string;
  accentIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

interface FeatureCardProps {
  feature: FeatureItem;
  index: number;
  isSelected: boolean;
  onSelect: (index: number) => void;
}

const Features: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });
  
  const features: FeatureItem[] = [
    {
      icon: Shield,
      title: 'Moderasyon',
      description: 'Güçlü moderasyon araçları ile sunucunuzu güvende tutun. Otomatik mod, raid koruması ve ayrıntılı kayıtlarla yönetimi kolaylaştırın.',
      color: '#9333EA',
      secondaryColor: '#7B2CBF',
      accentIcon: Zap
    },
    {
      icon: Music,
      title: 'Müzik',
      description: 'Kristal netliğinde ses kalitesi, oynatma listeleri ve gelişmiş sıra yönetimi ile birden fazla kaynaktan müzik çalın.',
      color: '#8B5CF6',
      secondaryColor: '#6D28D9',
      accentIcon: Sparkles
    },
    {
      icon: MessageSquare,
      title: 'Özel Komutlar',
      description: "Sunucunuzun ihtiyaçlarına göre özelleştirilmiş komutlar ve otomatik yanıtlar oluşturun.",
      color: '#A855F7',
      secondaryColor: '#7E22CE',
      accentIcon: ArrowRight
    },
    {
      icon: Star,
      title: 'Eğlence ve Oyunlar',
      description: 'Mini oyunlar, bilgi yarışmaları, anketler ve diğer etkileşimli özelliklerle topluluğunuzu eğlendirin.',
      color: '#C026D3',
      secondaryColor: '#A21CAF',
      accentIcon: Sparkles
    },
  ];
  
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
  
  const floatingBlobVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.5
    },
    visible: { 
      opacity: 0.5,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    },
  };

  return (
    <motion.div 
      id="features" 
      ref={ref}
      className="relative py-20 overflow-hidden"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: { duration: 0.5 }
        }
      }}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#1E1E1E]/95 to-[#121212]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        <div className="absolute inset-0 bg-noise opacity-[0.02]" />
        
        <motion.div 
          className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-[#7B2CBF]/5 blur-3xl pointer-events-none"
          variants={floatingBlobVariants}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-[#3A0CA3]/5 blur-3xl pointer-events-none"
          variants={floatingBlobVariants}
          animate={{
            y: [0, 20, 0],
            x: [0, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
      >
        <motion.div
          variants={titleVariants}
          className="text-center mb-16 relative"
        >
          <motion.div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-40 h-40 rounded-full bg-gradient-to-r from-[#7B2CBF] to-[#3A0CA3] opacity-20 blur-2xl" />
          </motion.div>
          
          <motion.div 
            className="inline-flex items-center gap-3 mb-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Star className="text-[#7B2CBF] h-7 w-7" />
          </motion.div>
          
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            Özellikler
          </h2>
          <motion.p 
            className="mt-4 text-gray-400 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Discord sunucunuzu yönetmek ve geliştirmek için ihtiyacınız olan her şey
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index} 
              feature={feature} 
              index={index}
              isSelected={selectedFeature === index}
              onSelect={setSelectedFeature}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index, isSelected, onSelect }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });
  
  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      rotateX: -10,
      rotateY: -10,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      transition: {
        type: "spring",
        duration: 0.8,
        delay: index * 0.2,
        bounce: 0.3,
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.5,
        delay: index * 0.2 + 0.3,
      }
    },
    hover: {
      scale: 1.2,
      rotate: [0, -10, 10, -5, 5, 0],
      transition: {
        duration: 0.7,
        ease: "easeInOut"
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.2 + 0.4,
      }
    }
  };
  
  const glowVariants = {
    hidden: { opacity: 0.1, scale: 1 },
    visible: { opacity: 0.2, scale: 1.1 },
    hover: { 
      opacity: 0.4, 
      scale: 1.5,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };
  
  const borderGlowVariants = {
    hidden: { opacity: 0, pathLength: 0 },
    visible: { 
      opacity: 0.5, 
      pathLength: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };
  
  const generateParticles = () => {
    return Array.from({ length: 12 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-white/40 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${Math.random() * 3 + 1}px`,
          height: `${Math.random() * 3 + 1}px`,
        }}
        initial={{ 
          scale: 0, 
          opacity: 0
        }}
        animate={{ 
          scale: [0, 1, 0],
          opacity: [0, 0.8, 0],
          y: -20 - Math.random() * 30,
          x: (Math.random() - 0.5) * 20
        }}
        transition={{
          duration: 1 + Math.random(),
          ease: "easeOut",
          delay: Math.random() * 0.3,
        }}
      />
    ));
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      whileHover="hover"
      onClick={() => onSelect(isSelected ? -1 : index)}
      className="relative group perspective-1000 cursor-pointer"
    >
      <motion.div
        animate={{
          rotateX: isSelected ? 10 : 0,
          rotateY: isSelected ? 10 : 0,
          scale: isSelected ? 1.05 : 1,
          boxShadow: isSelected 
            ? `0 20px 30px -10px rgba(${parseInt(feature.color.slice(1, 3), 16)}, ${parseInt(feature.color.slice(3, 5), 16)}, ${parseInt(feature.color.slice(5, 7), 16)}, 0.25)`
            : '0 0 0 rgba(0, 0, 0, 0)'
        }}
        whileHover={{
          rotateX: 5,
          rotateY: 5,
          scale: 1.05,
          boxShadow: `0 20px 30px -10px rgba(${parseInt(feature.color.slice(1, 3), 16)}, ${parseInt(feature.color.slice(3, 5), 16)}, ${parseInt(feature.color.slice(5, 7), 16)}, 0.25)`,
          transition: { duration: 0.3 }
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative overflow-hidden rounded-lg bg-[#1E1E1E]/70 backdrop-blur-md p-8 transform-gpu transition-all duration-300 border border-white/5"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <motion.div 
          className="absolute -inset-1 bg-gradient-to-r rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500"
          style={{ 
            background: `linear-gradient(45deg, ${feature.color}20, ${feature.secondaryColor}20)`,
            filter: 'blur(4px)'
          }}
          animate={{
            opacity: isSelected ? 0.3 : 0
          }}
        />
        
        <motion.div 
          className="absolute top-0 left-0 w-full h-1 rounded-t-lg"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ 
            scaleX: isSelected ? 1 : 0,
            opacity: isSelected ? 1 : 0
          }}
          whileHover={{ 
            scaleX: 1,
            opacity: 1
          }}
          transition={{ duration: 0.4 }}
          style={{ 
            background: `linear-gradient(to right, transparent, ${feature.color}, transparent)`,
            transformOrigin: 'left'
          }}
        />
        
        <AnimatePresence>
          {(isSelected || Math.random() > 0.7) && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none overflow-hidden"
            >
              {generateParticles()}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative z-10">
          <motion.div
            variants={iconVariants}
            className="relative mb-5 flex items-center justify-center"
            style={{ transformStyle: 'preserve-3d', transform: 'translateZ(20px)' }}
          >
            <motion.div 
              className="p-3 rounded-xl"
              animate={{
                background: isSelected ? `linear-gradient(135deg, ${feature.color}30, ${feature.secondaryColor}10)` : 'transparent',
                boxShadow: isSelected ? `0 0 20px 0px ${feature.color}30` : 'none'
              }}
              transition={{ duration: 0.3 }}
            >
              <feature.icon className={`h-10 w-10 transition-colors duration-300`} 
                style={{ 
                  color: feature.color,
                  filter: 'drop-shadow(0 0 8px rgba(123, 44, 191, 0.5))'
                }}
              />
            </motion.div>
            
            <motion.div
              variants={glowVariants}
              className="absolute inset-0 rounded-full blur-xl"
              style={{ background: feature.color }}
              animate={isSelected ? { 
                opacity: [0.3, 0.5, 0.3],
                scale: [1.1, 1.3, 1.1]
              } : {}}
              transition={{
                duration: 2,
                repeat: isSelected ? Infinity : 0,
                ease: "easeInOut"
              }}
            />
          </motion.div>

          <motion.div 
            variants={contentVariants}
            className="relative"
            style={{ transform: 'translateZ(10px)' }}
          >
            <motion.h3 
              className="text-xl font-semibold mb-3 text-center bg-clip-text text-transparent transition-colors duration-300"
              style={{
                backgroundImage: isSelected 
                  ? `linear-gradient(to right, ${feature.color}, ${feature.secondaryColor})`
                  : 'linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0.8))'
              }}
              animate={{
                backgroundImage: isSelected 
                  ? `linear-gradient(to right, ${feature.color}, ${feature.secondaryColor})`
                  : 'linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0.8))'
              }}
            >
              {feature.title}
            </motion.h3>
            
            <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 text-center">
              {feature.description}
            </p>
            
            <motion.div 
              className="mt-4 flex justify-center items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: isSelected ? 1 : 0,
                y: isSelected ? 0 : 10 
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="flex items-center space-x-1 text-xs font-medium"
                style={{ color: feature.color }}
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                <span>Daha Fazla</span>
                <motion.div
                  animate={{ x: isSelected ? [0, 3, 0] : 0 }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: isSelected ? Infinity : 0,
                    repeatType: "loop",
                    ease: "easeInOut",
                    repeatDelay: 0.5
                  }}
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Features;
