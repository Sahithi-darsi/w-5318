
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { TutorialOverlay } from "@/components/onboarding/tutorial-overlay";
import { WaveformAnimation } from "@/components/ui/waveform-animation";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function WelcomePage() {
  const navigate = useNavigate();
  const [showTutorial, setShowTutorial] = useState(false);
  
  // Show tutorial after a slight delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTutorial(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleTutorialClose = () => {
    setShowTutorial(false);
    // Could store a flag in localStorage to mark tutorial as completed
  };
  
  const handleCreateFirstEcho = () => {
    navigate("/dashboard");
  };
  
  return (
    <div className="min-h-screen bg-gradient-echo-light dark:bg-gradient-to-br dark:from-echo-past dark:to-echo-present/40 flex flex-col justify-center items-center p-6">
      <div className="max-w-md w-full text-center">
        <div className="h-24 w-24 bg-echo-light dark:bg-echo-dark rounded-full flex items-center justify-center mx-auto mb-8">
          <WaveformAnimation />
        </div>
        
        <h1 className="text-3xl font-bold mb-6 gradient-text">Welcome to EchoVerse</h1>
        
        <p className="mb-8 text-lg">
          You're all set up! Ready to create your first audio diary entry?
        </p>
        
        <Button onClick={handleCreateFirstEcho} className="mb-4 w-full bg-echo-present hover:bg-echo-past text-white">
          Create your first Echo
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        
        <Button 
          variant="outline" 
          onClick={() => setShowTutorial(true)} 
          className="w-full"
        >
          Show tutorial again
        </Button>
      </div>
      
      <TutorialOverlay isOpen={showTutorial} onClose={handleTutorialClose} />
    </div>
  );
}
