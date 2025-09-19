import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Currency = 'USD' | 'INR';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  isIndia: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('USD');
  const [isIndia, setIsIndia] = useState(false);

  useEffect(() => {
    const detectLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const isUserInIndia = data.country === 'IN';
        setIsIndia(isUserInIndia);
        setCurrency(isUserInIndia ? 'INR' : 'USD');
      } catch (error) {
        console.error('Error detecting location, defaulting to USD:', error);
        setCurrency('USD');
        setIsIndia(false);
      }
    };

    detectLocation();
  }, []);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, isIndia }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

export default CurrencyContext;
