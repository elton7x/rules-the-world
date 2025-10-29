
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from "@/components/ui/use-toast";
import { ThumbsUp } from 'lucide-react';

function VslPlayer() {
  // This component will render a div that the external script can target.
  // We will use dangerouslySetInnerHTML to inject the complete, unmodified HTML snippet.
  // This is the most reliable way to ensure external scripts with complex initialization work correctly.
  const videoEmbedCode = `
    <div id="ifr_69015d5ab6b436ae570c0f1e_wrapper" style="margin: 0 auto; width: 100%;">
      <div style="position: relative; padding: 56.25% 0 0 0;" id="ifr_69015d5ab6b436ae570c0f1e_aspect">
        <iframe
          frameborder="0"
          allowfullscreen
          src="about:blank"
          id="ifr_69015d5ab6b436ae570c0f1e"
          style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
          referrerpolicy="origin"
          onload="this.onload=null; this.src='https://scripts.converteai.net/dbbaa54a-d953-4f00-ad45-877f15818275/players/69015d5ab6b436ae570c0f1e/v4/embed.html' + (location.search || '?') + '&vl=' + encodeURIComponent(location.href)">
        </iframe>
      </div>
    </div>
  `;

  useEffect(() => {
    const scriptId = 'converteai-sdk';
    // Ensure the script is loaded only once.
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: videoEmbedCode }} />;
}


function App() {
  const [urgencyDate, setUrgencyDate] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(526); // 8 min 46 sec = 526 seconds
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const today = new Date();
    const formatted = today.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    setUrgencyDate(formatted);
  }, []);

  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsButtonEnabled(true);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    } else {
        setIsButtonEnabled(true);
    }
  }, [timeRemaining]);

  const handleButtonClick = () => {
    if (isButtonEnabled) {
      window.location.href = 'https://app.culonga.com/chekout/88421eba-1a5b-454f-88d3-73b5fc03aa52';
    }
  };

  const comments = [
    {
      id: 1,
      name: 'João Silva',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      text: 'No princípio pensei que era burla 🤔 mas já testei e saquei sem problema ✅',
      time: '2 min',
      likes: 12,
    },
    {
      id: 2,
      name: 'Ana Costa',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      text: 'Já estou a usar há 3 dias e os lucros estão a cair direitinho 🙌',
      time: '3 min',
      likes: 8,
    },
    {
      id: 3,
      name: 'Fernando Lopes',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      text: 'Finalmente algo que funciona e não me fez perder tempo 👏',
      time: '6 min',
      likes: 23,
    },
    {
      id: 4,
      name: 'Pedro Mendes',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
      text: 'Alguém mais já sacou? Quero confirmar se paga mesmo 💰.',
      time: '8 min',
      likes: 5,
    },
    {
      id: 5,
      isReply: true,
      name: 'Fernando Lopes',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      text: 'Sim mano, nem precisa de nenhuma conta internacional...',
      time: '12 min',
      likes: 7,
    },
    {
      id: 6,
      name: 'António Carvalho',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      text: 'Saquei ontem e caiu na minha conta em menos de 24h 👌',
      time: '17 min',
      likes: 31,
    }
  ];

  return (
    <>
      <Helmet>
        <title>Método Árabe - Ganhe 50 Mil Kz Por Dia em Angola</title>
        <meta name="description" content="Milionário brasileiro revela método árabe exclusivo para fazer no mínimo 50 mil Kz por dia em Angola. Disponível por tempo limitado!" />
      </Helmet>

      <div className="min-h-screen bg-black text-white font-sans">
        <Toaster />
        
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-red-600 py-3 px-4 text-center sticky top-0 z-50 shadow-lg"
        >
          <p className="text-white font-bold text-sm md:text-base flex items-center justify-center gap-2">
            <span className="animate-pulse">🔥</span>
            <span>Disponível em ANGOLA até o dia {urgencyDate}</span>
            <span className="animate-pulse">🔥</span>
          </p>
        </motion.div>

        <main className="max-w-3xl mx-auto px-4 py-8 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-8 md:mb-12"
          >
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black uppercase leading-tight">
              <span className="bg-red-600 text-white px-2 py-1 rounded-md inline-block my-1">Milionário Brasileiro</span>
              <span> Revela </span>
              <span className="bg-yellow-400 text-black px-2 py-1 rounded-md inline-block my-1">Método Árabe</span>
              <span> Para Fazer no Mínimo </span>
              <span className="bg-red-600 text-white px-2 py-1 rounded-md inline-block my-1">50 Mil Kz Por Dia</span>
              <span> em Angola</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8 md:mb-12"
          >
            <div className="bg-black rounded-xl overflow-hidden shadow-2xl border-2 border-gray-800 aspect-video">
              <VslPlayer />
            </div>
          </motion.div>
          
          <div className="mb-10 text-center min-h-[96px]">
            {isButtonEnabled && (
                <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                >
                <button 
                    onClick={handleButtonClick}
                    className="relative font-bold uppercase text-lg md:text-xl px-10 py-4 rounded-full shadow-lg transform transition-all duration-300 bg-green-500 text-white shadow-green-500/40 hover:scale-105 animate-pulse-bright cursor-pointer"
                >
                    GARANTIR ACESSO AGORA
                </button>
                </motion.div>
            )}
           </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-white rounded-xl shadow-xl text-black"
          >
            <div className="p-4 border-b border-gray-200">
               <h2 className="text-lg font-bold text-gray-800">
                Comentários Recentes
              </h2>
            </div>
            
            <div className="p-4 space-y-4">
              {comments.map((comment, index) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  className={`flex gap-3 ${comment.isReply ? 'ml-8' : ''}`}
                >
                  <img
                    src={comment.avatar}
                    alt={comment.name}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0 mt-1"
                  />
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-xl p-3 relative">
                      <span className="font-bold text-blue-600 text-sm block">{comment.name}</span>
                      <p className="text-gray-800 text-sm leading-relaxed">
                        {comment.text}
                      </p>
                      {comment.likes > 0 && (
                         <div className="absolute -bottom-3 right-2 flex items-center bg-white rounded-full shadow-md px-2 py-0.5">
                            <ThumbsUp className="w-3 h-3 text-blue-500"/>
                            <span className="text-xs text-gray-600 font-semibold ml-1">{comment.likes}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1.5 px-3 text-xs text-gray-500 font-bold">
                      <button onClick={() => toast({
                        title: "Funcionalidade em breve!",
                        description: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀",
                      })} className="hover:underline">
                        Curtir
                      </button>
                      <span>·</span>
                      <button onClick={() => toast({
                        title: "Funcionalidade em breve!",
                        description: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀",
                      })} className="hover:underline">
                        Responder
                      </button>
                      <span>·</span>
                      <span className="font-normal">{comment.time}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
             <div className="p-4 bg-gray-100 rounded-b-xl flex items-center justify-center gap-2 text-gray-600 text-sm">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Inicie sessão com o Facebook para comentar</span>
              </div>
          </motion.div>
        </main>
      </div>
    </>
  );
}

export default App;
