
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WaveformAnimation } from "@/components/ui/waveform-animation";
import { Calendar, Clock, Filter, Lock, Play, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function TimelinePage() {
  const [view, setView] = useState("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [moodFilter, setMoodFilter] = useState("");
  
  // Sample data for echoes
  const sampleEchoes = [
    { 
      id: 1, 
      title: "Letter to myself one year from now", 
      createdAt: new Date("2025-05-11"), 
      unlockDate: new Date("2026-05-11"),
      duration: "1:34",
      mood: "hopeful",
      isLocked: true,
    },
    { 
      id: 2, 
      title: "Reflection on my goals", 
      createdAt: new Date("2025-05-05"), 
      unlockDate: new Date("2025-05-12"),
      duration: "2:45",
      mood: "motivated",
      isLocked: false,
    },
    { 
      id: 3, 
      title: "Birthday thoughts", 
      createdAt: new Date("2025-04-15"), 
      unlockDate: new Date("2025-07-15"),
      duration: "3:12",
      mood: "grateful",
      isLocked: true,
    },
    { 
      id: 4, 
      title: "Career aspirations", 
      createdAt: new Date("2025-03-20"), 
      unlockDate: new Date("2025-04-20"),
      duration: "2:08",
      mood: "ambitious",
      isLocked: false,
    },
    { 
      id: 5, 
      title: "Travel memories", 
      createdAt: new Date("2025-02-10"), 
      unlockDate: new Date("2025-05-10"),
      duration: "4:22",
      mood: "joyful",
      isLocked: false,
    },
  ];
  
  // Filter echoes based on search query and mood filter
  const filteredEchoes = sampleEchoes.filter((echo) => {
    const matchesSearch = searchQuery 
      ? echo.title.toLowerCase().includes(searchQuery.toLowerCase()) 
      : true;
    const matchesMood = moodFilter 
      ? echo.mood === moodFilter 
      : true;
    return matchesSearch && matchesMood;
  });
  
  // Group echoes by month
  const groupedEchoes = filteredEchoes.reduce((groups, echo) => {
    const month = echo.createdAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    if (!groups[month]) {
      groups[month] = [];
    }
    groups[month].push(echo);
    return groups;
  }, {} as Record<string, typeof sampleEchoes>);
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 md:px-12 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Timeline</h1>
          
          <div className="flex items-center gap-4">
            <Tabs value={view} onValueChange={setView} className="w-auto">
              <TabsList>
                <TabsTrigger value="list">List</TabsTrigger>
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        {/* Search and filters */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative col-span-1 md:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search your echoes..." 
              className="pl-10" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={moodFilter} onValueChange={setMoodFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filter by mood" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All moods</SelectItem>
                <SelectItem value="hopeful">Hopeful</SelectItem>
                <SelectItem value="motivated">Motivated</SelectItem>
                <SelectItem value="grateful">Grateful</SelectItem>
                <SelectItem value="ambitious">Ambitious</SelectItem>
                <SelectItem value="joyful">Joyful</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Tabs value={view} className="w-full">
          <TabsContent value="list" className="mt-0">
            {Object.entries(groupedEchoes).length > 0 ? (
              Object.entries(groupedEchoes).map(([month, echoes]) => (
                <div key={month} className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 text-echo-past">{month}</h2>
                  <div className="grid grid-cols-1 gap-4">
                    {echoes.map((echo) => (
                      <div 
                        key={echo.id} 
                        className={`glass-card p-5 rounded-xl transition-all ${echo.isLocked ? 'opacity-80' : 'hover:shadow-md'}`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-lg mb-1">{echo.title}</h3>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>Recorded on {echo.createdAt.toLocaleDateString()}</span>
                              <span className="mx-2">•</span>
                              <span>{echo.duration}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            <div className={`px-3 py-1 rounded-full text-xs ${getMoodStyles(echo.mood)}`}>
                              {capitalize(echo.mood)}
                            </div>
                          </div>
                        </div>
                        
                        <div className="py-4">
                          <WaveformAnimation isActive={!echo.isLocked} variant={echo.isLocked ? "default" : "playback"} barCount={8} />
                        </div>
                        
                        {echo.isLocked ? (
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center text-echo-past text-sm">
                              <Lock className="h-4 w-4 mr-1" />
                              <span>Unlocks on {echo.unlockDate.toLocaleDateString()}</span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {getTimeUntilUnlock(echo.unlockDate)} remaining
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-between items-center mt-2">
                            <div className="text-sm text-muted-foreground">
                              Unlocked on {echo.unlockDate.toLocaleDateString()}
                            </div>
                            <Button variant="ghost" size="sm" className="text-echo-present">
                              <Play className="mr-1 h-4 w-4" /> Play
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="h-24 w-24 bg-echo-light dark:bg-echo-dark rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-12 w-12 text-muted-foreground opacity-50" />
                </div>
                <h3 className="text-xl font-medium mb-4">No Results Found</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  We couldn't find any echoes matching your search. Try adjusting your filters or search query.
                </p>
                <Button onClick={() => { setSearchQuery(''); setMoodFilter(''); }} variant="outline">
                  Clear Filters
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="calendar" className="mt-0">
            <div className="border rounded-lg p-6">
              <div className="flex justify-center items-center mb-6">
                <Button variant="outline" size="sm" className="mr-2">
                  Previous
                </Button>
                <h2 className="text-xl font-semibold px-4">May 2025</h2>
                <Button variant="outline" size="sm" className="ml-2">
                  Next
                </Button>
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center text-sm font-medium py-2">
                    {day}
                  </div>
                ))}
                
                {/* Calendar grid - this would typically be dynamically generated */}
                {Array.from({ length: 35 }, (_, i) => {
                  const day = i - 3; // Start May 1 on Thursday (offset 3)
                  const isCurrentMonth = day >= 1 && day <= 31;
                  const hasEntry = isCurrentMonth && [5, 11].includes(day);
                  const isLocked = isCurrentMonth && day === 11;
                  
                  return (
                    <div 
                      key={i} 
                      className={`aspect-square border rounded-md flex flex-col items-center justify-center p-1 
                      ${isCurrentMonth ? 'bg-background' : 'bg-muted text-muted-foreground'} 
                      ${hasEntry ? 'ring-1 ring-echo-present' : ''}`}
                    >
                      <span className="text-sm">{isCurrentMonth ? day : ''}</span>
                      {hasEntry && (
                        <div className="mt-1">
                          {isLocked ? (
                            <Lock className="h-3 w-3 text-echo-past" />
                          ) : (
                            <WaveformAnimation barCount={3} className="h-3" />
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-6 flex justify-center gap-4 text-sm">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-echo-present mr-2"></div>
                  <span>Unlocked Entry</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-echo-past mr-2"></div>
                  <span>Locked Entry</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

// Helper functions
const getMoodStyles = (mood: string) => {
  switch (mood) {
    case 'hopeful':
      return 'bg-blue-100 text-blue-800';
    case 'motivated':
      return 'bg-green-100 text-green-800';
    case 'grateful':
      return 'bg-purple-100 text-purple-800';
    case 'ambitious':
      return 'bg-amber-100 text-amber-800';
    case 'joyful':
      return 'bg-rose-100 text-rose-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const getTimeUntilUnlock = (date: Date) => {
  const now = new Date();
  const diffTime = Math.abs(date.getTime() - now.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays > 30) {
    const diffMonths = Math.floor(diffDays / 30);
    return `${diffMonths} month${diffMonths > 1 ? 's' : ''}`;
  }
  
  return `${diffDays} day${diffDays > 1 ? 's' : ''}`;
};
