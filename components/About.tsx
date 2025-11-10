
import React from 'react';

export const About: React.FC = () => {
  return (
    <section id="sobre" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/3">
            <img 
              src="https://picsum.photos/seed/travel-expert/500/500" 
              alt="Kemuel Kesley, especialista em viagens" 
              className="rounded-full shadow-2xl w-64 h-64 md:w-80 md:h-80 mx-auto object-cover border-4 border-white"
            />
          </div>
          <div className="md:w-2/3 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">Sobre Mim</h2>
            <p className="text-lg text-slate-600 mb-4 leading-relaxed">
              Olá! Sou <strong>Kemuel Kesley</strong>, um apaixonado por desbravar o desconhecido e compartilhar as maravilhas do nosso planeta. Com mais de 10 anos de experiência em planejamento de viagens e expedições, meu trabalho é transformar sonhos em roteiros inesquecíveis.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Seja uma trilha em montanhas remotas, um mergulho em águas cristalinas ou um treinamento de sobrevivência, eu ofereço a expertise e a segurança para que sua única preocupação seja aproveitar cada momento. Vamos juntos criar a sua próxima grande história.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
