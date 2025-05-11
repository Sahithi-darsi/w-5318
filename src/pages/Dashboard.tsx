
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { WaveformAnimation } from "@/components/ui/waveform-animation";
import { ArrowRight, Calendar, Clock, Plus, Play, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { toast } from "@/hooks/use-toast";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

// Helper function to get mood styles
const getMoodStyles = (mood: string) => {
  switch (mood) {
    case 'hopeful':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
    case 'motivated':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
    case 'grateful':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100';
    case 'ambitious':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100';
    case 'joyful':
      return 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-100';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
  }
};

// Helper function to format date
const formatDate = (dateString: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(dateString));
};

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
    // Check for newly unlocked echoes
    const checkUnlockedEchoes = async () => {
      try {
        // In a real app, this would be a query to your Supabase database
        const unlockedEchoes = sampleEchoes.filter(echo => !echo.isLocked);
        
        if (unlockedEchoes.length > 0) {
          setHasUnlocked(true);
          setFeaturedEcho(unlockedEchoes[0].id);
        }
      } catch (error) {
        console.error("Error checking for unlocked echoes:", error);
      }
    };
    
    checkUnlockedEchoes();
  }, []);
  
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
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium text-lg mb-1">
                      {sampleEchoes.find(echo => echo.id === featuredEcho)?.title}
                    </h3>
                    <div className="flex gap-2 items-center text-sm text-muted-foreground mb-2">
                      <Calendar className="h-3 w-3" />
                      <span>Created on {formatDate(sampleEchoes.find(echo => echo.id === featuredEcho)?.createdAt || new Date())}</span>
                    </div>
                  </div>
                  <Badge className={getMoodStyles(sampleEchoes.find(echo => echo.id === featuredEcho)?.mood || "")}>
                    {sampleEchoes.find(echo => echo.id === featuredEcho)?.mood.charAt(0).toUpperCase() + sampleEchoes.find(echo => echo.id === featuredEcho)?.mood.slice(1)}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Listen to this message you sent to yourself in the past.
                </p>
                <div className="py-2">
                  <WaveformAnimation isActive={true} variant="playback" className="h-12" barCount={12} />
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-muted-foreground">
                    {sampleEchoes.find(echo => echo.id === featuredEcho)?.duration}
                  </div>
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
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-lg">{echo.title}</h3>
                      <div className="flex gap-2 items-center text-xs text-muted-foreground mt-1">
                        <Calendar className="h-3 w-3" />
                        <span>Created on {formatDate(echo.createdAt)}</span>
                      </div>
                    </div>
                    <Badge className={getMoodStyles(echo.mood)}>
                      {echo.mood.charAt(0).toUpperCase() + echo.mood.slice(1)}
                    </Badge>
                  </div>
                  
                  <div className="py-3">
                    <WaveformAnimation 
                      isActive={!echo.isLocked} 
                      variant={echo.isLocked ? "default" : "playback"}
                      barCount={8}
                    />
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      {echo.duration}
                    </span>
                    
                    {echo.isLocked ? (
                      <div className="flex items-center text-echo-past text-sm">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Unlocks on {formatDate(echo.unlockDate)}</span>
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
