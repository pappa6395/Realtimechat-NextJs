"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"


export function ModeToggle() {

    const { theme, setTheme } = useTheme()
    const [isHydrated, setIsHydrated] = React.useState(false);
  
    React.useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    }
    setIsHydrated(true);
    }, [setTheme]);

    React.useEffect(() => {
    if (theme) {
      localStorage.setItem("theme", theme);
    }
    }, [theme]);

    if (!isHydrated) {
        return null;
    }
    
  
    return (
    <>
    {isHydrated && theme === "dark" ? (
    <button 
        className="flex flex-col bg-slate-900
        group items-center justify-center rounded-[24px] 
        w-14 h-14 hover:text-lime-500 duration-300" 
        onClick={() => setTheme("light")}>
        <Sun className="w-5 h-5 flex-shrink-0 " />
        </button>
    ) : (
        <button 
        className="flex flex-col bg-slate-50
        group items-center justify-center rounded-[24px] 
        w-14 h-14 hover:text-lime-500 duration-300"   
        onClick={() => setTheme("dark")}>
        <Moon className="w-5 h-5 flex-shrink-0" />
    </button>
    )}
    </>
    
)
}
