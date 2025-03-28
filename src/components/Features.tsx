import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield, Music, MessageSquare, Star } from 'lucide-react';

interface FeatureItem {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

interface FeatureCardProps {
  feature: FeatureItem;
  index: number;
}

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: 'Moderasyon',
      description: 'Güçlü moderasyon araçları ile sunucunuzu güvende tutun. Otomatik mod, raid koruması ve ayrıntılı kayıtlarla yönetimi kolaylaştırın.',
    },
    {
      icon: Music,
      title: 'Müzik',
      description: 'Kristal netliğinde ses kalitesi, oynatma listeleri ve gelişmiş sıra yönetimi ile birden fazla kaynaktan müzik çalın.',
    },
    {
      icon: MessageSquare,
      title: 'Özel Komutlar',
      description: "Sunucunuzun ihtiyaçlarına göre özelleştirilmiş komutlar ve otomatik yanıtlar oluşturun.",
    },
    {
      icon: Star,
      title: 'Eğlence ve Oyunlar',
      description: 'Mini oyunlar, bilgi yarışmaları, anketler ve diğer etkileşimli özelliklerle topluluğunuzu eğlendirin.',
    },
  ];

  return (
    <div id="features" className="relative py-16">

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-white">Özellikler</h2>
          <p className="mt-4 text-gray-400">Discord sunucunuzu yönetmek ve geliştirmek için ihtiyacınız olan her şey</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
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

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      whileHover={{
        scale: 1.02,
        rotateX: 5,
        rotateY: 5,
        transition: { duration: 0.3 }
      }}
      className="relative group perspective-1000"
    >
      <div className="relative overflow-hidden rounded-lg bg-[#1E1E1E]/60 backdrop-blur-sm p-6 transform-gpu transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-[#7B2CBF]/0 via-[#7B2CBF]/20 to-[#3A0CA3]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#7B2CBF]/30 rounded-full"
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 2 + 1,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
        <div className="relative z-10">
          <motion.div
            variants={iconVariants}
            className="relative mb-4"
          >
            <feature.icon className="h-12 w-12 text-[#7B2CBF] transform transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 bg-[#7B2CBF] opacity-20 blur-xl transform scale-150 transition-opacity duration-300 group-hover:opacity-30" />
          </motion.div>

          <motion.div variants={contentVariants}>
            <h3 className="text-xl font-semibold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 group-hover:from-[#7B2CBF] group-hover:to-[#3A0CA3] transition-colors duration-300">
              {feature.title}
            </h3>
            <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
              {feature.description}
            </p>
          </motion.div>
        </div>
        <div 
          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: 'linear-gradient(45deg, rgba(123,44,191,0.1) 0%, rgba(58,12,163,0.1) 100%)',
            transform: 'translateZ(20px)',
            pointerEvents: 'none',
          }}
        />
      </div>
    </motion.div>
  );
};

export default Features;
