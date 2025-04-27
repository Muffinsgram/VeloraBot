import React, { useState, useRef } from 'react';
import { Plus, Minus, HelpCircle, Wand2 } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(faqRef, { once: false, amount: 0.2 });
  
  const faqs = [
    {
      question: 'Botu sunucuma nasıl eklerim?',
      answer: 'Sayfanın üst kısmındaki "Sunucuna Ekle" butonuna tıklayarak Discord yetkilendirme sürecini izleyebilirsiniz. Botu eklemek istediğiniz sunucuda "Sunucu Yönet" yetkisine sahip olduğunuzdan emin olun.',
    },
    {
      question: 'Bot kullanımı ücretsiz mi?',
      answer: 'Evet! Bot tüm temel özellikleriyle ücretsiz olarak kullanılabilir. Ayrıca, güçlü kullanıcılar için ek özellikler sunan premium paketimiz de bulunmaktadır.',
    },
    {
      question: 'Nasıl destek alabilirim?',
      answer: 'Ekibimizden ve topluluğumuzdan anında yardım almak için destek sunucumuza katılabilirsiniz. Ayrıca detaylı kılavuzlar ve sorun giderme ipuçları için dokümantasyonumuzu kontrol edebilirsiniz.',
    },
    {
      question: 'Bot hangi yetkilere ihtiyaç duyar?',
      answer: 'Bot düzgün çalışabilmek için mesaj gönderme, mesajları yönetme ve ses kanallarına bağlanma gibi temel izinlere ihtiyaç duyar. Belirli özellikler için ek izinler gerekebilir.',
    },
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };
  
  const itemVariants = {
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
  
  const glowVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.2
    },
    visible: { 
      opacity: [0.3, 0.6, 0.3],
      scale: [1, 1.2, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  
  const floatingCirclesVariants = {
    animate: {
      y: [0, -10, 0],
      x: [0, 5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  
  const accordionContentVariants = {
    closed: {
      height: 0,
      opacity: 0,
    },
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        height: {
          type: "spring",
          stiffness: 300,
          damping: 30,
          duration: 0.6,
        },
        opacity: {
          duration: 0.5,
          delay: 0.1
        }
      }
    }
  }
  
  const generateParticles = (amount = 5) => {
    return Array.from({ length: amount }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-purple-500/50 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        initial={{ 
          scale: 0, 
          opacity: 0,
          x: 0,
          y: 0
        }}
        animate={{ 
          scale: [0, 1, 0],
          opacity: [0, 0.8, 0],
          x: (Math.random() - 0.5) * 40,
          y: -20 - Math.random() * 30,
        }}
        transition={{
          duration: 1 + Math.random() * 0.5,
          ease: "easeOut",
          delay: Math.random() * 0.3,
        }}
      />
    ));
  };

  return (
    <motion.div 
      id="faq" 
      ref={faqRef}
      className="relative py-20 overflow-hidden"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
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
          className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-[#7B2CBF]/10 blur-3xl pointer-events-none"
          variants={floatingCirclesVariants}
          animate="animate"
        />
        
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#3A0CA3]/10 blur-3xl pointer-events-none"
          animate={{
            y: [0, 10, 0],
            x: [0, -8, 0],
            scale: [1, 1.05, 1],
            transition: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }
          }}
        />
      </div>

      <motion.div 
        className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
      >
        <motion.div 
          className="text-center mb-16 relative"
          variants={titleVariants}
        >
          <motion.div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial="hidden"
            animate="visible"
            variants={glowVariants}
          >
            <div className="w-40 h-40 rounded-full bg-gradient-to-r from-[#7B2CBF] to-[#3A0CA3] opacity-20 blur-2xl" />
          </motion.div>
          
          <motion.div 
            className="inline-flex items-center gap-3 mb-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <HelpCircle className="text-[#7B2CBF] h-6 w-6" />
            <motion.div 
              animate={{ 
                rotate: [0, 5, 0, -5, 0],
                scale: [1, 1.2, 1, 1.1, 1]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Wand2 className="text-purple-500 h-5 w-5" />
            </motion.div>
          </motion.div>
          
          <h2 className="text-3xl font-bold text-white relative inline-block">
            <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">Sıkça Sorulan Sorular</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#7B2CBF] to-[#3A0CA3] opacity-10 blur-xl transform scale-150" />
          </h2>
          <motion.p 
            className="mt-4 text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Botumuz hakkında sık sorulan soruların cevaplarını bulun
          </motion.p>
        </motion.div>

        <motion.div className="space-y-5">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-[#1E1E1E]/60 backdrop-blur-sm rounded-lg overflow-hidden transform"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02, 
                boxShadow: "0 10px 25px -5px rgba(123, 44, 191, 0.15)",
                transition: { duration: 0.2 }
              }}
            >
              <motion.button
                className="w-full px-6 py-4 text-left flex justify-between items-center group relative overflow-hidden"
                onClick={() => { setOpenIndex(openIndex === index ? null : index); }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-[#7B2CBF]/0 via-[#7B2CBF]/5 to-[#3A0CA3]/0 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                
                <span className="text-white font-medium group-hover:text-[#7B2CBF] transition-colors z-10">
                  {faq.question}
                </span>
                
                <div className="relative">
                  <AnimatePresence mode="wait">
                    {openIndex === index ? (
                      <motion.div
                        key="minus"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Minus className="h-5 w-5 text-[#7B2CBF]" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="plus"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Plus className="h-5 w-5 text-[#7B2CBF]" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <motion.div 
                    className="absolute inset-0 bg-[#7B2CBF] rounded-full blur-lg"
                    animate={{ 
                      opacity: [0.2, 0.5, 0.2],
                      scale: [1, 1.4, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
              </motion.button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    variants={accordionContentVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    className="overflow-hidden relative"
                  >
                    <motion.div 
                      className="px-6 pb-6 text-gray-300"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.3 }}
                    >
                      <div className="border-t border-purple-900/30 pt-3 mt-1 relative">
                        <motion.div 
                          className="absolute left-0 top-0 w-1/3 h-px bg-gradient-to-r from-[#7B2CBF] to-transparent"
                          initial={{ scaleX: 0, originX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3, duration: 0.5 }}
                        >
                          {faq.answer}
                        </motion.div>
                      </div>
                    </motion.div>
                    
                    <AnimatePresence>
                      <motion.div 
                        className="absolute inset-0 pointer-events-none overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {generateParticles(8)}
                      </motion.div>
                    </AnimatePresence>
                    
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#121212]/20 to-transparent pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default FAQ;
