import React, { useState, useEffect, useRef } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [canAnimate, setCanAnimate] = useState(true);
  const faqRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && canAnimate) {
            setIsVisible(true);
            setCanAnimate(false);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (faqRef.current) {
      observer.observe(faqRef.current);
    }

    return () => observer.disconnect();
  }, [canAnimate]);

  const faqs = [
    {
      question: 'How do I add the bot to my server?',
      answer: 'Click the "Add to Discord" button at the top of the page and follow the Discord authorization process. Make sure you have the "Manage Server" permission in the server where you want to add the bot.',
    },
    {
      question: 'Is the bot free to use?',
      answer: 'Yes! The bot is free to use with all basic features. We also offer a premium tier with additional features for power users.',
    },
    {
      question: 'How can I get support?',
      answer: 'Join our support server for immediate help from our team and community. You can also check our documentation for detailed guides and troubleshooting tips.',
    },
    {
      question: 'What permissions does the bot need?',
      answer: 'The bot requires basic permissions to function properly, including sending messages, managing messages, and connecting to voice channels. Additional permissions may be required for specific features.',
    },
  ];

  return (
    <div 
      id="faq" 
      ref={faqRef}
      className={`relative py-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#1E1E1E]/95 to-[#121212]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        <div className="absolute inset-0 bg-noise opacity-[0.015]" />
        <div className="absolute inset-0 bg-[#7B2CBF]/5 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white relative inline-block">
            <span className="relative z-10">Frequently Asked Questions</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#7B2CBF] to-[#3A0CA3] opacity-10 blur-xl transform scale-150" />
          </h2>
          <p className="mt-4 text-gray-400">
            Find answers to common questions about our bot
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-[#1E1E1E]/60 backdrop-blur-sm rounded-lg overflow-hidden transform
                hover:shadow-lg hover:shadow-[#7B2CBF]/10 transition-all duration-300`}
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center group"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-white font-medium group-hover:text-[#7B2CBF] transition-colors">
                  {faq.question}
                </span>
                <div className="relative">
                  {openIndex === index ? (
                    <Minus className="h-5 w-5 text-[#7B2CBF] transform rotate-0 transition-transform" />
                  ) : (
                    <Plus className="h-5 w-5 text-[#7B2CBF] transform rotate-0 transition-transform" />
                  )}
                  <div className="absolute inset-0 bg-[#7B2CBF] blur-lg opacity-20 scale-150" />
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out
                  ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-6 pb-4 text-gray-400">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;