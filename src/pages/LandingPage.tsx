import React from "react";
import { Button } from "@/components/ui/button";
import { WaveformAnimation } from "@/components/ui/waveform-animation";
import { ArrowRight, Circle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="relative min-h-[600px] w-full flex items-center justify-center overflow-hidden bg-[#030303]">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

        <div className="relative z-10 container mx-auto px-4 md:px-6 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              custom={0}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 md:mb-12"
            >
              <Circle className="h-2 w-2 fill-rose-500/80" />
              <span className="text-sm text-white/60 tracking-wide">
                EchoVerse
              </span>
            </motion.div>

            <motion.div
              custom={1}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
            >
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 md:mb-8 tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                  Send Messages to
                </span>
                <br />
                <span
                  className={cn(
                    "bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300 "
                  )}
                >
                  Your Future Self
                </span>
              </h1>
            </motion.div>

            <motion.div
              custom={2}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
            >
              <p className="text-base sm:text-lg md:text-xl text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
                Capture thoughts, hopes, and reflections that your future self will cherish.
              </p>
              <div className="flex flex-wrap gap-4 justify-center mt-8">
                <Button asChild size="lg" className="bg-gradient-to-r from-indigo-500 to-rose-500 hover:from-indigo-600 hover:to-rose-600 text-white border-none">
                  <Link to="/signup">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white/10 text-white hover:bg-white/5">
                  <Link to="/login">
                    Log In
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
      </div>
      
      {/* Features Section - Styled to match the new dark theme */}
      <section className="py-16 px-4 md:px-12 bg-[#030303]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">How EchoVerse Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center p-6 bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-xl">
              <div className="h-16 w-16 rounded-full bg-indigo-500/[0.15] flex items-center justify-center mb-6 border border-white/[0.15]">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Record</h3>
              <p className="text-white/60">
                Capture an audio message as if speaking to your future self.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center p-6 bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-xl">
              <div className="h-16 w-16 rounded-full bg-rose-500/[0.15] flex items-center justify-center mb-6 border border-white/[0.15]">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Set a Date</h3>
              <p className="text-white/60">
                Choose when in the future you want your message to be unlocked.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center p-6 bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-xl">
              <div className="h-16 w-16 rounded-full bg-violet-500/[0.15] flex items-center justify-center mb-6 border border-white/[0.15]">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Rediscover</h3>
              <p className="text-white/60">
                When the time comes, receive your message from the past.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 md:px-12 bg-gradient-to-br from-indigo-500/[0.1] to-rose-500/[0.1] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">Begin Your Journey Through Time</h2>
          <p className="text-lg mb-8 text-white/60">
            Create your first audio time capsule today and start a conversation with your future self.
          </p>
          <Button asChild size="lg" className="bg-gradient-to-r from-indigo-500 to-rose-500 hover:from-indigo-600 hover:to-rose-600 text-white border-none">
            <Link to="/signup">
              Create Your Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-4 md:px-12 bg-[#030303] border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <WaveformAnimation />
            <span className="ml-2 font-semibold text-lg text-white">EchoVerse</span>
          </div>
          
          <div className="text-sm text-white/40">
            © 2025 EchoVerse - Audio Diaries for the Future You
          </div>
        </div>
      </footer>
    </div>
  );
}
