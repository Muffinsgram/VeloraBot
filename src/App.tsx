import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, Zap } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Stats from './components/Stats';
import Commands from './components/Commands';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);

  const particles = Array.from({ length: 20 });
  
  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
          className="fixed inset-0 bg-[#121212] flex items-center justify-center z-50 overflow-hidden"
        >
          <div className="relative">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                times: [0, 0.5, 1],
                repeat: Infinity,
              }}
              className="relative z-10"
            >
              <Bot className="w-16 h-16 text-[#7B2CBF]" />
            </motion.div>
            
            <motion.div
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.div
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute w-24 h-24 rounded-full bg-gradient-to-r from-[#7B2CBF] to-[#3A0CA3] blur-md"
              />
            </motion.div>
            
            {particles.map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-purple-500 rounded-full"
                initial={{ 
                  x: 0, 
                  y: 0, 
                  opacity: 0 
                }}
                animate={{ 
                  x: Math.random() > 0.5 ? [0, Math.random() * 80 - 40] : [0, Math.random() * -80 + 40],
                  y: Math.random() > 0.5 ? [0, Math.random() * 80 - 40] : [0, Math.random() * -80 + 40],
                  opacity: [0, 0.8, 0]
                }}
                transition={{
                  duration: Math.random() * 1 + 0.5,
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: Math.random() * 0.5,
                }}
              />
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute bottom-10 text-white/50 text-sm flex items-center"
          >
            <Sparkles className="w-4 h-4 mr-2 text-purple-500" />
            <span>NexusUI yükleniyor</span>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="min-h-screen bg-[#121212] transition-all duration-500"
        >
          <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none">
            <motion.div
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#7B2CBF]/20 rounded-full blur-[100px]"
            />
            <motion.div
              animate={{
                y: [0, 20, 0],
                x: [0, -10, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#3A0CA3]/20 rounded-full blur-[120px]"
            />
            
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.15, 0.1],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#7B2CBF]/10 rounded-full blur-[150px]"
            />
            
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-px h-px bg-white/20 rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 2 + 1}px`,
                  height: `${Math.random() * 2 + 1}px`,
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
            
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
            
            <div className="absolute inset-0 bg-noise opacity-[0.02]" />
            
            <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#1E1E1E]/95 to-[#121212] opacity-50" />
          </div>

          <div className="relative z-10 backdrop-blur-[80px]">
            <Navbar />
            <main>
              <Hero />
              <Stats />
              <Features />
              <Commands />
              <FAQ />
            </main>
            <Footer />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
