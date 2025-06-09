import { motion } from "framer-motion";
import { useState } from "react";

interface AnimatedNameProps {
  text: string;
  className?: string;
}

const AnimatedName = ({ text, className = "" }: AnimatedNameProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const letters = text.split("");

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const letterAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const hoverAnimation = {
    y: [-2, 2, -2],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <motion.div
      className={`inline-block cursor-pointer ${className}`}
      variants={container}
      initial="hidden"
      animate="show"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={letterAnimation}
          animate={isHovered ? hoverAnimation : {}}
          className="inline-block"
          style={{ display: letter === " " ? "inline" : "inline-block" }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedName; 