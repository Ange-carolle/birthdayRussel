import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti'; // Installez via npm: npm install react-confetti
import { TypeAnimation } from 'react-type-animation'; // Installez via npm: npm install react-type-animation

import photo1 from "../images/photo1.jpg";
import photo2 from "../images/photo2.jpg";
import photo3 from "../images/photo3.jpg";
import photo4 from "../images/photo4.jpg";
import photo5 from "../images/photo5.jpg";
import photo6 from "../images/photo6.jpg";
import photo7 from "../images/photo7.jpg";
import { Heart } from 'lucide-react';
function Russel() {
    const [showConfetti, setShowConfetti] = useState(true);
    const [showMessage, setShowMessage] = useState(false);
    const [showPhotos, setShowPhotos] = useState(false);
    const [showFinalHeart, setShowFinalHeart] = useState(false);

    useEffect(() => {
        // Arrêter les confettis après 5 secondes
        const timer = setTimeout(() => setShowConfetti(false), 5000);
        return () => clearTimeout(timer);
    }, []);

    const handleRevealMessage = () => {
        setShowMessage(true);
    };

    const handleRevealPhotos = () => {
        setShowPhotos(true);
    };

    const handleRevealHeart = () => {
        setShowFinalHeart(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 flex flex-col items-center justify-center p-8 overflow-hidden">
            {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}

            {/* Titre principal avec animation */}
            <h1 className="text-6xl font-bold text-pink-600 mb-8 animate-bounce">
                Joyeux Anniversaire, Russel ! 🎉
            </h1>

            {/* Introduction touchante */}
            <p className="text-2xl text-center text-gray-800 mb-12 max-w-2xl">
                Mon amour, même si je suis à Nkongsamba et toi à Douala, mon cœur est avec toi. Tu me manques tellement... Clique sur les boutons pour découvrir ma surprise !
            </p>

            {/* Bouton pour révéler le message émouvant */}
            {!showMessage ? (
                <button
                    onClick={handleRevealMessage}
                    className="bg-pink-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-pink-600 transition duration-300 mb-8"
                >
                    Ouvre ma lettre d'amour 💌
                </button>
            ) : (
                <div className="bg-white p-8 rounded-lg shadow-xl max-w-3xl text-center animate-fadeIn">
                    <TypeAnimation
                        sequence={[
                            "Mon beau gosse, même à des kilomètres tu me fais encore craquer...   Mon cœur d'amour, c'est ton jour et moi je suis là à Nkongsamba en train de penser à toi non-stop ! Tu me manques tellement que ça me rend folle... Ton sourire, tes bras, ta voix, tout de toi me manque mon petit prince.", 1000, // Pause après le texte
                        ]}
                        wrapper="p"
                        cursor={true}
                        repeat={0}
                        style={{ fontSize: '1.5em', display: 'inline-block', whiteSpace: 'pre-wrap' }}
                    />
                </div>
            )}

            {/* Bouton pour révéler les photos */}
            {showMessage && !showPhotos ? (
                <button
                    onClick={handleRevealPhotos}
                    className="bg-purple-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-purple-600 transition duration-300 mt-8 mb-8"
                >
                    Découvre nos souvenirs 📸
                </button>
            ) : showPhotos ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 animate-fadeIn">
                    {/* Remplacez les src par vos vraies photos uploadées sur un hébergeur comme ImgBB ou GitHub */}
                    <img
                        src={photo6}
                        alt="Photo de nous"
                        className="rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
                    />
                    <imgh
                        src={photo5}
                        alt="Photo de nous"
                        className="rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
                    />
                    <img
                        src={photo7}
                        alt="Photo de nous"
                        className="rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
                    />
                    {/* Ajoutez plus de photos si vous voulez */}
                </div>
            ) : null}

            {/* Bouton final pour le cœur animé */}
            {showPhotos && !showFinalHeart ? (
                <button
                    onClick={handleRevealHeart}
                    className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-600 transition duration-300 mt-8"
                >
                    Un dernier cadeau ❤️
                </button>
            ) : showFinalHeart ? (
                <div className="mt-8 animate-heartBeat">
                    <svg className="w-32 h-32 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    <p className="text-xl text-red-600 mt-4">Je t'aime pour toujours !</p>
                </div>
            ) : null}


            {/* Decorative Footer */}
            <div className="mt-12 text-center text-white/70">
                <div className="flex justify-center items-center gap-2">
                    <Heart className="w-5 h-5 animate-pulse" fill="currentColor" />
                    <span className="text-sm font-medium">Créé avec tout mon amour à Nkongsamba, juste pour toi</span>
                    <Heart className="w-5 h-5 animate-pulse" fill="currentColor" />
                </div>
            </div>

        </div>
    );
}

export default Russel;