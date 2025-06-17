import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

import clickSound from "./assets/click.mp3";
import bgMusic from "./assets/birthday.mp3";
import "./index.css";

const messages = [
  "Hey Farzana, it's a special day of my most special person in this world, and I want you to feel the love and magic around you today. 🎂✨",
  "You're not just smart, you're brilliant like a galaxy painted in pink and gold, always glowing with purpose. 💫🌸",
  "You're not just sweet, you're the kind of sweetness that brightens hearts and makes every moment feel soft and warm. 🍬💗",
  "You're not just beautiful, you're breathtaking, your presence is art, and your smile is poetry. 😍🖼️",
  "You make the world a brighter place just by being in it, and I feel lucky to share even a small part of that light. 🌍💖",
  "I hope your birthday is filled with gentle joy, deep laughter, and beautiful surprises just like your heart deserves. 🎁🎈",
  "Wishing you a year filled with growth, peace, love, and everything your amazing soul dreams of. 🌸💫",
];

export default function App() {
  const [welcome, setWelcome] = useState(true);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [finalStep, setFinalStep] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const { width, height } = useWindowSize();
  const musicRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const music = new Audio(bgMusic);
    music.loop = true;
    music.volume = 0.4;
    musicRef.current = music;

    // const autoplayTimer = setTimeout(() => {
    musicOn &&
      music
        .play()
        .then(() => setMusicOn(true))
        .catch(() => setMusicOn(false));
    // }, 1000);

    // return () => {
    //   music.pause();
    //   clearTimeout(autoplayTimer);
    // };
  }, [musicOn]);

  const toggleMusic = () => {
    if (musicRef.current) {
      if (musicOn) {
        musicRef.current.pause();
        setMusicOn(false);
      } else {
        musicRef.current.play();
        setMusicOn(true);
      }
    }
  };

  const playClick = () => new Audio(clickSound).play();

  const handleNext = () => {
    playClick();
    if (step < messages.length - 1) {
      setStep(step + 1);
    } else {
      setFinalStep(true);
    }
  };

  const handleRestart = () => {
    setStep(0);
    setFinalStep(false);
    setWelcome(true);
    setMusicOn(false);
  };

  const handleWelcomeEnd = () => {
    playClick();
    setWelcome(false);
    setLoading(true);
    // setMusicOn(true);
    setTimeout(() => {
      setLoading(false);
      setMusicOn(true);
    }, 2000); // 2 second loading screen
  };

  return (
    <div className="max-w-screen max-h-screen overflow-hidden">
      {/* 🎉 Confetti (after welcome + loader only) */}
      {!welcome && !loading && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={200}
          recycle
        />
      )}

      {/* 🔊 Music Toggle (after welcome + loader only) */}
      {!welcome && !loading && (
        <button
          onClick={toggleMusic}
          className="absolute top-4 right-4 text-sm bg-white/30 text-pink-700 px-4 py-2 rounded-full shadow-md hover:bg-white/40 transition-all z-50 backdrop-blur-md">
          {musicOn ? "🔇 Mute Music" : "🔊 Play Music"}
        </button>
      )}

      {/* 💖 Fullscreen Welcome Page */}
      {welcome && (
        <motion.div
          className="fixed inset-0 z-50 bg-[url('/wlcm-bg.png')] bg-top-left bg-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}>
          <div className="bg-white/10 w-full h-full backdrop-blur-[3px] flex items-center justify-center">
            <div className="px-3 text-center">
              <h1 className="text-2xl md:text-5xl text-pink-600 font-bold [font-family:var(--font-fancy)] mb-6">
                <p className="text-yellow-400 pb-3">Hey 👋</p> 🥰 my
                beautiful Farzana 🥰
              </h1>
              <p className="text-lg md:text-xl text-white mb-6 [font-family:var(--caveat)]">
                I have something magical for you... Are you ready? 💫
              </p>
              <button
                onClick={handleWelcomeEnd}
                className="px-6 py-3 rounded-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold shadow-md transition">
                Show Me! 💝
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* 🔃 Cool Loading Animation */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className=" z-40 fixed inset-0 bg-[url('/wlcm-bg.png')]">
          <motion.div className=" bg-black/30 w-full h-full backdrop-blur-sm flex flex-col items-center justify-center">
            <div className="text-xl md:text-3xl font-bold text-white animate-pulse [font-family:var(--caveat)]">
              Loading your surprise... 🎁
            </div>
            <div className="mt-6 w-16 h-16 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
          </motion.div>
        </motion.div>
      )}

      {/* 🎂 Main Card (after welcome + loading) */}

      {!welcome && !loading && (
        <div className="fixed inset-0 bg-[url('/bg-3.jpg')] bg-center bg-cover overflow-hidden">
          <div className="flex items-center justify-center min-h-screen px-2 py-8">
            <div className="bg-white/20 border border-white/30 backdrop-blur-sm p-4 rounded-2xl max-w-xl shadow-2xl text-center">
              <motion.h1
                className="text-3xl md:text-5xl text-pink-600 [font-family:var(--font-fancy)] mb-6"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}>
                🎉 Happy Birthday 🎉 <br /> 💖 Farzana Islam 💖
              </motion.h1>

              {!finalStep ? (
                <>
                  <motion.p
                    key={step}
                    className="text-lg md:text-xl text-gray-100 [font-family:var(--caveat)]"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4 }}>
                    {messages[step]}
                  </motion.p>

                  <button
                    onClick={handleNext}
                    className="mt-6 px-6 py-3 rounded-full bg-pink-500 hover:bg-pink-600 text-white shadow-lg transition-all">
                    {step === messages.length - 1
                      ? "Final ➡️"
                      : "Next ➡️"}
                  </button>
                </>
              ) : (
                <>
                  <motion.p
                    className="text-xl font-semibold text-fuchsia-300 [font-family:var(--caveat)]"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 160 }}>
                    "Happy Birthday, Farzana! the universe is better
                    with you in it, and today, it pauses to celebrate
                    your magic. 🎉🌟",
                    <br />{" "}
                    <p className="text-gray-300 animate-pulse pt-3">
                      {" "}
                      Tera deewanaa: Nouman Khan{" "}
                    </p>
                  </motion.p>

                  <div className="mt-2 text-4xl animate-pulse">
                    💗✨🎂💗
                  </div>

                  <button
                    onClick={handleRestart}
                    className="mt-8 px-6 py-3 rounded-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold shadow-md">
                    Restart 🌈
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
