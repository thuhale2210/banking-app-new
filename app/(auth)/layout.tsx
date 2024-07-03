import React from "react";
import { FlipWords } from "@/components/ui/flip-words";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen w-full justify-between font-inter">
      <AuthAsset />
      {children}
    </main>
  );
}

export function AuthAsset() {
  const words = ["securely", "smartly", "efficiently", "seamlessly"];
  return (
    <BackgroundGradientAnimation>
      <div className="h-screen absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl">
        <div className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
          Finance Finesse
          <div className="text-2xl ml-8 mt-2 font-normal text-white/60 dark:text-neutral-400">
            Manage your finances
            <FlipWords words={words} className="py-1" />
          </div>
        </div>
      </div>
    </BackgroundGradientAnimation>
  );
}