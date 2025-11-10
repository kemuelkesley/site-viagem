import React, { useState, FormEvent, useRef } from 'react';
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

  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const messageRef = useRef<HTMLTextAreaElement | null>(null);

  const validateForm = () => {
    const name = formState.name.trim();
    const email = formState.email.trim();
    const message = formState.message.trim();

    if (!name) {
      return { valid: false, field: 'name', message: 'Por favor, preencha seu nome.' };
    }

    if (!email) {
      return { valid: false, field: 'email', message: 'Por favor, preencha seu email.' };
    }

    const emailRe = /^\S+@\S+\.\S+$/;
    if (!emailRe.test(email)) {
      return { valid: false, field: 'email', message: 'Por favor, informe um email válido.' };
    }

    if (!message) {
      return { valid: false, field: 'message', message: 'Por favor, escreva sua mensagem.' };
    }

    return { valid: true };
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Envia para o endpoint do Netlify, mas só se a validação passar
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // validação antes de enviar
    const validation = validateForm();
    if (!validation.valid) {
      setStatus('idle');
      setResponseMessage(validation.message || 'Preencha todos os campos.');
      // foca o primeiro campo inválido
      if (validation.field === 'name') nameRef.current?.focus();
      if (validation.field === 'email') emailRef.current?.focus();
      if (validation.field === 'message') messageRef.current?.focus();
      return;
    }

    setStatus('loading');
    setResponseMessage('');

    // Construir body URL-encoded conforme recomendado pelo Netlify para AJAX
    const encoded = new URLSearchParams();
    encoded.append('form-name', 'contact');
    // honeypot (bot-field) - enviar vazio quando usuário legítimo
    encoded.append('bot-field', '');
    Object.entries(formState).forEach(([key, value]) =>
      encoded.append(key, String(value))
    );

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encoded.toString(),
      });

      if (response.ok) {
        setStatus('success');
        setResponseMessage(
          'Mensagem enviada com sucesso! Entrarei em contato em breve.'
        );
        setFormState({ name: '', email: '', message: '' });
      } else {
        throw new Error('Falha ao enviar');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
      setResponseMessage(
        'Ocorreu um erro ao enviar a mensagem. Tente novamente.'
      );
    }
  };

  return (
    <section id="contato" className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-2">
          Vamos Conversar?
        </h2>
        <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto">
          Pronto para planejar sua próxima aventura ou tem alguma dúvida?
          Preencha o formulário ou entre em contato pelas{' '}
          <strong>redes sociais</strong>!
        </p>

        <div className="max-w-2xl mx-auto bg-slate-50 p-8 rounded-lg shadow-md mb-16 text-left">
          {/* 🔹 ALTERADO: adicionado suporte ao Netlify Forms */}
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            noValidate
          >
            {/* 🔹 Campos ocultos obrigatórios para o Netlify detectar o form */}
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden">
              <label>
                Não preencha este campo: <input name="bot-field" />
              </label>
            </p>

            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-slate-700 font-medium mb-2"
              >
                Seu Nome
              </label>
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
              <label
                htmlFor="email"
                className="block text-slate-700 font-medium mb-2"
              >
                Seu Email
              </label>
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
              <label
                htmlFor="message"
                className="block text-slate-700 font-medium mb-2"
              >
                Sua Mensagem
              </label>
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
                ) : (
                  'Enviar Mensagem'
                )}
              </button>
            </div>
          </form>

          {responseMessage && (
            <div
              className={`mt-6 text-center p-3 rounded-md ${
                status === 'success'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {responseMessage}
            </div>
          )}
        </div>

        <div className="flex justify-center items-center gap-6 md:gap-8 flex-wrap">
          <SocialIcon
            href="https://wa.me/5511999999999"
            iconClass="fab fa-whatsapp"
            label="WhatsApp"
          />
          <SocialIcon
            href="https://instagram.com"
            iconClass="fab fa-instagram"
            label="Instagram"
          />
          <SocialIcon
            href="https://twitter.com"
            iconClass="fab fa-twitter"
            label="Twitter"
          />
          <SocialIcon
            href="https://tiktok.com"
            iconClass="fab fa-tiktok"
            label="TikTok"
          />
          <SocialIcon
            href="mailto:contato@exemplo.com"
            iconClass="far fa-envelope"
            label="Email"
          />
        </div>
      </div>
    </section>
  );
};
