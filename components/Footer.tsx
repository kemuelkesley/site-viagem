
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-white py-8">
      <div className="container mx-auto px-6 text-center">
        <p>&copy; {new Date().getFullYear()} Kemuel Kesley. Todos os direitos reservados.</p>
        <p className="text-sm text-slate-400 mt-2">Criado para inspirar sua próxima grande aventura.</p>
      </div>
    </footer>
  );
};
