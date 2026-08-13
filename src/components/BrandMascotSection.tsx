import React from 'react';
import { MascotBe } from '@/components/MascotBe';
import { brandCopy } from '@/content/brand-copy';
import { Container } from '@/components/Container';

export const BrandMascotSection: React.FC = () => {
  return (
    <section className="py-14 md:py-20 lg:py-24 bg-white border-b border-gray-100">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column - Copy */}
          <div className="md:col-span-7 lg:col-span-7 space-y-6">
            <span className="text-primary-orange font-bold text-xs uppercase tracking-wider">Nosso Jeito de Atender</span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-primary-navy tracking-tight max-w-[500px]">
              Por que nosso mascote é um esquilo?
            </h2>
            <p className="text-base text-gray-600 leading-relaxed font-sans max-w-[600px]">
              O esquilo é rápido, atento e preparado. Essas características representam o jeito BCred de atender: entender sua necessidade sem demora, explicar as possibilidades com clareza e acompanhar cada etapa com cuidado.
            </p>
            
            <div className="space-y-6 pt-4 max-w-[600px]">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-orange/10 flex items-center justify-center text-primary-orange font-bold font-display mt-1">1</div>
                <div className="ml-4">
                  <h4 className="font-display font-bold text-lg text-primary-navy">Ágil no atendimento</h4>
                  <p className="text-sm text-gray-600 font-sans mt-1">Você recebe uma orientação inicial sem ficar esperando sem saber o que está acontecendo.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-blue/10 flex items-center justify-center text-primary-blue font-bold font-display mt-1">2</div>
                <div className="ml-4">
                  <h4 className="font-display font-bold text-lg text-primary-navy">Atento aos detalhes</h4>
                  <p className="text-sm text-gray-600 font-sans mt-1">Cada perfil e modalidade possui condições diferentes. Nossa equipe explica os pontos importantes antes de você decidir.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-navy/10 flex items-center justify-center text-primary-navy font-bold font-display mt-1">3</div>
                <div className="ml-4">
                  <h4 className="font-display font-bold text-lg text-primary-navy">Fácil de entender</h4>
                  <p className="text-sm text-gray-600 font-sans mt-1">Falamos de forma simples, sem termos complicados e sem pressionar você a contratar.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Mascot */}
          <div className="md:col-span-5 lg:col-span-5 flex justify-center mt-8 md:mt-0">
            <MascotBe pose="pointer" className="w-64 h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px]" />
          </div>
          
        </div>
      </Container>
    </section>
  );
};
