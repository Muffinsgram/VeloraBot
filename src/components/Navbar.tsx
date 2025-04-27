import { useState } from 'react';
import { Menu, X, Bot, ExternalLink, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useSmooth } from '../hooks/useSmooth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { handleAnchorClick } = useSmooth();
  const { scrollY } = useScroll();
  
  const navBackgroundOpacity = useTransform(
    scrollY, 
    [0, 50, 100], 
    [0, 0.5, 0.8]
  );
  
  const navBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(8px)"]
  );
  
  const navHeight = useTransform(
    scrollY,
    [0, 100],
    ["5rem", "4rem"]
  );


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
  
  const mobileMenuVariants = {
    closed: { 
      height: 0,
      opacity: 0,
      transition: {
        type: "tween",
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: { 
      height: "auto",
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };
  
  const mobileItemVariants = {
    closed: { 
      x: -20, 
      opacity: 0 
    },
    open: { 
      x: 0, 
      opacity: 1
    }
  };
  
  const navItems = [
    { name: 'Features', href: '#features' },
    { name: 'Commands', href: '#commands' },
    { name: 'FAQ', href: '#faq' },
  ];
  
  const generateFlare = (_index: number) => {
    const particles = Array.from({ length: 3 });
    
    return (
      <motion.div 
        className="absolute left-0 top-0 w-full h-full pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {particles.map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-px bg-purple-400 rounded-full"
            initial={{ 
              x: "50%",
              y: "50%",
              opacity: 0.8,
              scale: 0.2
            }}
            animate={{ 
              x: `${50 + (Math.random() * 60 - 30)}%`,
              y: `${50 + (Math.random() * 60 - 30)}%`,
              opacity: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.6 + Math.random() * 0.5,
              ease: "easeOut"
            }}
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 8 + 4}px`,
            }}
          />
        ))}
      </motion.div>
    );
  };

  return (
    <motion.nav
      style={{ 
        height: navHeight,
      }}
      className="fixed w-full z-50 flex items-center transition-colors"
    >
      <motion.div 
        className="absolute inset-0 bg-[#121212]/80 backdrop-blur-sm"
        style={{ 
          opacity: navBackgroundOpacity,
          backdropFilter: navBlur,
        }}
      />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-full">
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
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="relative nav-link text-gray-300 hover:text-white px-3 py-2 text-sm font-medium group overflow-hidden"
                  variants={navItemVariants}
                  initial="initial"
                  animate="animate"
                  custom={index}
                  onMouseEnter={() => { setHoveredItem(item.name); }}
                  onMouseLeave={() => { setHoveredItem(null); }}
                  onClick={(e) => { handleAnchorClick(e, {
                    duration: 800,
                    offset: 80,
                  }); }}
                >
                  <div className="relative z-10">
                    {item.name}
                  </div>
                  
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#7B2CBF] to-[#3A0CA3] origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: hoveredItem === item.name ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <AnimatePresence>
                    {hoveredItem === item.name && generateFlare(index)}
                  </AnimatePresence>
                </motion.a>
              ))}
              
              <motion.a 
                href="#"
                className="relative nav-button px-6 py-2 rounded-md font-medium overflow-hidden group"
                variants={navItemVariants}
                initial="initial"
                animate="animate"
                custom={4}
                onMouseEnter={() => { setHoveredItem("add"); }}
                onMouseLeave={() => { setHoveredItem(null); }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-[#7B2CBF] to-[#3A0CA3] rounded-md"
                  initial={{ opacity: 0.9 }}
                  animate={{ 
                    opacity: hoveredItem === "add" ? 1 : 0.9
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                <motion.div 
                  className="absolute inset-0 bg-white/20"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: hoveredItem === "add" ? 1.5 : 0,
                    opacity: hoveredItem === "add" ? 0.3 : 0
                  }}
                  transition={{ duration: 0.4 }}
                  style={{ borderRadius: "50%" }}
                />
                
                <motion.div
                  className="relative z-10 flex items-center text-white"
                  animate={{
                    x: hoveredItem === "add" ? 3 : 0
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <span>Sunucuna Ekle</span>
                  <motion.div
                    animate={{
                      x: hoveredItem === "add" ? [0, 4, 0] : 0,
                      opacity: hoveredItem === "add" ? 1 : 0.8,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </motion.div>
                </motion.div>
                
                <AnimatePresence>
                  {hoveredItem === "add" && (
                    <motion.div 
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {Array.from({ length: 5 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute bg-white/30 rounded-full"
                          style={{
                            width: `${Math.random() * 4 + 2}px`,
                            height: `${Math.random() * 4 + 2}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                          }}
                          initial={{ 
                            opacity: 0, 
                            scale: 0 
                          }}
                          animate={{ 
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                            y: [0, -Math.random() * 10 - 5]
                          }}
                          transition={{
                            duration: 1 + Math.random() * 0.5,
                            delay: Math.random() * 0.3,
                            repeat: Infinity,
                            repeatDelay: Math.random()
                          }}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.a>
            </div>
          </div>

          <div className="md:hidden">
            <motion.button
              onClick={() => { setIsOpen(!isOpen); }}
              className="relative nav-button inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none transition-all overflow-hidden"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              <motion.div 
                className="absolute inset-0 bg-[#7B2CBF]/10 rounded-md"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
              
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="absolute top-full left-0 right-0 md:hidden overflow-hidden bg-[#121212]/95 backdrop-blur-md border-t border-purple-900/20 z-40"
          >
            <div className="px-4 py-5 space-y-3">
              {navItems.map((item, _index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  variants={mobileItemVariants}
                  className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors relative group"
                  onClick={(e) => {
                    handleAnchorClick(e, {
                      duration: 800,
                      offset: 80,
                    });
                    setIsOpen(false);
                  }}
                >
                  <div className="relative z-10 flex items-center">
                    <span>{item.name}</span>
                    <motion.div
                      initial={{ x: -10, opacity: 0 }}
                      whileHover={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sparkles className="ml-2 h-4 w-4 text-purple-500" />
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#7B2CBF] to-[#3A0CA3]"
                    initial={{ scaleY: 0 }}
                    whileHover={{ scaleY: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.a>
              ))}
              
              <motion.a 
                href="#"
                variants={mobileItemVariants}
                className="flex justify-center items-center w-full text-center bg-gradient-to-r from-[#7B2CBF] to-[#3A0CA3] text-white px-4 py-3 rounded-md font-medium transition-all"
                onClick={() => { setIsOpen(false); }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Sunucuna Ekle</span>
                <ExternalLink className="ml-2 h-4 w-4" />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
