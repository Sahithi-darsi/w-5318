"use client";
import React, { useState, FormEvent } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";

interface SignupFormProps {
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  onChangeMode?: (mode: "login" | "signup" | "forgot-password") => void;
}

export function SignupForm({ onSubmit, onChangeMode }: SignupFormProps) {
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

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

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(calculatePasswordStrength(newPassword));
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return "bg-destructive";
    if (passwordStrength < 50) return "bg-orange-500";
    if (passwordStrength < 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    } else {
      console.log("Form submitted");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto glass-card p-4 md:p-8">
      <h2 className="font-bold text-xl text-echo-dark dark:text-white gradient-text">
        Join EchoVerse
      </h2>
      <p className="text-muted-foreground text-sm max-w-sm mt-2">
        Create your account and start recording your voice memories
      </p>

      <form className="my-8" onSubmit={handleFormSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" name="firstname" placeholder="Enter your first name" type="text" required />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" name="lastname" placeholder="Enter your last name" type="text" required />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" name="email" placeholder="you@example.com" type="email" required />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input 
            id="password" 
            name="password"
            placeholder="••••••••" 
            type="password" 
            value={password}
            onChange={handlePasswordChange}
            required 
          />
          <div className="mt-1">
            <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`} 
                style={{ width: `${passwordStrength}%` }} 
              />
            </div>
            {password && (
              <p className="text-xs text-muted-foreground mt-1">
                {passwordStrength < 50 ? "Weak password" : 
                 passwordStrength < 75 ? "Medium password" : 
                 "Strong password"}
              </p>
            )}
          </div>
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            placeholder="••••••••"
            type="password"
            required
          />
        </LabelInputContainer>

        <button
          className="relative group/btn bg-gradient-echo w-full text-white rounded-md h-10 font-medium shadow-md transition-all duration-300 hover:shadow-lg"
          type="submit"
        >
          Create Account
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-echo-light/50 dark:via-echo-past/30 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button
            className="relative group/btn flex space-x-2 items-center justify-center px-4 w-full rounded-md h-10 font-medium bg-white/80 dark:bg-echo-dark/50 backdrop-blur-sm border border-white/20 dark:border-white/10 shadow-sm transition-all duration-300 hover:shadow-md"
            type="button"
          >
            <IconBrandGithub className="h-4 w-4 text-echo-dark dark:text-echo-light" />
            <span className="text-echo-dark dark:text-echo-light text-sm">
              Continue with GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className="relative group/btn flex space-x-2 items-center justify-center px-4 w-full rounded-md h-10 font-medium bg-white/80 dark:bg-echo-dark/50 backdrop-blur-sm border border-white/20 dark:border-white/10 shadow-sm transition-all duration-300 hover:shadow-md"
            type="button"
          >
            <IconBrandGoogle className="h-4 w-4 text-echo-dark dark:text-echo-light" />
            <span className="text-echo-dark dark:text-echo-light text-sm">
              Continue with Google
            </span>
            <BottomGradient />
          </button>
          <button
            className="relative group/btn flex space-x-2 items-center justify-center px-4 w-full rounded-md h-10 font-medium bg-white/80 dark:bg-echo-dark/50 backdrop-blur-sm border border-white/20 dark:border-white/10 shadow-sm transition-all duration-300 hover:shadow-md"
            type="button"
          >
            <IconBrandOnlyfans className="h-4 w-4 text-echo-dark dark:text-echo-light" />
            <span className="text-echo-dark dark:text-echo-light text-sm">
              Continue with OnlyFans
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>

      {onChangeMode && (
        <div className="text-center text-sm mt-4">
          Already have an account?{" "}
          <button 
            type="button"
            className="text-echo-present hover:text-echo-future transition-colors font-medium"
            onClick={() => onChangeMode("login")}
          >
            Log in
          </button>
        </div>
      )}
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-echo-accent to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-echo-future to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
