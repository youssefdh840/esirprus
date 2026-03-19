/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Star, Sparkles, Check, ChevronRight, Cake, Camera, Video, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';

// --- Constants ---
const CORRECT_BIRTHDAY = "2026-03-20"; // Tomorrow based on current date
const PERSONALITY_TRAITS = [
  "Beautiful", "Smart", "Funny", "Kind", "Strong", "Intellectual", "Sexy"
];

// --- Components ---

const Step1Login = ({ onNext }: { onNext: () => void; key?: string }) => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', birthday: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.birthday === CORRECT_BIRTHDAY || formData.birthday === "اكتبي التاريخ هنا") {
      setSuccess(true);
      setTimeout(() => onNext(), 2000);
    } else {
      const wittyErrors = [
        "Access Denied. Verification failed.",
        "Incorrect data. Please try again.",
        "The system does not recognize this entry.",
        "Verification error. Please check your input carefully."
      ];
      setError(wittyErrors[Math.floor(Math.random() * wittyErrors.length)]);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-md w-full bg-zinc-900/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl"
    >
      <div className="flex justify-center mb-6">
        <div className="p-4 bg-white/5 rounded-full border border-white/10">
          <Lock className="w-8 h-8 text-white" />
        </div>
      </div>
      <h2 className="text-3xl font-light text-white text-center mb-2 tracking-tight">Identity Verification</h2>
      <p className="text-zinc-400 text-center mb-8 text-sm uppercase tracking-widest font-medium">Restricted Access</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1 ml-1">First Name</label>
          <input 
            required
            type="text" 
            placeholder="First Name"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
            value={formData.firstName}
            onChange={e => setFormData({...formData, firstName: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1 ml-1">Last Name</label>
          <input 
            required
            type="text" 
            placeholder="Last Name"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
            value={formData.lastName}
            onChange={e => setFormData({...formData, lastName: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1 ml-1">Birthday</label>
          <input 
            required
            type="date" 
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
            value={formData.birthday}
            onChange={e => {
              setFormData({...formData, birthday: e.target.value});
              setError('');
            }}
          />
        </div>
        
        <AnimatePresence mode="wait">
          {error && (
            <motion.p 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-red-400 text-sm text-center font-medium"
            >
              {error}
            </motion.p>
          )}
          {success && (
            <motion.p 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="text-emerald-400 text-sm text-center font-medium"
            >
              Identity Confirmed. Proceeding...
            </motion.p>
          )}
        </AnimatePresence>

        <button 
          type="submit"
          className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 mt-4"
        >
          Verify Identity <ChevronRight className="w-4 h-4" />
        </button>
      </form>
    </motion.div>
  );
};

const Step2Personality = ({ onNext }: { onNext: () => void; key?: string }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [error, setError] = useState('');

  const toggleTrait = (trait: string) => {
    if (selected.includes(trait)) {
      setSelected(selected.filter(t => t !== trait));
    } else {
      setSelected([...selected, trait]);
    }
    setError('');
  };

  const handleSubmit = () => {
    if (selected.length === PERSONALITY_TRAITS.length) {
      onNext();
    } else {
      setError("حدث خطأ في مطابقة البيانات، يرجى المحاولة مرة أخرى.");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="max-w-md w-full bg-zinc-900/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl"
    >
      <h2 className="text-3xl font-light text-white text-center mb-2 tracking-tight">اختاري جيداً</h2>
      <p className="text-zinc-400 text-center mb-8 text-sm">يرجى اختيار صفة تصفكِ للمتابعة</p>
      
      <div className="grid grid-cols-1 gap-3 mb-8">
        {PERSONALITY_TRAITS.map(trait => (
          <button
            key={trait}
            onClick={() => toggleTrait(trait)}
            className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
              selected.includes(trait) 
                ? 'bg-white/10 border-white/40 text-white' 
                : 'bg-white/5 border-white/5 text-zinc-500 hover:border-white/20'
            }`}
          >
            <span className="font-medium">{trait}</span>
            <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
              selected.includes(trait) ? 'bg-white border-white' : 'border-white/20'
            }`}>
              {selected.includes(trait) && <Check className="w-4 h-4 text-black" />}
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {error && (
          <motion.p 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-amber-400 text-sm text-center font-medium mb-4"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <button 
        onClick={handleSubmit}
        className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
      >
        استمرار <Sparkles className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

const Step3Celebration = ({ key }: { key?: string }) => {
  useEffect(() => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-4xl w-full space-y-12 pb-20 px-4"
    >
      <div className="text-center space-y-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Cake className="w-16 h-16 text-white mx-auto mb-6" />
          <h1 className="text-6xl md:text-8xl font-light text-white tracking-tighter">
            Happy Birthday, <span className="italic font-serif">Asil</span>
          </h1>
        </motion.div>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-zinc-400 text-xl max-w-2xl mx-auto font-light leading-relaxed"
        >
          Lyoum lilit 3id miladik nchlh kol 3am w inti 7aya b5er nchlh 3am bahi 5er mili 9blo w m5yeb mn4rik 😂 m9it mn9ol wlh kan bich ni7ki barcha bich nwali kthartilha mnich mso7bik bach n9ol klm romantic mofid nchlh 3am mbrok fama klm lota kan 3ijbik wala m3jbikich 
          Happy birthday 🥳❤️
        </motion.p>
      </div>

      <div className="flex justify-center">
        {/* Photo Gallery Placeholder */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="aspect-video max-w-2xl w-full bg-zinc-900 rounded-3xl border border-white/10 flex flex-col items-center justify-center p-8 text-center group cursor-pointer hover:border-white/20 transition-all"
        >
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Camera className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-white font-medium mb-2 text-lg">Memories Gallery</h3>
          <p className="text-zinc-500 text-sm">A collection of our favorite moments together.</p>
        </motion.div>
      </div>

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center"
      >
        <Heart className="w-8 h-8 text-red-500 mx-auto mb-6 fill-red-500" />
        <p className="text-white text-2xl font-light italic font-serif leading-relaxed">
          "To the world, you may be one person, but to one person you may be the world."
        </p>
        <p className="text-zinc-500 mt-4 uppercase tracking-widest text-xs font-bold">moch ani bitbi3a</p>
      </motion.div>
    </motion.div>
  );
};

export default function App() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex items-center justify-center font-sans selection:bg-white selection:text-black overflow-x-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-zinc-800/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-zinc-800/20 blur-[120px] rounded-full" />
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && <Step1Login key="login" onNext={() => setStep(2)} />}
        {step === 2 && <Step2Personality key="personality" onNext={() => setStep(3)} />}
        {step === 3 && <Step3Celebration key="celebration" />}
      </AnimatePresence>

      {/* Floating Sparkles Decor */}
      <div className="fixed bottom-8 left-8 flex items-center gap-2 text-zinc-600 text-xs uppercase tracking-widest font-bold">
        <Star className="w-3 h-3" />
        <span>Special Day</span>
      </div>
    </div>
  );
}
