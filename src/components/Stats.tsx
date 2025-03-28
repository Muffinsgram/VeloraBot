import React, { useEffect, useRef, useState } from 'react';
import { Users, Server, Zap } from 'lucide-react';

interface StatItem {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
}

const Stats = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionPreferenceChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleMotionPreferenceChange);

    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(); 
          }
        });
      },
      { threshold: 0.2 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      mediaQuery.removeEventListener('change', handleMotionPreferenceChange);
      observer.disconnect();
    };
  }, []);

  const stats = [
    { icon: Server, label: 'Sunucular', value: '10K+' },
    { icon: Users, label: 'Kullanıcılar', value: '1M+' },
    { icon: Zap, label: 'Komut Kullanımı', value: '50M+' },
  ];

  return (
    <div 
      ref={statsRef}
      className="relative py-16 overflow-hidden"
    >
      

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`
                relative group
                bg-[#1E1E1E]/60 backdrop-blur-sm rounded-lg p-6
                transform transition-all duration-300
                hover:translate-y-[-2px]
                hover:shadow-[0_0_30px_-5px_rgba(147,51,234,0.3)]
                ${isVisible && !prefersReducedMotion ? 'animate-in' : ''}
              `}
              style={{
                animationDelay: `${index * 100}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.5s ease, transform 0.5s ease',
              }}
            >
              {}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#7B2CBF]/0 via-[#7B2CBF]/5 to-[#3A0CA3]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {}
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative">
                  <stat.icon className={`
                    h-12 w-12 text-[#7B2CBF]
                    transform transition-transform duration-300
                    group-hover:scale-110
                    ${!prefersReducedMotion && 'animate-pulse-slow'}
                  `} />
                  {}
                  <div className="absolute inset-0 bg-[#7B2CBF] opacity-20 blur-xl transform scale-150 transition-opacity duration-300 group-hover:opacity-30" />
                </div>

                <div className="relative mt-4">
                  <div className={`
                    text-4xl font-bold text-white mb-2
                    bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80
                    transform transition-all duration-300
                    group-hover:from-[#7B2CBF] group-hover:to-[#3A0CA3]
                  `}>
                    {stat.value}
                  </div>
                  <div className="text-gray-400 group-hover:text-[#7B2CBF]/80 transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
              </div>

              
              <div className="absolute inset-0 rounded-lg transition-transform duration-300 group-hover:[transform:rotateX(2deg)_rotateY(2deg)]" 
                style={{ transformStyle: 'preserve-3d' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
