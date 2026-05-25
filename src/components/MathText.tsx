import React, { useEffect, useRef } from 'react';
import katex from 'katex';

interface MathTextProps {
  math: string;
  block?: boolean;
  className?: string;
}

export const MathText: React.FC<MathTextProps> = ({ math, block = false, className = '' }) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      try {
        katex.render(math, containerRef.current, {
          displayMode: block,
          throwOnError: false,
          trust: true
        });
      } catch (error) {
        console.error('KaTeX error:', error);
        containerRef.current.textContent = math;
      }
    }
  }, [math, block]);

  return (
    <span 
      ref={containerRef} 
      className={`${block ? 'block w-full overflow-x-auto text-center' : 'inline-block'} ${className}`} 
    />
  );
};

export default MathText;
