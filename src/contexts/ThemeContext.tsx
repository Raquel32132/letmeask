import { createContext, ReactNode, useState } from "react";

type Theme = 'light' | 'dark';

type Check = boolean;

type ThemeContextProviderProps = {
    children: ReactNode;
}

type ThemeContextType =  {
    theme: Theme;
    checkButtonTheme: Check;
    toggleTheme: () => void;
}

export const ThemeContext = createContext({} as ThemeContextType);

export function ThemeContextProvider(props: ThemeContextProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<Theme>('light');
  const [currentCheck, setCurrentCheck] = useState<Check>(false);


  function toggleTheme() {
    setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
    setCurrentCheck(currentCheck === false ? true : false);
  }

  return(
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme, checkButtonTheme: currentCheck }}>
      {props.children}
    </ThemeContext.Provider>
  )
}