import React, { useRef, useState, useEffect } from 'react';
import { Users, Server, Zap, PlusCircle, Heart, Sparkles } from 'lucide-react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

interface StatItemProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
  numericValue: number;
  index: number;
  isHovered: boolean;
  onHover: (index: number | null) => void;
}

const CountingNumber: React.FC<{ value: number, suffix: string }> = ({ value, suffix }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(countRef, { once: true });
  
  useEffect(() => {
    if (!isInView) return;
    
    let startValue = 0;
    const endValue = value;
    const duration = 2000;
    const step = Math.max(1, Math.floor(endValue / (duration / 16)));
    
    const timer = setInterval(() => {
      startValue += step;
      if (startValue > endValue) {
        setCount(endValue);
        clearInterval(timer);
      } else {
        setCount(startValue);
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [value, isInView]);
  
  return (
    <div ref={countRef} className="inline-flex items-center">
      <span>{count}</span>
      <span>{suffix}</span>
    </div>
  );
};

const StatItem: React.FC<StatItemProps> = ({ icon: Icon, label, value, numericValue, index, isHovered, onHover }) => {
  const particles = Array.from({ length: 8 });
  const [suffix, numValue] = value.split(/([0-9]+)/);
  
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
        damping: 12,
        delay: index * 0.15
      }
    }
  };
  
  const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.15, 
      rotate: [0, -10, 10, -5, 0],
      transition: {
        duration: 0.7,
        ease: "easeInOut"
      }
    }
  };
  
  const glowVariants = {
    initial: { opacity: 0.2, scale: 1 },
    hover: { 
      opacity: 0.5, 
      scale: 1.4,
      boxShadow: "0 0 20px 10px rgba(123, 44, 191, 0.3)",
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };
  
  return (
    <motion.div
      variants={cardVariants}
      className="relative group perspective"
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-[#7B2CBF]/30 to-[#3A0CA3]/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        animate={{
          opacity: isHovered ? 0.1 : 0
        }}
      />
      
      <motion.div
        animate={{
          rotateX: isHovered ? 5 : 0,
          rotateY: isHovered ? 5 : 0
        }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="bg-[#1E1E1E]/70 backdrop-blur-md rounded-lg p-8 relative overflow-hidden border border-[#7B2CBF]/10"
      >
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none"
            >
              {particles.map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-[#7B2CBF]/40 rounded-full"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  initial={{ 
                    scale: 0, 
                    opacity: 0
                  }}
                  animate={{ 
                    scale: [0, 1, 0],
                    opacity: [0, 0.8, 0],
                    y: -20 - Math.random() * 30
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
        
        <motion.div 
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#7B2CBF]/0 via-[#7B2CBF] to-[#7B2CBF]/0"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ 
            scaleX: isHovered ? 1 : 0,
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.4 }}
        />
        
        <div className="flex flex-col items-center">
          <div className="relative mb-6">
            <motion.div
              variants={iconVariants}
              initial="initial"
              animate={isHovered ? "hover" : "initial"}
              className="relative z-10"
            >
              <Icon className="h-14 w-14 text-[#7B2CBF]" />
            </motion.div>
            
            <motion.div
              variants={glowVariants}
              initial="initial"
              animate={isHovered ? "hover" : "initial"}
              className="absolute inset-0 bg-[#7B2CBF] rounded-full blur-xl"
            />
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
            className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 mb-2"
          >
            <CountingNumber value={numericValue} suffix={suffix} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.15 + 0.4, duration: 0.5 }}
            className="text-gray-400 group-hover:text-purple-300 transition-colors duration-300 flex items-center gap-1"
          >
            {label}
            <motion.div
              animate={isHovered ? { scale: [1, 1.3, 1], rotate: [0, 10, 0] } : {}}
              transition={{ duration: 0.5 }}
            >
              {index === 0 && <Server className="w-4 h-4 text-[#7B2CBF]/70 ml-1" />}
              {index === 1 && <Users className="w-4 h-4 text-[#7B2CBF]/70 ml-1" />}
              {index === 2 && <Sparkles className="w-4 h-4 text-[#7B2CBF]/70 ml-1" />}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Stats: React.FC = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(statsRef, { once: false, amount: 0.2 });
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  
  const stats = [
    { icon: Server, label: 'Sunucular', value: 'K+', numericValue: 10 },
    { icon: Users, label: 'Kullanıcılar', value: 'M+', numericValue: 1 },
    { icon: Zap, label: 'Komut Kullanımı', value: 'M+', numericValue: 50 },
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
  
  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8 }
    }
  };

  return (
    <motion.div 
      ref={statsRef}
      className="relative py-20 overflow-hidden"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={backgroundVariants}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#1E1E1E]/95 to-[#121212]" />
        
        <motion.div 
          className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-[#7B2CBF]/5 blur-3xl pointer-events-none"
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
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#3A0CA3]/5 blur-3xl pointer-events-none"
          animate={{
            y: [0, 30, 0],
            x: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              {...stat}
              index={index}
              isHovered={hoveredStat === index}
              onHover={setHoveredStat}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Stats;
