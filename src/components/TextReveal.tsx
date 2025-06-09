import { motion } from 'framer-motion';
import React from 'react';

interface TextRevealProps {
  children: React.ReactNode;
  delay?: number;
  isVisible?: boolean;
}

const TextReveal: React.FC<TextRevealProps> = ({ 
  children, 
  delay = 0,
  isVisible = true 
}) => {
  return (
    <motion.div
      className="overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 20
      }}
      transition={{
        duration: 0.7,
        ease: [0.33, 1, 0.68, 1],
        delay: delay
      }}
    >
      {children}
    </motion.div>
  );
};

export default TextReveal; 