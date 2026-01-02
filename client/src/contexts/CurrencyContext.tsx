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
    let didCancel = false;
    const detectLocation = async (retry = 0) => {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 3000);
        const response = await fetch('https://ipapi.co/json/', { signal: controller.signal });
        clearTimeout(timeout);
        if (!response.ok) throw new Error('Non-OK response');
        const data = await response.json();
        const isUserInIndia = data.country === 'IN';
        if (!didCancel) {
          setIsIndia(isUserInIndia);
          setCurrency(isUserInIndia ? 'INR' : 'USD');
        }
      } catch (error) {
        if (retry < 2) {
          setTimeout(() => detectLocation(retry + 1), 1000);
        } else {
          if (!didCancel) {
            setCurrency('USD');
            setIsIndia(false);
          }
        }
      }
    };
    detectLocation();
    return () => { didCancel = true; };
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
