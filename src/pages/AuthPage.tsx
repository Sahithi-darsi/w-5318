
import React, { useState } from "react";
import { AuthForm } from "@/components/auth/auth-form";
import { WaveformAnimation } from "@/components/ui/waveform-animation";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

type FormMode = "login" | "signup" | "forgot-password";

export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine form mode based on URL
  const defaultMode = location.pathname === "/login" ? "login" : 
                      location.pathname === "/signup" ? "signup" : 
                      location.pathname === "/forgot-password" ? "forgot-password" : "login";
  
  const [formMode, setFormMode] = useState<FormMode>(defaultMode);
  
  // Update URL when form mode changes
  const handleChangeMode = (mode: FormMode) => {
    setFormMode(mode);
    
    // Update the browser URL without reloading the page
    const path = mode === "login" ? "/login" : 
                mode === "signup" ? "/signup" : 
                "/forgot-password";
    window.history.pushState({}, "", path);
  };
  
  const handleSubmit = async (data: { 
    email: string; 
    password?: string; 
    confirmPassword?: string 
  }) => {
    // Simulate API request delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Mock authentication logic
    if (formMode === "login") {
      console.log("Logging in with:", data.email);
      toast.success("Logged in successfully!");
      navigate("/dashboard");
    } else if (formMode === "signup") {
      console.log("Signing up with:", data.email);
      toast.success("Account created successfully!");
      navigate("/welcome");
    } else {
      console.log("Password reset requested for:", data.email);
      toast.success("Password reset email sent!");
      handleChangeMode("login");
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="py-6 px-4 md:px-12 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <WaveformAnimation />
          <span className="ml-2 font-semibold gradient-text">EchoVerse</span>
        </Link>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 bg-gradient-echo-light dark:bg-gradient-to-br dark:from-echo-past dark:to-echo-present/40">
        <div className="w-full max-w-md relative">
          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 h-40 w-40 bg-echo-accent/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 h-40 w-40 bg-echo-future/20 rounded-full blur-3xl"></div>
          
          <AuthForm 
            mode={formMode}
            onChangeMode={handleChangeMode}
            onSubmit={handleSubmit}
          />
        </div>
      </main>
    </div>
  );
}
