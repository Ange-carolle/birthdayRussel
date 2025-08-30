import React, { useRef, useState, useEffect } from 'react';
import { Heart, Star, Sparkles, Gift, Music, Camera, MapPin, Calendar } from 'lucide-react';
import photo1 from "../images/photo1.jpg";
import photo2 from "../images/photo2.jpg";
import photo3 from "../images/photo3.jpg";
import photo4 from "../images/photo4.jpg";
import photo5 from "../images/photo5.jpg";
import music from '../musique/Ronisia_-_Doucement_(Clip_officiel)(48k).mp3'



function CombinedBirthdayPage() {
  const [showMessage, setShowMessage] = useState(false);
  const [showGiftButton, setShowGiftButton] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');
  const [balloons, setBalloons] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [showFinalHeart, setShowFinalHeart] = useState(false);


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


  const fullText = "Joyeux anniversaire à l’homme le plus attentionné et le plus incroyable que j’aie dans ma vie, celui qui me rend heureuse rien qu’en souriant 🌹";

  const photos = [
    photo1,
    photo2,
    photo3,
    photo4
  ];

  // Animation typewriter et progression
  useEffect(() => {
    let i = 0;
    const typeEffect = setInterval(() => {
      if (i < fullText.length) {
        setTypewriterText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typeEffect);
        setTimeout(() => setShowMessage(true), 1000);
        setTimeout(() => setShowGiftButton(true), 3000);
      }
    }, 100);

    return () => clearInterval(typeEffect);
  }, []);

  // Génération des ballons flottants avec animation CSS
  useEffect(() => {
    const generateBalloon = () => {
      const newBalloon = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        animationDelay: Math.random() * 4,
        size: Math.random() * 25 + 35,
        color: [
          'bg-pink-400',
          'bg-purple-400',
          'bg-blue-400',
          'bg-yellow-400',
          'bg-red-400',
          'bg-indigo-400',
        ][Math.floor(Math.random() * 6)],
      };
      setBalloons(prev => [...prev.slice(-12), newBalloon]);
    };

    const interval = setInterval(generateBalloon, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleGiftClick = () => {
    setShowPhotos(true);
    setShowConfetti(true);
    setTimeout(() => setShowFinalMessage(true), 2000);
    setTimeout(() => setShowConfetti(false), 6000);
  };

  // Étoiles scintillantes
  const stars = Array.from({ length: 50 }, (_, i) => (
    <div
      key={i}
      className="absolute animate-pulse"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${2 + Math.random() * 2}s`,
      }}
    >
      <Star className="w-3 h-3 text-yellow-300 opacity-60" fill="currentColor" />
    </div>
  ));

  // Confettis
  const confetti = Array.from({ length: 150 }, (_, i) => (
    <div
      key={i}
      className={`absolute animate-fall ${showConfetti ? 'opacity-100' : 'opacity-0'}`}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${-15 - Math.random() * 25}%`,
        animationDelay: `${Math.random() * 1}s`,
        animationDuration: `${2 + Math.random() * 2}s`,
        transform: `rotate(${Math.random() * 360}deg)`,
      }}
    >
      <div
        className={`w-4 h-4 ${['bg-pink-400', 'bg-purple-400', 'bg-yellow-400', 'bg-blue-400', 'bg-red-400'][Math.floor(Math.random() * 5)]
          } rounded-sm opacity-80`}
      ></div>
    </div>
  ));
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true); // on commence en lecture auto

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = false; // obligé de commencer muet
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

    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-400 to-indigo-500 flex flex-col items-center justify-center font-sans text-white">

      {/* Balise audio (cachée) */}
      <audio ref={audioRef} loop>
        <source src={music} type="audio/mpeg" />
        Ton navigateur ne supporte pas l'audio.
      </audio>

      {/* Étoiles scintillantes */}
      <div className="fixed inset-0 pointer-events-none z-5">{stars}</div>

      {/* Confettis */}
      <div className="fixed inset-0 pointer-events-none z-50">{confetti}</div>

      {/* Ballons flottants */}
      {balloons.map(balloon => (
        <div
          key={balloon.id}
          className={`absolute ${balloon.color} opacity-75 shadow-lg pointer-events-none z-10`}
          style={{
            left: `${balloon.left}%`,
            top: '100%',
            width: `${balloon.size}px`,
            height: `${balloon.size * 1.3}px`,
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            animationDelay: `${balloon.animationDelay}s`,
            animationDuration: '15s',
            animationName: 'float-up-balloon',
            animationTimingFunction: 'ease-out',
            animationFillMode: 'forwards',
          }}
        >
          <div
            className="absolute top-full left-1/2 w-0.5 bg-gray-700 opacity-60"
            style={{
              height: `${balloon.size * 0.7}px`,
              transform: 'translateX(-50%)',
            }}
          ></div>
          <div className="absolute top-2 left-3 w-2 h-2 bg-white opacity-50 rounded-full"></div>
        </div>
      ))}

      <div className="container mx-auto px-4 py-8 relative z-20">
        {/* En-tête principal avec date */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <Calendar className="w-10 h-10 text-yellow-400 animate-bounce" />
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
              31 Août
            </h1>
            <Calendar className="w-10 h-10 text-yellow-400 animate-bounce" />
          </div>
        </div>

        {/* Titre animé avec typewriter */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 min-h-[120px] flex items-center justify-center relative">
            <span className="bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 bg-clip-text text-transparent animate-pulse">
              {typewriterText}
            </span>
            <span className="animate-pulse ml-2 text-pink-200">|</span>
            <Sparkles className="absolute w-12 h-12 text-yellow-300 -top-6 -right-6 animate-spin-slow" />
          </h2>

          <div className="flex items-center justify-center gap-2 text-white/90 text-xl">
            <MapPin className="w-6 h-6 text-pink-300" />
            <span>Depuis Nkongsamba, avec tout mon amour</span>
            <Heart className="w-6 h-6 text-red-400 animate-pulse" fill="currentColor" />
          </div>
        </div>

        {/* Message d'amour principal */}
        {showMessage && (
          <div className="max-w-4xl mx-auto mb-12 transform transition-all duration-2000 animate-fade-in">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-pink-200">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-3 mb-6">
                  <Heart className="w-8 h-8 text-red-400 animate-pulse" fill="currentColor" />
                  <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Pour Toi, Mon Russinou 💕
                  </h3>
                  <Heart className="w-8 h-8 text-red-400 animate-pulse" fill="currentColor" />
                </div>
              </div>

              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p className="text-xl font-medium text-center text-purple-700">
                  "Mon beau gosse, même à des kilomètres tu me fais encore craquer..."
                </p>

                <p className="text-center">
                  Mon Russel chéri, c'est ton jour et moi je suis là à Nkongsamba en train de penser à toi non-stop !
                  Tu me manques tellement que ça me rend folle... Ton sourire, tes bras, ta voix,
                  tout de toi me manque mon petit prince.
                </p>

                <p className="text-center">
                  Baby, cette distance me fait réaliser encore plus à quel point tu es tout pour moi.
                  Tu es mon roi, mon trésor, et même loin de toi je sens encore ton effet sur moi...
                  Tu sais très bien comment tu me fais fondre mon Batoya d'amour ! 😏
                </p>

                <p className="text-center font-semibold text-2xl text-pink-600">
                  Je t'aime fort mon coeur! 💕
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Bouton cadeau */}
        {showGiftButton && !showPhotos && (
          <div className="text-center mb-12 transform transition-all duration-1000 animate-bounce">
            <button
              onClick={() => {
                handleGiftClick();
                togglePlayPause();
              }}
              className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white font-bold py-6 px-12 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 text-xl"
            >
              <div className="flex items-center gap-4">
                <Gift className="w-10 h-10 animate-pulse" />
                <span>Ouvre ton cadeau, mon amour chéri</span>
                {/* Bouton Play/Pause */}
                <button
                  onClick={togglePlayPause}
                >

                </button>
                <Camera className="w-10 h-10 animate-pulse" />
              </div>
            </button>
          </div>
        )}

        {/* Galerie photos */}
        {showPhotos && (
          <div className="max-w-5xl mx-auto mb-12 transform transition-all duration-2000 animate-fade-in">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 mb-4">
                <Camera className="w-8 h-8 text-pink-400 animate-pulse" />
                <h3 className="text-3xl font-bold text-white">Nos Plus Beaux Souvenirs</h3>
                <Camera className="w-8 h-8 text-pink-400 animate-pulse" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-fade-in"
                  style={{ animationDelay: `${index * 300}ms` }}
                >
                  <div className="w-full h-80 bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center">
                    <Heart className="w-16 h-16 text-pink-400 animate-pulse" fill="currentColor" />
                    {/* <span className="absolute bottom-4 text-white font-medium">Notre moment #{index + 1}</span> */}
                    <img src={photo} alt="" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 text-white">
                      <Heart className="w-6 h-6 text-red-400" fill="currentColor" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-white/90 mt-8 text-lg italic">
              "Chaque photo me rappelle comme tu me fais fondre mon trésor... 🔥"
            </p>
          </div>
        )}

        {/* Message final */}
        {showFinalMessage && (
          <div className="text-center transform transition-all duration-2000 animate-fade-in">
            <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-3xl p-8 md:p-12 text-white shadow-2xl max-w-3xl mx-auto">
              <div className="mb-6">
                <div className="flex justify-center gap-2 mb-6">
                  {[...Array(7)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-8 h-8 text-yellow-300 animate-pulse"
                      fill="currentColor"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
                <h3 className="text-4xl font-bold mb-6 animate-pulse">
                  Joyeux Anniversaire Mon Chéri d'Amour! 🎂🥳❤️
                </h3>
              </div>

              <div className="space-y-6 text-lg">
                <p className="text-xl font-medium">
                  Je veux que tu saches à quel point tu es important pour moi. Tu es une personne exceptionnelle, attentionnée, et chaque moment passé avec toi rend ma vie plus belle. Je me sens tellement chanceuse de t’avoir à mes côtés.
                </p>
                <p>
                  Tu as ce don de me faire sourire même dans les jours gris, et ton amour me réchauffe le cœur comme rien d’autre. Ta gentillesse, ta patience et ton attention me touchent profondément, et je veux que tu saches que tu comptes énormément pour moi.
                </p>
                <p>
                  Je rêve de te retrouver, de te serrer dans mes bras, de t’embrasser et de te dire encore et encore combien tu es précieux. Que cette nouvelle année t’apporte autant de bonheur, de rires et de belles surprises que tu m’apportes chaque jour. 🌹
                </p>
                <p>
                  Merci d’être toi, merci d’être dans ma vie. Vivement que je puisse te couvrir de bisous, te prendre dans mes bras et célébrer cet anniversaire comme il se doit… parce que toi, mon amour, tu le mérites plus que tout. 😘💖
                </p>

              </div>

              <div className="mt-8">
                <div className="text-3xl font-bold animate-pulse mb-4">
                  Avec tout mon amour ❤️
                </div>
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                  <Music className="w-6 h-6 animate-pulse" />
                  <span className="font-medium">Playing: ma mélodie d'amour pour toi... 💕</span>
                </div>
              </div>
            </div>
          </div>
        )}
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
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
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
          15% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            transform: translateY(-130vh) rotate(20deg);
            opacity: 0;
          }
        }
        .animate-fade-in {
          animation: fade-in 1.8s ease-out;
        }
        .animate-fall {
          animation: fall 3s linear forwards;
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default CombinedBirthdayPage;