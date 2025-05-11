
import React from "react";
import { Button } from "@/components/ui/button";
import { WaveformAnimation } from "@/components/ui/waveform-animation";
import { ArrowRight, Clock, Plus, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

export default function Dashboard() {
  const navigate = useNavigate();
  
  // Sample data for echoes
  const sampleEchoes = [
    { 
      id: 1, 
      title: "Letter to myself one year from now", 
      createdAt: new Date("2025-05-11"), 
      unlockDate: new Date("2026-05-11"),
      duration: "1:34",
      isLocked: true,
    },
    { 
      id: 2, 
      title: "Reflection on my goals", 
      createdAt: new Date("2025-05-05"), 
      unlockDate: new Date("2025-05-12"),
      duration: "2:45",
      isLocked: false,
    },
  ];
  
  const handleCreateEcho = () => {
    navigate("/record");
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 md:px-12 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Echoes</h1>
          <Button onClick={handleCreateEcho} className="bg-echo-present hover:bg-echo-past text-white">
            <Plus className="mr-2 h-4 w-4" />
            New Echo
          </Button>
        </div>
        
        {sampleEchoes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleEchoes.map((echo) => (
              <div 
                key={echo.id} 
                className={`glass-card p-6 rounded-xl ${echo.isLocked ? 'opacity-80' : ''}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">{echo.title}</h3>
                  {echo.isLocked && (
                    <div className="flex items-center text-echo-past text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Locked</span>
                    </div>
                  )}
                </div>
                
                <div className="py-3">
                  <WaveformAnimation isActive={!echo.isLocked} />
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {echo.duration}
                  </span>
                  
                  {echo.isLocked ? (
                    <div className="text-sm text-muted-foreground">
                      Unlocks on {echo.unlockDate.toLocaleDateString()}
                    </div>
                  ) : (
                    <Button variant="ghost" size="sm" className="text-echo-present">
                      <Play className="mr-1 h-4 w-4" /> Play
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="h-24 w-24 bg-echo-light dark:bg-echo-dark rounded-full flex items-center justify-center mx-auto mb-6">
              <WaveformAnimation />
            </div>
            <h3 className="text-xl font-medium mb-4">No Echoes Yet</h3>
            <p className="text-muted-foreground mb-6">
              Create your first Echo to send a message to your future self.
            </p>
            <Button onClick={handleCreateEcho} className="bg-echo-present hover:bg-echo-past text-white">
              Create your first Echo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
