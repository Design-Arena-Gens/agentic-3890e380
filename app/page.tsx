"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Scene {
  id: number;
  type: "narration" | "dialogue" | "atmosphere";
  text?: string;
  speaker?: string;
  duration: number;
  effect?: "dissolve" | "flash" | "erase";
  atmosphere?: {
    fogIntensity: number;
    scarIntensity: number;
  };
}

const scenes: Scene[] = [
  {
    id: 1,
    type: "atmosphere",
    duration: 4000,
    atmosphere: { fogIntensity: 0.8, scarIntensity: 0.2 },
  },
  {
    id: 2,
    type: "narration",
    text: "Игорь стоит на площади уже три часа...",
    duration: 5000,
    atmosphere: { fogIntensity: 0.9, scarIntensity: 0.3 },
  },
  {
    id: 3,
    type: "dialogue",
    speaker: "ИГОРЬ",
    text: "Они придут. Обещали.",
    duration: 4000,
    atmosphere: { fogIntensity: 0.7, scarIntensity: 0.4 },
  },
  {
    id: 4,
    type: "narration",
    text: "Туман сгущается. Силуэты размываются.",
    duration: 5000,
    effect: "dissolve",
    atmosphere: { fogIntensity: 1.0, scarIntensity: 0.2 },
  },
  {
    id: 5,
    type: "dialogue",
    speaker: "ИГОРЬ",
    text: "Где вы? Я здесь...",
    duration: 4500,
    atmosphere: { fogIntensity: 0.9, scarIntensity: 0.5 },
  },
  {
    id: 6,
    type: "narration",
    text: "Фиолетовая вспышка прорезает тьму.",
    duration: 3000,
    effect: "flash",
    atmosphere: { fogIntensity: 0.6, scarIntensity: 0.9 },
  },
  {
    id: 7,
    type: "dialogue",
    speaker: "ИГОРЬ",
    text: "Это вы?",
    duration: 3000,
    atmosphere: { fogIntensity: 0.8, scarIntensity: 0.7 },
  },
  {
    id: 8,
    type: "narration",
    text: "Но никто не отвечает.",
    duration: 5000,
    atmosphere: { fogIntensity: 1.0, scarIntensity: 0.3 },
  },
  {
    id: 9,
    type: "dialogue",
    speaker: "ИГОРЬ",
    text: "Может, они уже были здесь?",
    duration: 4000,
    atmosphere: { fogIntensity: 0.9, scarIntensity: 0.4 },
  },
  {
    id: 10,
    type: "narration",
    text: "Его дыхание становится тяжелым.",
    duration: 4500,
    atmosphere: { fogIntensity: 0.7, scarIntensity: 0.5 },
  },
  {
    id: 11,
    type: "dialogue",
    speaker: "ИГОРЬ",
    text: "Или... это я опоздал?",
    duration: 5000,
    effect: "erase",
    atmosphere: { fogIntensity: 1.0, scarIntensity: 0.8 },
  },
  {
    id: 12,
    type: "narration",
    text: "Ещё одна вспышка.",
    duration: 2000,
    effect: "flash",
    atmosphere: { fogIntensity: 0.5, scarIntensity: 1.0 },
  },
  {
    id: 13,
    type: "narration",
    text: "И снова темнота.",
    duration: 6000,
    effect: "dissolve",
    atmosphere: { fogIntensity: 1.0, scarIntensity: 0.1 },
  },
];

export default function Home() {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  const currentScene = scenes[currentSceneIndex];

  useEffect(() => {
    if (!started) return;

    const timer = setTimeout(() => {
      if (currentSceneIndex < scenes.length - 1) {
        setCurrentSceneIndex((prev) => prev + 1);
      }
    }, currentScene.duration);

    return () => clearTimeout(timer);
  }, [currentSceneIndex, started, currentScene.duration]);

  const startExperience = () => {
    setStarted(true);
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    setAudioContext(ctx);
    playAmbientSound(ctx);
  };

  const playAmbientSound = (ctx: AudioContext) => {
    // Low hum oscillator
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(55, ctx.currentTime); // Low hum
    gainNode.gain.setValueAtTime(0.05, ctx.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.start();

    // Add some modulation for wind-like effect
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(0.1, ctx.currentTime);
    lfoGain.gain.setValueAtTime(10, ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(oscillator.frequency);
    lfo.start();
  };

  if (!started) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-slate-900 to-black">
        <motion.button
          onClick={startExperience}
          className="px-12 py-6 bg-purple-900/30 border-2 border-purple-700/50 text-purple-200 text-xl font-bold rounded-lg hover:bg-purple-800/40 hover:border-purple-600 transition-all duration-300 shadow-[0_0_30px_rgba(147,51,234,0.3)]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          НАЧАТЬ
        </motion.button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-900 via-slate-900 to-black">
      {/* Animated fog layers */}
      <div
        className="fog-layer"
        style={{
          opacity: currentScene.atmosphere?.fogIntensity || 0.8,
          animationDelay: "0s",
        }}
      />
      <div
        className="fog-layer"
        style={{
          opacity: (currentScene.atmosphere?.fogIntensity || 0.8) * 0.7,
          animationDelay: "-15s",
        }}
      />
      <div
        className="fog-layer"
        style={{
          opacity: (currentScene.atmosphere?.fogIntensity || 0.8) * 0.5,
          animationDelay: "-30s",
        }}
      />

      {/* Purple scar flashes */}
      <motion.div
        className="scar-flash"
        style={{
          width: "300px",
          height: "300px",
          top: "20%",
          left: "30%",
          opacity: currentScene.atmosphere?.scarIntensity || 0.3,
        }}
        animate={
          currentScene.effect === "flash"
            ? {
                opacity: [0, 1, 0],
                scale: [0.5, 1.5, 0.5],
              }
            : {}
        }
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="scar-flash"
        style={{
          width: "400px",
          height: "400px",
          bottom: "30%",
          right: "25%",
          opacity: (currentScene.atmosphere?.scarIntensity || 0.3) * 0.7,
        }}
        animate={
          currentScene.effect === "flash"
            ? {
                opacity: [0, 0.8, 0],
                scale: [0.7, 1.3, 0.7],
              }
            : {}
        }
        transition={{ duration: 0.3, delay: 0.1 }}
      />

      {/* Igor silhouette */}
      <motion.div
        className="absolute left-1/2 bottom-0 -translate-x-1/2"
        style={{
          width: "300px",
          height: "600px",
          filter: `blur(${(currentScene.atmosphere?.fogIntensity || 0.5) * 8}px)`,
        }}
        animate={
          currentScene.effect === "dissolve"
            ? {
                opacity: [1, 0],
                filter: [
                  `blur(${(currentScene.atmosphere?.fogIntensity || 0.5) * 8}px)`,
                  `blur(20px)`,
                ],
              }
            : {}
        }
        transition={{ duration: 3 }}
      >
        <div className="relative w-full h-full">
          {/* Body silhouette */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-96 bg-gradient-to-t from-gray-800/60 to-gray-700/30 rounded-t-full blur-sm" />
          {/* Head silhouette */}
          <div className="absolute bottom-96 left-1/2 -translate-x-1/2 w-32 h-40 bg-gradient-to-b from-gray-700/50 to-gray-800/50 rounded-full blur-sm" />
          {/* Shoulders */}
          <div className="absolute bottom-80 left-1/2 -translate-x-1/2 w-56 h-32 bg-gray-800/40 rounded-t-3xl blur-sm" />
        </div>
      </motion.div>

      {/* Subtitle area */}
      <div className="absolute bottom-24 left-0 right-0 px-8">
        <AnimatePresence mode="wait">
          {currentScene.text && (
            <motion.div
              key={currentScene.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: currentScene.effect === "erase" ? 1 : 0,
                y: currentScene.effect === "erase" ? 0 : 20,
              }}
              transition={{ duration: 1 }}
              className="max-w-4xl mx-auto text-center"
            >
              {currentScene.speaker && (
                <div className="text-purple-400 text-sm font-bold mb-2 tracking-wider">
                  {currentScene.speaker}
                </div>
              )}
              <div
                className={`text-gray-200 text-2xl md:text-3xl font-light leading-relaxed tracking-wide ${
                  currentScene.type === "narration" ? "radio-voice italic" : ""
                } ${currentScene.effect === "erase" ? "animate-erase" : ""}`}
                style={{
                  textShadow: "0 0 30px rgba(0,0,0,0.8), 0 2px 10px rgba(147,51,234,0.3)",
                  fontFamily: currentScene.type === "narration" ? "'Courier New', monospace" : "inherit",
                }}
              >
                {currentScene.text}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress indicator */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-2">
        {scenes.map((scene, index) => (
          <div
            key={scene.id}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              index === currentSceneIndex
                ? "bg-purple-500 w-8"
                : index < currentSceneIndex
                ? "bg-purple-800"
                : "bg-gray-700"
            }`}
          />
        ))}
      </div>

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.9) 100%)",
        }}
      />
    </div>
  );
}
