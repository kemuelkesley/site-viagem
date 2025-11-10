import React, { useState, FormEvent } from 'react';
import { SocialIcon } from './SocialIcon';

type FormState = {
  name: string;
  email: string;
  message: string;
};

type SubmissionStatus = 'idle' | 'loading' | 'success' | 'error';

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [responseMessage, setResponseMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setResponseMessage('');

    // Simulação de chamada de API
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulação de sucesso/erro
    if (formState.name && formState.email && formState.message) {
      setStatus('success');
      setResponseMessage('Mensagem enviada com sucesso! Entrarei em contato em breve.');
      setFormState({ name: '', email: '', message: '' });
    } else {
      setStatus('error');
      setResponseMessage('Ocorreu um erro ao enviar a mensagem. Tente novamente.');
    }
  };

  return (
    <section id="contato" className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-2">Vamos Conversar?</h2>
        <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto">
          Pronto para planejar sua próxima aventura ou tem alguma dúvida? Preencha o formulário ou entre em contato pelas <strong>redes sociais</strong>!
        </p>

        <div className="max-w-2xl mx-auto bg-slate-50 p-8 rounded-lg shadow-md mb-16 text-left">
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-6">
              <label htmlFor="name" className="block text-slate-700 font-medium mb-2">Seu Nome</label>
              <input 
                type="text" 
                id="name" 
                name="name"
                value={formState.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300" 
                placeholder="Nome completo"
                required 
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-slate-700 font-medium mb-2">Seu Email</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                value={formState.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300" 
                placeholder="seu.email@exemplo.com"
                required 
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-slate-700 font-medium mb-2">Sua Mensagem</label>
              <textarea 
                id="message" 
                name="message"
                value={formState.message}
                onChange={handleInputChange}
                rows={5}
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300"
                placeholder="Olá, gostaria de mais informações sobre..."
                required
              ></textarea>
            </div>
            <div className="text-center">
              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="w-full sm:w-auto inline-block bg-sky-600 hover:bg-sky-700 disabled:bg-sky-400 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
              >
                {status === 'loading' ? (
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                ) : 'Enviar Mensagem'}
              </button>
            </div>
          </form>
          {responseMessage && (
            <div className={`mt-6 text-center p-3 rounded-md ${status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {responseMessage}
            </div>
          )}
        </div>

        <div className="flex justify-center items-center gap-6 md:gap-8 flex-wrap">
          <SocialIcon href="https://wa.me/5511999999999" iconClass="fab fa-whatsapp" label="WhatsApp" />
          <SocialIcon href="https://instagram.com" iconClass="fab fa-instagram" label="Instagram" />
          <SocialIcon href="https://twitter.com" iconClass="fab fa-twitter" label="Twitter" />
          <SocialIcon href="https://tiktok.com" iconClass="fab fa-tiktok" label="TikTok" />
          <SocialIcon href="mailto:contato@exemplo.com" iconClass="far fa-envelope" label="Email" />
        </div>
      </div>
    </section>
  );
};
