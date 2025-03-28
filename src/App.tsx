import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot } from 'lucide-react';
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
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#121212] flex items-center justify-center z-50"
        >
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
            className="relative w-16 h-16"
          >
            <Bot className="w-16 h-16 text-[#7B2CBF] absolute" />
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
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#7B2CBF]/20 rounded-full blur-[100px]"
            />
            <motion.div
              animate={{
                y: [0, 20, 0],
                x: [0, -10, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#3A0CA3]/20 rounded-full blur-[120px]"
            />
            
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.15, 0.1],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#7B2CBF]/10 rounded-full blur-[150px]"
            />
            
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
            
            <div className="absolute inset-0 bg-noise opacity-[0.015]" />
            
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
