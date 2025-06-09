import { motion } from 'framer-motion';
import React from 'react';

interface PageTransitionProps {
  isVisible: boolean;
}

const PageTransition: React.FC<PageTransitionProps> = ({ isVisible }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-[#F8F6F1] pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: isVisible ? 1 : 0
      }}
      transition={{
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1]
      }}
    />
  );
};

export default PageTransition; 