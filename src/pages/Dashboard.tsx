
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { WaveformAnimation } from "@/components/ui/waveform-animation";
import { ArrowRight, Clock, Plus, Play, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

export default function Dashboard() {
  const navigate = useNavigate();
  const [hasUnlocked, setHasUnlocked] = useState(false);
  const [featuredEcho, setFeaturedEcho] = useState<number | null>(null);
  
  // Sample data for echoes
  const sampleEchoes = [
    { 
      id: 1, 
      title: "Letter to myself one year from now", 
      createdAt: new Date("2025-05-11"), 
      unlockDate: new Date("2026-05-11"),
      duration: "1:34",
      isLocked: true,
      mood: "hopeful"
    },
    { 
      id: 2, 
      title: "Reflection on my goals", 
      createdAt: new Date("2025-05-05"), 
      unlockDate: new Date("2025-05-12"),
      duration: "2:45",
      isLocked: false,
      mood: "motivated"
    },
  ];
  
  // Stats for dashboard
  const stats = [
    { label: "Total Echoes", value: sampleEchoes.length },
    { label: "Unlocked", value: sampleEchoes.filter(echo => !echo.isLocked).length },
    { label: "Locked", value: sampleEchoes.filter(echo => echo.isLocked).length },
    { label: "Avg Duration", value: "2:10" },
  ];
  
  useEffect(() => {
    // Check for newly unlocked echoes since last visit
    // In a real app, this would compare with last login time from the backend
    const unlockedEchoes = sampleEchoes.filter(echo => !echo.isLocked);
    if (unlockedEchoes.length > 0) {
      setHasUnlocked(true);
      setFeaturedEcho(unlockedEchoes[0].id);
      
      // Show notification toast
      toast(
        <div className="flex flex-col">
          <div className="font-medium">🎉 One of your entries just unlocked!</div>
          <div className="text-sm text-muted-foreground">Listen to your past self.</div>
        </div>,
        {
          action: {
            label: "Listen Now",
            onClick: () => navigate(`/echo/${unlockedEchoes[0].id}`),
          },
          duration: 5000,
        }
      );
    }
  }, [navigate]);
  
  const handleCreateEcho = () => {
    navigate("/record");
  };
  
  const handleEchoClick = (echoId: number, isLocked: boolean) => {
    if (!isLocked) {
      navigate(`/echo/${echoId}`);
    }
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
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-all hover:border-echo-present/30">
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <p className="text-3xl font-bold text-echo-present">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Featured Echo - shows if there's a newly unlocked echo */}
        {hasUnlocked && featuredEcho && (
          <div className="mb-8">
            <h2 className="text-xl font-medium mb-4 flex items-center">
              <Sparkles className="mr-2 h-5 w-5 text-echo-future" />
              Newly Unlocked
            </h2>
            <Card 
              className="border-2 border-echo-future hover:shadow-lg transition-all cursor-pointer"
              onClick={() => navigate(`/echo/${featuredEcho}`)}
            >
              <CardContent className="p-6">
                <h3 className="font-medium text-lg mb-2">
                  {sampleEchoes.find(echo => echo.id === featuredEcho)?.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Listen to this message you sent to yourself in the past.
                </p>
                <div className="py-2">
                  <WaveformAnimation isActive={true} variant="playback" className="h-12" />
                </div>
                <div className="flex justify-end mt-4">
                  <Button className="bg-echo-future hover:bg-echo-future/80 text-white">
                    <Play className="mr-1 h-4 w-4" /> Play Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {sampleEchoes.length > 0 ? (
          <div>
            <h2 className="text-xl font-medium mb-4">All Echoes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleEchoes.map((echo) => (
                <div 
                  key={echo.id} 
                  className={`glass-card p-6 rounded-xl transition-all ${echo.isLocked ? 'opacity-80' : 'hover:shadow-md hover:border-echo-present/30 cursor-pointer'}`}
                  onClick={() => handleEchoClick(echo.id, echo.isLocked)}
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
