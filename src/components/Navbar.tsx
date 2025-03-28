import React, { useState, useEffect } from 'react';
import { Menu, X, Bot } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSmooth } from '../hooks/useSmooth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { handleAnchorClick } = useSmooth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logoVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.1,
      rotate: [0, -10, 10, -5, 5, 0],
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  const textVariants = {
    initial: { x: -20, opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.2,
        ease: "easeOut"
      }
    }
  };

  const navItemVariants = {
    initial: { y: -20, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.1 * i,
        ease: "easeOut"
      }
    })
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'glass py-2' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div 
            className="flex items-center group"
            initial="initial"
            animate="animate"
            whileHover="hover"
          >
            <motion.div
              className="relative"
              variants={logoVariants}
            >
              <Bot className="h-8 w-8 text-purple-500 transition-colors duration-300 group-hover:text-[#7B2CBF]" />
              <motion.div
                className="absolute inset-0 bg-purple-500 rounded-full blur-xl"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
            <motion.span 
              className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 group-hover:from-[#7B2CBF] group-hover:to-[#3A0CA3] transition-all duration-300"
              variants={textVariants}
            >
              NexusUI
            </motion.span>
          </motion.div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {['Features', 'Commands', 'FAQ'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="nav-link text-gray-300 hover:text-white px-3 py-2 text-sm font-medium relative group"
                  variants={navItemVariants}
                  initial="initial"
                  animate="animate"
                  custom={index}
                  whileHover={{
                    y: -2,
                    transition: { duration: 0.2 }
                  }}
                  onClick={(e) => handleAnchorClick(e, {
                    duration: 800,
                    offset: 80,
                  })}
                >
                  {item}
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-[#7B2CBF] origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
              <motion.a 
                href="#"
                className="nav-button bg-purple-600 text-white px-6 py-2 rounded-md font-medium hover:bg-purple-700 transition-all duration-300 relative overflow-hidden group"
                variants={navItemVariants}
                initial="initial"
                animate="animate"
                custom={4}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              >
                <span className="relative z-10">Sunucuna Ekle</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#7B2CBF] to-[#3A0CA3]"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute inset-0 bg-purple-500/20"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1.5, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  style={{ borderRadius: "50%" }}
                />
              </motion.a>
            </div>
          </div>

          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="nav-button inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-purple-600 focus:outline-none transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6 animate-fade-in" />
              ) : (
                <Menu className="h-6 w-6 animate-fade-in" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut"
        }}
        className="md:hidden overflow-hidden"
      >
        <div className="glass px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {['Features', 'Commands', 'FAQ'].map((item, index) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="nav-link block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1
              }}
              onClick={(e) => {
                handleAnchorClick(e, {
                  duration: 800,
                  offset: 80,
                });
                setIsOpen(false);
              }}
            >
              {item}
            </motion.a>
          ))}
          <motion.a 
            href="#"
            className="nav-button block w-full text-center bg-purple-600 text-white px-4 py-2 rounded-md font-medium hover:bg-purple-700 transition-all"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 0.3,
              delay: 0.3
            }}
            onClick={() => setIsOpen(false)}
          >
            Sunucuna Ekle
          </motion.a>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
