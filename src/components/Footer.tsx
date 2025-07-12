import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Bot, Github, Disc as Discord, Mail, Instagram, Globe, Code } from 'lucide-react';

const Footer = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const socialIconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "backOut",
      },
    },
    hover: { 
      scale: 1.1,
      rotate: [0, -10, 10, -5, 5, 0],
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };
  
  const socialLinks = [
    { icon: Discord, href: "https://discord.gg/veronicajb", label: "Discord" },
    { icon: Instagram, href: "https://instagram.com/muffinsgram", label: "Instagram" },
    { icon: Globe, href: "https://veronicajb.xyz", label: "Geliştirici Sitesi" },
  ];

  return (
    <footer ref={ref} className="relative py-16 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#1E1E1E]/95 to-[#121212]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        <div className="absolute inset-0 bg-noise opacity-[0.015]" />
        <div className="absolute inset-0 bg-[#7B2CBF]/5 backdrop-blur-[2px]" />
      </div>

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <motion.div 
            className="col-span-1 md:col-span-2"
            variants={itemVariants}
          >
            <motion.div 
              className="flex items-center mb-6 group"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Bot className="h-8 w-8 text-[#7B2CBF] group-hover:text-[#3A0CA3] transition-colors duration-300" />
              </motion.div>
              <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 group-hover:from-[#7B2CBF] group-hover:to-[#3A0CA3] transition-colors duration-300">
                Velora
              </span>
            </motion.div>
            <motion.p 
              className="text-gray-400 mb-6 max-w-md"
              variants={itemVariants}
            >
              Güçlü moderasyon araçları, müzik oynatma ve eğlenceli komutlarla Discord sunucunuzu geliştirin.
              Botumuzun kullanıldığı binlerce sunucuya katılın!
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-4"
              variants={itemVariants}
            >
              {socialLinks.slice(0, 3).map((social, _index) => (
                <motion.a
                  key={_index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#7B2CBF] transition-colors duration-300 flex items-center gap-2"
                  variants={socialIconVariants}
                  whileHover="hover"
                  style={{ originX: 0.5, originY: 0.5 }}
                >
                  <social.icon className="h-5 w-5" />
                  <span className="text-sm">{social.label}</span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold mb-6">Hızlı Bağlantılar</h3>
            <ul className="space-y-4">
              {[
                { name: 'Özellikler', path: 'features' },
                { name: 'Komutlar', path: 'commands' },
                { name: 'SSS', path: 'faq' },
                { name: 'Destek Sunucusu', path: 'https://discord.gg/wCK5dVSY2n', external: true }
              ].map((item, _index) => (
                <motion.li
                  key={item.name}
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <a 
                    href={item.external ? item.path : `#${item.path}`}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="text-gray-400 hover:text-[#7B2CBF] transition-colors duration-300 flex items-center"
                  >
                    {item.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold mb-6">Diğer Bağlantılar</h3>
            <ul className="space-y-4">
              {socialLinks.slice(3).map((item, _index) => (
                <motion.li
                  key={_index}
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <a 
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#7B2CBF] transition-colors duration-300 flex items-center gap-2"
                  >
                    <item.icon className="h-5 w-5 text-[#7B2CBF]" />
                    <span>{item.label}</span>
                  </a>
                </motion.li>
              ))}
              <motion.li 
                className="flex items-center text-gray-400 group"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Mail className="h-5 w-5 mr-2 text-[#7B2CBF] group-hover:text-[#3A0CA3] transition-colors duration-300" />
                <a 
                  href="mailto:emirhan.03123@gmail.com"
                  className="hover:text-[#7B2CBF] transition-colors duration-300"
                >
                  İletişim
                </a>
              </motion.li>
            </ul>
          </motion.div>
        </div>

        <motion.div 
          className="text-center mt-12"
          variants={itemVariants}
        >
          <p className="text-gray-400">
            © {new Date().getFullYear()} Velora. Tüm hakları saklıdır.
          </p>
        </motion.div>
      </motion.div>

      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#7B2CBF] via-[#3A0CA3] to-[#7B2CBF] opacity-20" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
    </footer>
  );
};

export default Footer;
