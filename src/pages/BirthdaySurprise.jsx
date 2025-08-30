import React, { useState, useEffect } from 'react';
import { Heart, Star, Sparkles, Camera, MapPin, Calendar } from 'lucide-react';
import photo1 from "../images/photo1.jpg";
import photo2 from "../images/photo2.jpg";
import photo3 from "../images/photo3.jpg";
import photo4 from "../images/photo4.jpg";
import photo5 from "../images/photo5.jpg";

export default function BirthdaySurprise() {
  const [showMessage, setShowMessage] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setShowMessage(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Photos placeholder - tu peux remplacer ces URLs par vos vraies photos
  const photos = [
    photo1,
    photo2,
    photo3,
    photo4
  ];

  const floatingHearts = Array.from({ length: 15 }, (_, i) => (
    <div
      key={i}
      className="absolute animate-pulse"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${3 + Math.random() * 2}s`
      }}
    >
      <Heart className="w-4 h-4 text-pink-300 opacity-20" fill="currentColor" />
    </div>
  ));

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 overflow-hidden relative">
      {/* Floating hearts background */}
      <div className="fixed inset-0 pointer-events-none">
        {floatingHearts}
      </div>

      {/* Sparkles animation */}
      <div className="absolute top-10 left-10 animate-bounce">
        <Sparkles className="w-8 h-8 text-yellow-400" />
      </div>
      <div className="absolute top-20 right-20 animate-pulse">
        <Star className="w-6 h-6 text-pink-400" fill="currentColor" />
      </div>
      <div className="absolute bottom-20 left-20 animate-bounce" style={{ animationDelay: '1s' }}>
        <Sparkles className="w-6 h-6 text-purple-400" />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header avec animation */}
        <div className={`text-center mb-16 transform transition-all duration-2000 ${showMessage ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center gap-2 mb-4">
            <Calendar className="w-8 h-8 text-purple-600" />
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              31 Août
            </h1>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-700 mb-4">
            Joyeux Anniversaire Russel Yvon! 🎉
          </h2>
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <MapPin className="w-5 h-5" />
            <span className="text-lg">Depuis Nkongsamba, avec tout mon amour</span>
          </div>
        </div>

        {/* Message principal */}
        <div className={`max-w-4xl mx-auto mb-16 transform transition-all duration-2000 delay-500 ${showMessage ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-pink-100">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 mb-6">
                <Heart className="w-8 h-8 text-red-400 animate-pulse" fill="currentColor" />
                <h3 className="text-3xl font-bold text-gray-800">Pour Toi, Mon Russinou 💕</h3>
                <Heart className="w-8 h-8 text-red-400 animate-pulse" fill="currentColor" />
              </div>
            </div>
            
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p className="text-xl font-medium text-center text-purple-700">
                "Mon amour, même à des kilomètres tu me fais encore craquer..."
              </p>
              
              <p>
                Mon Russel chéri, c'est ton jour et moi je suis là à Nkongsamba en train de penser à toi non-stop ! 
                Tu me manques tellement que ça me rend folle... Ton sourire, tes bras, ta voix, 
                tout de toi me manque mon petit prince.
              </p>
              
              <p>
                Baby, cette distance me fait réaliser encore plus à quel point tu es tout pour moi. 
                Tu es mon roi, mon trésor, et même loin de toi je sens encore ton effet sur moi... 
                Tu sais très bien comment tu me fais fondre mon Batoya d'amour ! 😏
              </p>
              
              <p className="text-center font-semibold text-2xl text-pink-600">
                Je t'aime à la folie mon bébé d'amour! 💕
              </p>
              
              <p className="text-center text-purple-600 font-medium">
                Profite bien de ton anniversaire, en attendant mon retour pour pouvoir te le souhaiter co,,e il se doit.
              </p>
            </div>
          </div>
        </div>

        {/* Galerie photos */}
        <div className={`max-w-5xl mx-auto mb-16 transform transition-all duration-2000 delay-1000 ${showMessage ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <Camera className="w-6 h-6 text-pink-500" />
              <h3 className="text-2xl font-bold text-gray-800">Nos Plus Beaux Souvenirs</h3>
              <Camera className="w-6 h-6 text-pink-500" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {photos.map((photo, index) => (
              <div 
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <img
                  src={photo}
                  alt={`Souvenir ${index + 1}`}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <Heart className="w-6 h-6 text-red-400" fill="currentColor" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <p className="text-center text-gray-600 mt-6 italic">
            "Chaque photo me rappelle comme tu me fais fondre mon trésor... 🔥"
          </p>
        </div>

        {/* Message final */}
        <div className={`text-center transform transition-all duration-2000 delay-1500 ${showMessage ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-3xl p-8 text-white shadow-2xl max-w-2xl mx-auto">
            <div className="mb-4">
              <div className="flex justify-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-300 animate-pulse" fill="currentColor" style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
              <h3 className="text-3xl font-bold mb-4">Joyeux Anniversaire Mon Chéri d'Amour!</h3>
              <p className="text-xl font-medium mb-4">
                Tu compte beaucoup pour moi russinou, et j'ai tellement de chance de t'avoir. 
              </p>
              <p className="text-lg">
                J'attend impatiemment de rentrer pour te serrer fort dans mes bras et te montrer à quel point tu m'as manqué... 
                Je vais te couvrir de bisous partout chéri ! 😘
              </p>
            </div>
            
            <div className="text-2xl font-bold animate-pulse">
              Avec tout mon amour ❤️
            </div>
          </div>
        </div>

        {/* Footer décoratif */}
        {/* <div className="mt-16 text-center">
          <div className="flex justify-center items-center gap-4 text-gray-500">
            <Heart className="w-5 h-5 text-pink-400 animate-pulse" fill="currentColor" />
            <span className="text-sm">Fait avec amour, spécialement pour toi</span>
            <Heart className="w-5 h-5 text-pink-400 animate-pulse" fill="currentColor" />
          </div>
        </div> */}
      </div>
    </div>
  );
}