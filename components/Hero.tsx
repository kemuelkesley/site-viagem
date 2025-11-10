
import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="h-screen bg-cover bg-center flex items-center justify-center text-white" style={{ backgroundImage: "url('https://picsum.photos/id/10/1920/1080')" }}>
      <div className="bg-black/50 absolute inset-0"></div>
      <div className="text-center z-10 p-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold drop-shadow-lg mb-4">Kemuel Kesley</h1>
        <p className="text-lg md:text-2xl font-light max-w-2xl mx-auto drop-shadow-md">Explorando o mundo, uma aventura de cada vez. Junte-se a mim e descubra o extraordinário.</p>
        <a href="#contato" className="mt-8 inline-block bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-8 rounded-full transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-lg">
          Planeje sua Aventura
        </a>
      </div>
    </section>
  );
};
