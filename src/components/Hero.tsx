import { FC } from 'react';
import { Bot } from 'lucide-react';

const Hero: FC = () => {
  return (
    <div className="relative pt-20 pb-16 text-center lg:pt-32">

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-float inline-block mb-8">
          <Bot className="h-24 w-24 text-purple-500" />
        </div>
        <h1 className="animate-fade-in text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
          <span className="block">NexusUI</span>
          <span className="block text-purple-500 animate-slide-in stagger-1">Gelişmiş Discord Botu</span>
        </h1>
        <p className="animate-fade-in stagger-2 mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Moderasyon, müzik, eğlence ve çok daha fazlasıyla Discord sunucunuzu bir üst seviyeye taşıyın!
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <a
            href="#"
            className="animate-scale-in stagger-3 px-8 py-3 text-lg font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-all hover-lift"
          >
            Sunucuna Ekle
          </a>
          <a
            href="#features"
            className="animate-scale-in stagger-4 px-8 py-3 text-lg font-medium rounded-md text-purple-500 bg-purple-900 bg-opacity-20 hover:bg-opacity-30 transition-all hover-lift"
          >
            Özellikler
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
