import React, { useState, useEffect } from 'react';
import { Heart, Star, Sparkles, Gift, Music } from 'lucide-react';

function Carte() {
  const [showGiftButton, setShowGiftButton] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');
  const [balloons, setBalloons] = useState([]);

  const images = [1, 2, 3]; // Placeholder pour les images

  const fullText = "🎉 Mon Amour, Joyeux Anniversaire Russel Yvon ! 🎉";
  const secretMessage = "Mon cœur, en ce jour si précieux, je t'offre une page tissée d'amour, un petit univers rien que pour nous deux 💖. Depuis Nkongsamba, mon âme chante pour toi à chaque instant. Tu es ma lumière, mon tout, mon bonheur éternel. Joyeux anniversaire, mon amour chéri ! 🎂💫";

  // Typewriter effect for title
  useEffect(() => {
    const timer = setTimeout(() => setShowGiftButton(true), 3000);
    let i = 0;
    const typeEffect = setInterval(() => {
      if (i < fullText.length) {
        setTypewriterText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typeEffect);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      clearInterval(typeEffect);
    };
  }, []);

  // Génération des ballons avec logique CSS (comme les cœurs)
  useEffect(() => {
    const generateBalloon = () => {
      const newBalloon = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        animationDelay: Math.random() * 3,
        size: Math.random() * 20 + 40, // Ballons plus gros que les cœurs
        color: [
          'bg-pink-400',
          'bg-purple-400',
          'bg-blue-400',
          'bg-yellow-400',
          'bg-red-400',
          'bg-indigo-400',
        ][Math.floor(Math.random() * 6)],
      };
      setBalloons(prev => [...prev.slice(-8), newBalloon]); // Max 8 ballons
    };

    const interval = setInterval(generateBalloon, 2500); // Nouveau ballon toutes les 2.5s
    return () => clearInterval(interval);
  }, []);

  const handleGiftClick = () => {
    setShowMessage(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  };

  // Twinkling stars
  const stars = Array.from({ length: 60 }, (_, i) => (
    <div
      key={i}
      className="absolute animate-pulse"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2.5}s`,
        animationDuration: `${1.5 + Math.random() * 2}s`,
      }}
    >
      <Star className="w-3 h-3 text-yellow-300 opacity-70" fill="currentColor" />
    </div>
  ));

  // Confetti
  const confetti = Array.from({ length: 120 }, (_, i) => (
    <div
      key={i}
      className={`absolute animate-fall ${showConfetti ? 'opacity-100' : 'opacity-0'}`}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${-10 - Math.random() * 20}%`,
        animationDelay: `${Math.random() * 0.8}s`,
        animationDuration: `${1 + Math.random() * 1.5}s`,
        transform: `rotate(${Math.random() * 360}deg)`,
      }}
    >
      <div
        className={`w-3 h-3 ${
          ['bg-pink-400', 'bg-purple-400', 'bg-yellow-400', 'bg-blue-400', 'bg-red-400'][Math.floor(Math.random() * 5)]
        } rounded-sm`}
      ></div>
    </div>
  ));

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-400 to-indigo-500 overflow-hidden relative font-sans">
      {/* Twinkling stars */}
      <div className="fixed inset-0 pointer-events-none">{stars}</div>

      {/* Confetti */}
      <div className="fixed inset-0 pointer-events-none z-50">{confetti}</div>

      {/* Ballons flottants avec animation CSS */}
      {balloons.map(balloon => (
        <div
          key={balloon.id}
          className={`absolute ${balloon.color} opacity-80 shadow-lg animate-bounce pointer-events-none z-10`}
          style={{
            left: `${balloon.left}%`,
            top: '100%',
            width: `${balloon.size}px`,
            height: `${balloon.size * 1.3}px`, // Forme de ballon
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            animationDelay: `${balloon.animationDelay}s`,
            animationDuration: '12s',
            animationName: 'float-up-balloon',
            animationTimingFunction: 'ease-out',
            animationFillMode: 'forwards',
          }}
        >
          {/* Ficelle du ballon */}
          <div 
            className="absolute top-full left-1/2 w-0.5 bg-gray-600 opacity-70"
            style={{
              height: `${balloon.size * 0.8}px`,
              transform: 'translateX(-50%)',
            }}
          ></div>
          {/* Reflet sur le ballon */}
          <div className="absolute top-2 left-2 w-3 h-3 bg-white opacity-40 rounded-full"></div>
        </div>
      ))}

      <div className="container mx-auto px-4 py-8 relative z-20 flex flex-col items-center justify-center min-h-screen">
        {/* Expressive Title Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-8 min-h-[80px] flex items-center justify-center relative">
            <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent animate-pulse">
              {typewriterText}
            </span>
            <span className="animate-pulse ml-2 text-pink-300">|</span>
            <Sparkles className="absolute w-12 h-12 text-yellow-300 -top-6 -right-6 animate-spin-slow" />
          </h1>

          {/* Heart with Photo Placeholder */}
          <div className="mb-12 transform hover:scale-110 transition-transform duration-500">
            <div className="relative inline-block">
              <div className="w-48 h-48 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-pink-300 shadow-2xl overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-pink-200 text-lg font-medium">
                  <Heart className="w-20 h-20 animate-pulse" fill="currentColor" />
                  {/* Remplace par <img src={photo2} alt="" /> */}
                </div>
              </div>
              <div className="absolute -top-3 -right-3">
                <Sparkles className="w-10 h-10 text-yellow-300 animate-spin" />
              </div>
              <div className="absolute -bottom-3 -left-3">
                <Star className="w-8 h-8 text-pink-300 animate-bounce" fill="currentColor" />
              </div>
            </div>
          </div>

          {/* Romantic Message from Nkongsamba */}
          <p className="text-white/90 text-xl md:text-2xl font-medium tracking-wide animate-fade-in">
            💞 Depuis Nkongsamba, mon cœur bat pour toi, mon amour éternel 💞
          </p>
        </div>

        {/* Gift Button */}
        {showGiftButton && !showMessage && (
          <div className="text-center transform transition-all duration-1000 animate-bounce">
            <button
              onClick={handleGiftClick}
              className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white font-bold py-6 px-12 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 text-xl"
            >
              <div className="flex items-center gap-3">
                <Gift className="w-8 h-8 animate-pulse" />
                <span>Ouvre ton cadeau, mon amour chéri</span>
                <Heart className="w-8 h-8 animate-pulse" fill="currentColor" />
              </div>
            </button>
          </div>
        )}

        {/* Secret Message with Photo Placeholders */}
        {showMessage && (
          <div className="max-w-4xl mx-auto text-center transform transition-all duration-2000 animate-fade-in">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-pink-300">
              <div className="mb-6">
                <div className="flex justify-center gap-2 mb-4">
                  {images.map((_, i) => (
                    <Star
                      key={i}
                      className="w-8 h-8 text-yellow-400 animate-pulse"
                      fill="currentColor"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
                  À Mon Amour Éternel 💖
                </h2>
              </div>

              <div className="text-lg text-gray-700 leading-relaxed space-y-6">
                <p className="text-xl font-medium text-purple-700">{secretMessage}</p>

                {/* Photo Gallery Placeholder */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  {images.map((_, i) => (
                    <div
                      key={i}
                      className="relative w-full h-48 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border-2 border-pink-200 shadow-lg"
                    >
                      <Heart className="w-12 h-12 text-pink-300 animate-pulse" fill="currentColor" />
                      <span className="absolute text-white/80 font-medium">Notre moment #{i + 1}</span>
                      {/* Remplace par <img src={photo} alt="" /> */}
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl">
                  <p className="text-xl font-bold mb-3">
                    🎂 Mon amour, tu me manques à l'infini ! 🎂
                  </p>
                  <p className="text-lg">
                    Vivement nos retrouvailles pour t'enlacer, te couvrir de baisers et danser au rythme de notre amour... Cette page est notre petit nid d'amour virtuel ! 😘💕
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative Music Button */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-6 py-3 text-purple-600">
                <Music className="w-5 h-5 animate-pulse" />
                <span className="text-sm font-medium">Playing: Notre mélodie d'amour... 💕</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fall {
          0% { transform: translateY(-100%) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float-up-balloon {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-120vh) rotate(15deg);
            opacity: 0;
          }
        }
        .animate-fade-in {
          animation: fade-in 1.5s ease-out;
        }
        .animate-fall {
          animation: fall 2s linear forwards;
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default Carte;