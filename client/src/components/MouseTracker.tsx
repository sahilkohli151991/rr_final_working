import { useEffect, useState } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

export function MouseTracker() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className="fixed pointer-events-none z-10 w-4 h-4 bg-primary/20 rounded-full transition-all duration-100 ease-out"
      style={{
        left: mousePosition.x - 8,
        top: mousePosition.y - 8,
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
}