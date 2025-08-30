import React, { useRef,useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { TypeAnimation } from 'react-type-animation';
import { Heart, Star, Sparkles, Camera, MapPin, Calendar, Gift } from 'lucide-react';

import photo1 from '../images/photo1.jpg';
import photo2 from '../images/photo2.jpg';
import photo3 from '../images/photo3.jpg';
import photo4 from '../images/photo4.jpg';
import music from '../musique/Ronisia_-_Doucement_(Clip_officiel)(48k).mp3'

function SublimeBirthdayPage() {
  const [showConfetti,  setShowConfetti] = useState(true);
  const [showMessage,setShowMessage] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);
  const [showFinalHeart, setShowFinalHeart] = useState(false);
  const [decorations, setDecorations] = useState([]);
  const [balloons, setBalloons] = useState([]);

  const photos = [photo1, photo2, photo3, photo4];
  const fullText = "🎉 Joyeux Anniversaire, Russel Yvon ! 🎉";
  const secretMessage = "Mon cœur, depuis Nkongsamba, je t'envoie tout mon amour. Tu es ma lumière, mon Batoya d'amour. Ton sourire me fait fondre, même à des kilomètres. Je t'aime à la folie ! 💖";

  // Confetti timer
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  // Décorations (étoiles et cœurs)
  useEffect(() => {
    const generateDecoration = () => ({
      id: Date.now() + Math.random(),
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 1.5 + Math.random() * 1.5,
      type: Math.random() > 0.5 ? 'star' : 'heart',
    });
    setDecorations(Array.from({ length: 30 }, generateDecoration));
  }, []);

  // Ballons flottants
  useEffect(() => {
    const generateBalloon = () => ({
      id: Date.now() + Math.random(),
      left: Math.random() * 100,
      delay: Math.random() * 2,
      size: Math.random() * 15 + 25,
      color: ['bg-pink-400', 'bg-purple-400', 'bg-blue-400', 'bg-yellow-400'][Math.floor(Math.random() * 4)],
    });
    const interval = setInterval(() => setBalloons(prev => [...prev.slice(-4), generateBalloon()]), 4000);
    return () => clearInterval(interval);
  }, []);

  // Composant bouton réutilisable
  const ActionButton = ({ onClick, icon: Icon, text, gradient }) => (
    <button
      onClick={onClick}
      className={`bg-gradient-to-r ${gradient} text-white font-bold py-3 px-6 rounded-full shadow-lg hover:scale-105 transition-all duration-300 text-base flex items-center gap-2`}
    >
      <Icon className="w-5 h-5 animate-pulse" fill="currentColor" />
      <span>{text}</span>
    </button>
  );


  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true); // on commence en lecture auto

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = true; // obligé de commencer muet
      audio.play().catch(() => {
        // si le navigateur bloque, on met isPlaying à false
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.muted = false; // quand l’utilisateur clique, on enlève le mute
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-400 to-indigo-500 overflow-hidden relative font-sans">
      {/* <audio autoPlay loop>
        <source src={music} type="audio/mpeg"/>
      </audio> */}

      {/* Confetti */}
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={100} />}

      {/* Décorations en fond */}
      <div className="fixed inset-0 pointer-events-none">
        {decorations.map(({ id, left, top, delay, duration, type }) => (
          <div
            key={id}
            className="absolute animate-pulse"
            style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${delay}s`, animationDuration: `${duration}s` }}
          >
            {type === 'star' ? (
              <Star className="w-2 h-2 text-yellow-300 opacity-70" fill="currentColor" />
            ) : (
              <Heart className="w-2 h-2 text-pink-300 opacity-50" fill="currentColor" />
            )}
          </div>
        ))}
      </div>

      {/* Ballons flottants */}
      {balloons.map(({ id, left, delay, size, color }) => (
        <div
          key={id}
          className={`absolute ${color} opacity-80 shadow-md pointer-events-none z-10`}
          style={{
            left: `${left}%`,
            top: '100%',
            width: `${size}px`,
            height: `${size * 1.3}px`,
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            animationDelay: `${delay}s`,
            animationDuration: '8s',
            animationName: 'float-up-balloon',
            animationTimingFunction: 'ease-out',
            animationFillMode: 'forwards',
          }}
        >
          <div className="absolute top-full left-1/2 w-0.5 h-8 bg-gray-600 opacity-70 -translate-x-1/2"></div>
          <div className="absolute top-1 left-1 w-2 h-2 bg-white opacity-40 rounded-full"></div>
        </div>
      ))}

      <div className="container mx-auto px-4 py-6 relative z-20 flex flex-col items-center justify-center min-h-screen">
        {/* Titre principal */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
              <TypeAnimation sequence={[fullText, 1000]} wrapper="span" cursor={true} repeat={0} />
            </h1>
            <Sparkles className="w-5 h-5 text-yellow-300 animate-spin-slow" />
          </div>
          <div className="flex items-center justify-center gap-1 text-white/90 text-sm">
            <MapPin className="w-4 h-4" />
            <span>Depuis Nkongsamba, avec tout mon amour</span>
          </div>
        </div>

        {/* Message principal */}
        {!showMessage ? (
          <ActionButton
            onClick={() => setShowMessage(true)}
            icon={Gift}
            text="Ouvre ton cadeau"
            gradient="from-pink-500 via-purple-500 to-indigo-500"
          />
        ) : (
          <div className="max-w-lg mx-auto text-center animate-fade-in">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-xl border-2 border-pink-200">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Heart className="w-5 h-5 text-red-400 animate-pulse" fill="currentColor" />
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">Pour Toi, Mon Russinou</h3>
                <Heart className="w-5 h-5 text-red-400 animate-pulse" fill="currentColor" />
              </div>
              <p className="text-sm sm:text-base font-medium text-purple-700 leading-relaxed">{secretMessage}</p>
            </div>
          </div>
        )}

        {/* Galerie de photos */}
        {showMessage && !showPhotos ? (
          <ActionButton
            onClick={() => setShowPhotos(true)}
            icon={Camera}
            text="Nos souvenirs"
            gradient="from-purple-500 to-purple-600"
          />
        ) : showPhotos ? (
          <div className="max-w-3xl mx-auto mb-8 animate-fade-in">
            <h3 className="text-base sm:text-lg font-bold text-gray-800 text-center mb-3">Nos Souvenirs</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <img
                    src={photo}
                    alt={`Souvenir ${index + 1}`}
                    className="w-full h-40 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <Heart className="absolute bottom-2 left-2 w-4 h-4 text-red-400" fill="currentColor" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* Cœur final */}
        {showPhotos && !showFinalHeart ? (
          <ActionButton
            onClick={() => setShowFinalHeart(true)}
            icon={Heart}
            text="Un dernier cadeau"
            gradient="from-red-500 to-red-600"
          />
        ) : showFinalHeart ? (
          <div className="mt-6 text-center animate-heartBeat">
            <svg className="w-16 h-16 text-red-500 mx-auto" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <p className="text-sm sm:text-base text-red-600 mt-2 font-bold">Je t'aime pour toujours !</p>
          </div>
        ) : null}

        {/* Footer */}
        <div className="mt-6 text-center text-white/70 text-xs sm:text-sm">
          <div className="flex justify-center items-center gap-1">
            <Heart className="w-3 h-3 animate-pulse" fill="currentColor" />
            <span>Créé avec amour à Nkongsamba</span>
            <Heart className="w-3 h-3 animate-pulse" fill="currentColor" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float-up-balloon {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes heartBeat {
          0% { transform: scale(1); }
          14% { transform: scale(1.2); }
          28% { transform: scale(1); }
          42% { transform: scale(1.2); }
          70% { transform: scale(1); }
        }
        .animate-fade-in { animation: fade-in 1s ease-out; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .animate-heartBeat { animation: heartBeat 1.2s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

export default SublimeBirthdayPage;