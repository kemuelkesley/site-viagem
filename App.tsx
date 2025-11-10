
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Gallery } from './components/Gallery';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { GalleryModal } from './components/GalleryModal';
import { GalleryItem } from './types';

const App: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    { id: 1, type: 'image', src: 'https://picsum.photos/id/1015/1200/800', thumbnail: 'https://picsum.photos/id/1015/400/300', title: 'Vale Sereno', description: 'Uma paisagem montanhosa deslumbrante ao nascer do sol.', videoUrl: 'https://www.youtube.com/watch?v=z_m0b_pfI-s' },
    { id: 2, type: 'image', src: 'https://picsum.photos/id/1018/1200/800', thumbnail: 'https://picsum.photos/id/1018/400/300', title: 'Lago Escondido', description: 'Águas cristalinas refletindo o céu azul profundo.' },
    { id: 3, type: 'image', src: 'https://picsum.photos/id/1025/1200/800', thumbnail: 'https://picsum.photos/id/1025/400/300', title: 'Cachorro Aventureiro', description: 'Meu parceiro de quatro patas em uma de nossas trilhas.' },
    { id: 4, type: 'video', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'https://picsum.photos/id/237/400/300', title: 'Treinamento de Sobrevivência', description: 'Vídeo do nosso último treinamento intensivo na selva.' },
    { id: 5, type: 'image', src: 'https://picsum.photos/id/1041/1200/800', thumbnail: 'https://picsum.photos/id/1041/400/300', title: 'Aurora Boreal', description: 'A dança mágica das luzes no céu noturno da Islândia.', videoUrl: 'https://www.youtube.com/watch?v=fVsONlc3OUY' },
    { id: 6, type: 'image', src: 'https://picsum.photos/id/1050/1200/800', thumbnail: 'https://picsum.photos/id/1050/400/300', title: 'Estrada Infinita', description: 'Dirigindo por uma estrada deserta em direção ao horizonte.' },
    { id: 7, type: 'image', src: 'https://picsum.photos/id/1060/1200/800', thumbnail: 'https://picsum.photos/id/1060/400/300', title: 'Caminhos da Floresta', description: 'Luz do sol filtrando através das árvores altas.' },
    { id: 8, type: 'image', src: 'https://picsum.photos/id/1074/1200/800', thumbnail: 'https://picsum.photos/id/1074/400/300', title: 'Pico da Neblina', description: 'Acima das nuvens no topo de uma montanha majestosa.' },
    { id: 9, type: 'image', src: 'https://picsum.photos/id/1084/1200/800', thumbnail: 'https://picsum.photos/id/1084/400/300', title: 'Costa Selvagem', description: 'Ondas quebrando contra as falésias rochosas.' },
    { id: 10, type: 'image', src: 'https://picsum.photos/id/200/1200/800', thumbnail: 'https://picsum.photos/id/200/400/300', title: 'Companheiro Fiel', description: 'Outro momento com o melhor parceiro de aventuras.' },
    { id: 11, type: 'image', src: 'https://picsum.photos/id/305/1200/800', thumbnail: 'https://picsum.photos/id/305/400/300', title: 'Cabana Aconchegante', description: 'Refúgio tranquilo no coração da natureza.' },
    { id: 12, type: 'video', src: 'https://www.youtube.com/embed/jNQXAC9IVRw', thumbnail: 'https://picsum.photos/id/431/400/300', title: 'Mergulho Profundo', description: 'Explorando a vida marinha em um recife de coral vibrante.' },
  ];

  const handleOpenModal = (item: GalleryItem) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };


  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Gallery items={galleryItems} onOpenModal={handleOpenModal} />
        <Contact />
      </main>
      <Footer />
      {selectedItem && (
        <GalleryModal item={selectedItem} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default App;
