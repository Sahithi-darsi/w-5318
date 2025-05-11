
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { WaveformAnimation } from "@/components/ui/waveform-animation";
import { ChevronRight } from "lucide-react";
import { toast } from "sonner";

type FormMode = "login" | "signup" | "forgot-password";

interface AuthFormProps {
  mode: FormMode;
  onChangeMode: (mode: FormMode) => void;
  onSubmit: (data: { email: string; password?: string; confirmPassword?: string }) => void;
}

export function AuthForm({ mode, onChangeMode, onSubmit }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Password strength calculation
  const calculatePasswordStrength = (password: string): number => {
    if (!password) return 0;
    
    // Simple strength calculation
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 25;
    
    // Character variety checks
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    
    return Math.min(100, strength);
  };
  
  const passwordStrength = calculatePasswordStrength(password);
  
  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return "bg-red-500";
    if (passwordStrength < 50) return "bg-orange-500";
    if (passwordStrength < 75) return "bg-yellow-500";
    return "bg-green-500";
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (mode === "signup" && password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      
      // Pass form data to parent component
      onSubmit({ 
        email, 
        password: mode !== "forgot-password" ? password : undefined,
        confirmPassword: mode === "signup" ? confirmPassword : undefined
      });
      
    } catch (error) {
      console.error("Auth submission error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const renderFormContent = () => {
    switch (mode) {
      case "login":
        return (
          <>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Welcome back</CardTitle>
              <CardDescription>Login to access your audio diaries</CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-xs" 
                      type="button" 
                      onClick={() => onChangeMode("forgot-password")}
                    >
                      Forgot password?
                    </Button>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label htmlFor="remember-me" className="text-sm">Remember me</Label>
                </div>
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <WaveformAnimation />
                  ) : (
                    <>
                      Log in 
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-center text-sm">
                Don't have an account?{" "}
                <Button variant="link" className="p-0 h-auto" onClick={() => onChangeMode("signup")}>
                  Sign up
                </Button>
              </div>
            </CardFooter>
          </>
        );
        
      case "signup":
        return (
          <>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Create your account</CardTitle>
              <CardDescription>Your future self will thank you</CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                  />
                  
                  {/* Password strength indicator */}
                  {password && (
                    <div className="mt-1">
                      <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`} 
                          style={{ width: `${passwordStrength}%` }} 
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {passwordStrength < 50 ? "Weak password" : 
                         passwordStrength < 75 ? "Medium password" : 
                         "Strong password"}
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <WaveformAnimation />
                  ) : (
                    <>
                      Create account
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Button variant="link" className="p-0 h-auto" onClick={() => onChangeMode("login")}>
                  Log in
                </Button>
              </div>
            </CardFooter>
          </>
        );
        
      case "forgot-password":
        return (
          <>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Reset Password</CardTitle>
              <CardDescription>We'll send you an email with a reset link</CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <WaveformAnimation />
                  ) : (
                    "Send reset instructions"
                  )}
                </Button>
              </form>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-center text-sm">
                Remember your password?{" "}
                <Button variant="link" className="p-0 h-auto" onClick={() => onChangeMode("login")}>
                  Log in
                </Button>
              </div>
            </CardFooter>
          </>
        );
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto glass-card">
      {renderFormContent()}
    </Card>
  );
}
