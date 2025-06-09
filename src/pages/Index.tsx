import { motion, useMotionValue, useSpring } from "framer-motion";
import { Github, Facebook, Mail, ChevronDown, Code, Brush, ExternalLink, FolderGit2, MessageSquare, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Canvas } from "@react-three/fiber";
import "@/styles/fonts.css";
import "@/styles/nav.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Parallax } from "@/components/Parallax";
import SmoothScrolling from "@/components/SmoothScrolling";
import { useLenis } from "@studio-freight/react-lenis";
import { AnimationManager } from '@/lib/AnimationManager';
import { TextAnimator } from '@/lib/TextAnimator';
import PageTransition from "@/components/PageTransition";
import '@/styles/animations.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const CustomCursor = ({ mouseX, mouseY, cursorType = "default" }: { mouseX: any; mouseY: any; cursorType?: string }) => {
  const [text, setText] = useState("");
  const fullText = cursorType === "contact" ? "LET'S TALK" : "SEE MORE";
  
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50"
      style={{
        x: mouseX,
        y: mouseY,
      }}
    >
      <div className="bg-black px-[8px] py-[0.5px] relative -translate-y-[10px] translate-x-[20px] h-[14px] flex items-center">
        <span className="text-[11px] tracking-[0.05em] text-white font-light whitespace-nowrap min-w-[60px]">
          {text}
        </span>
      </div>
    </motion.div>
  );
};

const Index = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { toast } = useToast();
  const [currentTime, setCurrentTime] = useState("");
  const lenis = useLenis();
  
  // Refs for sections
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 700 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);
  const [textRevealed, setTextRevealed] = useState(false);
  const [portfolioText, setPortfolioText] = useState("");
  const [githubText, setGithubText] = useState("");
  const [facebookText, setFacebookText] = useState("");
  const [emailText, setEmailText] = useState("");
  const [scrollText, setScrollText] = useState("");
  const [cursorType, setCursorType] = useState("default");

  // Add refs for social links
  const socialRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    cursorX.set(e.clientX - rect.left);
    cursorY.set(e.clientY - rect.top);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  useEffect(() => {
    // Initialize GSAP animations for sections
    const sections = [aboutRef, skillsRef, projectsRef, contactRef];
    
    sections.forEach((sectionRef) => {
      if (sectionRef.current) {
        gsap.fromTo(
          sectionRef.current,
          {
            opacity: 0,
            y: 50
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "top 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Enhanced smooth scroll function with Lenis
  const scrollToSection = (id) => {
    setIsTransitioning(true);
    
    // Start scrolling as content fades out
    setTimeout(() => {
      lenis?.scrollTo(`#${id}`, { 
        offset: -80,
        lerp: 0.1,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
      
      // Reset transition state after the fade completes
      setTimeout(() => {
        setIsTransitioning(false);
      }, 1200);
    }, 600);
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      const date = new Date();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
      const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
      setCurrentTime(`${String(formattedHours).padStart(2, '0')}:${String(formattedMinutes).padStart(2, '0')} ${ampm}`);
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    // Start the text reveal animation after a short delay
    const timer = setTimeout(() => {
      setTextRevealed(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Portfolio text animation
  useEffect(() => {
    const text = "Portfolio_20/25";
    let currentIndex = 0;
    
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setPortfolioText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 35);
      
      return () => clearInterval(interval);
    }, 1200);
    
    return () => clearTimeout(startDelay);
  }, []);

  // Social links typewriter effect
  useEffect(() => {
    const texts = {
      github: "GITHUB ↗",
      facebook: "FACEBOOK ↗",
      email: "EMAIL ↗"
    };
    
    // GitHub animation
    const githubDelay = setTimeout(() => {
      let currentIndex = 0;
      const githubInterval = setInterval(() => {
        if (currentIndex <= texts.github.length) {
          setGithubText(texts.github.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(githubInterval);
        }
      }, 35);
      return () => clearInterval(githubInterval);
    }, 1400);

    // Facebook animation
    const facebookDelay = setTimeout(() => {
      let currentIndex = 0;
      const facebookInterval = setInterval(() => {
        if (currentIndex <= texts.facebook.length) {
          setFacebookText(texts.facebook.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(facebookInterval);
        }
      }, 35);
      return () => clearInterval(facebookInterval);
    }, 1600);

    // Email animation
    const emailDelay = setTimeout(() => {
      let currentIndex = 0;
      const emailInterval = setInterval(() => {
        if (currentIndex <= texts.email.length) {
          setEmailText(texts.email.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(emailInterval);
        }
      }, 35);
      return () => clearInterval(emailInterval);
    }, 1800);

    return () => {
      clearTimeout(githubDelay);
      clearTimeout(facebookDelay);
      clearTimeout(emailDelay);
    };
  }, []);

  useEffect(() => {
    const text = "[SCROLL TO EXPLORE]";
    let currentIndex = 0;
    
    const scrollDelay = setTimeout(() => {
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          const spanWrappedText = text
            .slice(0, currentIndex)
            .split('')
            .map((char, i) => `<span>${char}</span>`)
            .join('');
          setScrollText(spanWrappedText);
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 35);
      
      return () => clearInterval(interval);
    }, 2000);
    
    return () => clearTimeout(scrollDelay);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon!",
    });
    setIsContactOpen(false);
  };

  useEffect(() => {
    const animationManager = new AnimationManager();
    animationManager.initializeAnimations();
  }, []);

  // Initialize social links animation
  useEffect(() => {
    if (!textRevealed) return;

    const cleanupFunctions: (() => void)[] = [];

    socialRefs.current.forEach((ref) => {
      if (ref) {
        const animator = new TextAnimator(ref);
        
        const handleMouseEnter = () => animator.animate();
        const handleMouseLeave = () => animator.reset();
        
        ref.addEventListener('mouseenter', handleMouseEnter);
        ref.addEventListener('mouseleave', handleMouseLeave);

        cleanupFunctions.push(() => {
          ref.removeEventListener('mouseenter', handleMouseEnter);
          ref.removeEventListener('mouseleave', handleMouseLeave);
          animator.cleanup();
        });
      }
    });

    return () => {
      cleanupFunctions.forEach(cleanup => cleanup());
    };
  }, [textRevealed]);

  return (
    <SmoothScrolling>
      <PageTransition isVisible={isTransitioning} />
      <div className="min-h-screen bg-[#F8F6F1]" onMouseMove={handleMouseMove}>
        {isHovering && <CustomCursor mouseX={mouseX} mouseY={mouseY} cursorType={cursorType} />}
        
        {/* Top Navigation */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#F8F6F1]/80 backdrop-blur-sm">
          <div className="halftone"></div>
          <div className="max-w-[1600px] mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div 
                onClick={() => scrollToSection('hero')}
                className="nav-link"
                data-scroll-text
              >
                <span>W</span>
                <span>Y</span>
                <span>S</span>
                <span>V</span>
                <span>A</span>
                <span>N</span>
                <span>_</span>
                <span>B</span>
                <span>A</span>
                <span>S</span>
                <span>A</span>
                <span>&nbsp;</span>
                {currentTime.split('').map((char, index) => (
                  <span key={index}>{char}</span>
                ))}
              </div>
              <nav className="flex items-center gap-12">
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="nav-link"
                  data-scroll-text
                >
                  <span>A</span>
                  <span>B</span>
                  <span>O</span>
                  <span>U</span>
                  <span>T</span>
                </button>
                <button 
                  onClick={() => scrollToSection('projects')} 
                  className="nav-link"
                  data-scroll-text
                >
                  <span>P</span>
                  <span>R</span>
                  <span>O</span>
                  <span>J</span>
                  <span>E</span>
                  <span>C</span>
                  <span>T</span>
                  <span>S</span>
                </button>
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className="nav-link"
                  data-scroll-text
                >
                  <span>C</span>
                  <span>O</span>
                  <span>N</span>
                  <span>T</span>
                  <span>A</span>
                  <span>C</span>
                  <span>T</span>
                </button>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section 
          id="hero" 
          className="min-h-screen relative bg-[#F8F6F1]"
        >
          <div className="absolute inset-0">
            <div className="absolute top-[40%] left-[57%] -translate-x-1/2 -translate-y-1/2 w-full max-w-[90rem] px-20">
              <div className="flex flex-col items-end">
                <div className="relative">
                  <motion.h1 
                    className="hero-title text-[clamp(120px,25vw,220px)] font-normal leading-[0.85] tracking-[-0.02em] font-helvetica text-black text-left overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.span 
                      className="block"
                      initial={{ y: 150 }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
                    >
                      Wyslie
                    </motion.span>
                    <motion.span 
                      className="block"
                      initial={{ y: 150 }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1], delay: 0.3 }}
                    >
                      Van Basa
                    </motion.span>
                  </motion.h1>
                  <motion.div 
                    className="absolute left-[2rem] top-[calc(100%+1.5rem)] flex flex-col text-left"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: textRevealed ? 1 : 0, y: textRevealed ? 0 : 20 }}
                    transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1], delay: 0.8 }}
                  >
                    <motion.p 
                      className="text-[16px] font-medium leading-tight"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: textRevealed ? 1 : 0, x: textRevealed ? 0 : -20 }}
                      transition={{ duration: 0.5, delay: 1 }}
                    >
                      Interactive Developer
                    </motion.p>
                    <motion.p 
                      className="text-[16px] font-medium leading-tight -mt-[1px]"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: textRevealed ? 1 : 0, x: textRevealed ? 0 : -20 }}
                      transition={{ duration: 0.5, delay: 1.1 }}
                    >
                      Based in Davao City
                    </motion.p>
                    <motion.p 
                      className="mt-5 text-[10px] tracking-[0.15em] text-[#999999] uppercase text-left"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {portfolioText}
                    </motion.p>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Bottom Links */}
            <motion.div 
              className="absolute bottom-16 w-full px-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: textRevealed ? 1 : 0, y: textRevealed ? 0 : 20 }}
              transition={{ duration: 0.7, delay: 1.3 }}
            >
              <div className="max-w-[1600px] mx-auto relative">
                <div className="absolute left-[36%] -translate-x-0 translate-y-[2px]">
                  <div 
                    data-scroll-text
                    className="text-[11px] tracking-[0.2em] font-extralight cursor-pointer text-[#666666] hover:text-black transition-colors duration-300"
                  >
                    <span>[</span>
                    <span>S</span>
                    <span>C</span>
                    <span>R</span>
                    <span>O</span>
                    <span>L</span>
                    <span>L</span>
                    <span>&nbsp;</span>
                    <span>T</span>
                    <span>O</span>
                    <span>&nbsp;</span>
                    <span>E</span>
                    <span>X</span>
                    <span>P</span>
                    <span>L</span>
                    <span>O</span>
                    <span>R</span>
                    <span>E</span>
                    <span>]</span>
                  </div>
                </div>
                <div className="absolute -right-40 flex items-center gap-6 translate-y-0">
                  <a 
                    ref={el => socialRefs.current[0] = el}
                    href="https://github.com/wySFK" 
                    className="social-link nav-link"
                    data-scroll-text
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <span>G</span>
                    <span>I</span>
                    <span>T</span>
                    <span>H</span>
                    <span>U</span>
                    <span>B</span>
                    <span className="arrow">↗</span>
                  </a>
                  <a 
                    ref={el => socialRefs.current[1] = el}
                    href="https://facebook.com" 
                    className="social-link nav-link"
                    data-scroll-text
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <span>F</span>
                    <span>A</span>
                    <span>C</span>
                    <span>E</span>
                    <span>B</span>
                    <span>O</span>
                    <span>O</span>
                    <span>K</span>
                    <span className="arrow">↗</span>
                  </a>
                  <a 
                    ref={el => socialRefs.current[2] = el}
                    href="mailto:wyslievan@gmail.com"
                    className="social-link nav-link"
                    data-scroll-text
                  >
                    <span>E</span>
                    <span>M</span>
                    <span>A</span>
                    <span>I</span>
                    <span>L</span>
                    <span className="arrow">↗</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" ref={projectsRef} className="projects-section py-32 bg-[#F8F6F1]">
          <div className="w-full">
            <Parallax className="w-full" speed={0.2}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="max-w-[90rem] mx-auto px-8"
              >
                <div className="mb-20 -ml-40">
                  <div className="flex items-baseline">
                    <h2 className="text-[clamp(80px,25vw,90px)] leading-none tracking-[-0.02em] font-normal">
                      Featured works
                    </h2>
                    <span className="text-[12px] ml-2 text-gray-500">[003]</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative isolate">
                  {/* Project 1 */}
                  <a 
                    href="https://github.com/wySFK/Rafael-s-Room-Management-System"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="group cursor-pointer -ml-40 w-fit h-fit"
                    >
                      <div 
                        className="relative w-fit"
                        onMouseEnter={() => {
                          setIsHovering(true);
                          setCursorType("default");
                        }}
                        onMouseLeave={() => {
                          setIsHovering(false);
                          setCursorType("default");
                        }}
                      >
                        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                          <img
                            src="/images/Rafael.png"
                            alt="Rafael's Management System"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                        <div className="mt-2">
                          <p className="text-[10px] tracking-[0.2em] text-black font-light mb-1 text-left">001_RENTAL MANAGEMENT SYSTEM</p>
                          <p className="text-[12px] leading-relaxed text-gray-600 max-w-md text-left">A console based rental management system developed using C# and SQL. Allows users to track available rooms, view renter details, and calculate rental costs. Designed for small-scale boarding house or apartment monitoring.</p>
                        </div>
                      </div>
                    </motion.div>
                  </a>

                  {/* Project 2 */}
                  <a 
                    href="https://github.com/wySFK/wysvan-portfolio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="group cursor-pointer md:mt-[38rem] w-fit h-fit"
                    >
                      <div 
                        className="relative w-fit"
                        onMouseEnter={() => {
                          setIsHovering(true);
                          setCursorType("default");
                        }}
                        onMouseLeave={() => {
                          setIsHovering(false);
                          setCursorType("default");
                        }}
                      >
                        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                          <img
                            src="/images/Alex.png"
                            alt="Portfolio Website"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                        <div className="mt-2">
                          <p className="text-[10px] tracking-[0.2em] text-black font-light mb-1 text-left">002_PORTFOLIO WEBSITE</p>
                          <p className="text-[12px] leading-relaxed text-gray-600 max-w-md text-left">A personal portfolio website built with Next.js and Tailwind CSS. Features a clean design with smooth animations and responsive layout.</p>
                        </div>
                      </div>
                    </motion.div>
                  </a>

                  {/* Project 3 */}
                  <a 
                    href="https://github.com/wySFK"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="group cursor-pointer -ml-40 w-fit h-fit"
                    >
                      <div 
                        className="relative w-fit"
                        onMouseEnter={() => {
                          setIsHovering(true);
                          setCursorType("default");
                        }}
                        onMouseLeave={() => {
                          setIsHovering(false);
                          setCursorType("default");
                        }}
                      >
                        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                          <img
                            src="/images/Forensic.png"
                            alt="Forensic VR Experience"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                        <div className="mt-2">
                          <p className="text-[10px] tracking-[0.2em] text-black font-light mb-1 text-left">003_PHOTOGRAPHY LENS</p>
                          <p className="text-[12px] leading-relaxed text-gray-600 max-w-md text-left">A photography portfolio showcasing a collection of captured moments and stories through the lens. Features landscape, portrait, and street photography.</p>
                        </div>
                      </div>
                    </motion.div>
                  </a>

                  {/* Project 4 */}
                  <a 
                    href="https://github.com/wySFK"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="group cursor-pointer md:mt-[45rem] w-fit h-fit"
                    >
                      <div 
                        className="relative w-fit"
                        onMouseEnter={() => {
                          setIsHovering(true);
                          setCursorType("default");
                        }}
                        onMouseLeave={() => {
                          setIsHovering(false);
                          setCursorType("default");
                        }}
                      >
                        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                          <img
                            src="/images/zombie.jpg"
                            alt="Zombie Survival FPS"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                        <div className="mt-2">
                          <p className="text-[10px] tracking-[0.2em] text-black font-light mb-1 text-left">004_ZOMBIE SURVIVAL FPS</p>
                          <p className="text-[12px] leading-relaxed text-gray-600 max-w-md text-left">A first-person shooter game built in Unity where players survive waves of zombies. Features weapon customization and multiple survival maps.</p>
                        </div>
                      </div>
                    </motion.div>
                  </a>
                </div>
              </motion.div>
            </Parallax>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" ref={skillsRef} className="skills-section py-20 bg-[#F8F6F1] text-black">
          <div className="container mx-auto px-4">
            <Parallax className="w-full" speed={0.3}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="max-w-7xl mx-auto"
              >
                <div className="grid grid-cols-1 gap-8">
                  <div className="text-left">
                    <h2 className="text-[clamp(60px,10vw,85px)] font-normal leading-[1.1] tracking-[-0.02em] mb-8">
                     Get to know me <br />
                    </h2>
                    <p className="text-[20px] font-mono max-w-[700px] leading-relaxed tracking-wide text-[#666666] ml-[300px] mt-[120px]">
                    I pursued my Information Technology studies at Holy Cross of Davao College. Familiar with HTML, CSS, and JavaScript, and motivated to learn more and improve. Looking for opportunities to gain hands on experience and grow in the tech industry.
                    </p>
                  </div>
                </div>
              </motion.div>
            </Parallax>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-8">
          <div className="container mx-auto">
            <div className="flex justify-between items-start gap-32">
              {/* Technical Skills */}
              <div className="flex-1 mt-[200px] ml-[150px]">
                <div className="space-y-24">
                  {/* Frontend Development */}
                  <div>
                    <div className="flex items-center gap-3 mb-8">
                      <Code className="w-5 h-5 text-blue-500" />
                      <h4 className="text-xl font-normal text-black">Front End Development</h4>
                    </div>
                    <div className="flex flex-wrap gap-6 ml-8 mt-4">
                      <span className="text-[14px] text-[#666666] transition-colors duration-300 hover:text-black cursor-pointer font-normal">HTML</span>
                      <span className="text-[14px] text-[#666666] transition-colors duration-300 hover:text-black cursor-pointer font-normal">CSS</span>
                      <span className="text-[14px] text-[#666666] transition-colors duration-300 hover:text-black cursor-pointer font-normal">JavaScript</span>
                      <span className="text-[14px] text-[#666666] transition-colors duration-300 hover:text-black cursor-pointer font-normal">Responsive Design</span>
                    </div>
                  </div>

                  {/* Development Tools */}
                  <div>
                    <div className="flex items-center gap-3 mb-8">
                      <FolderGit2 className="w-5 h-5 text-green-500" />
                      <h4 className="text-xl font-normal text-black">Development Tools</h4>
                    </div>
                    <div className="flex flex-wrap gap-6 ml-8 mt-4">
                      <span className="text-[14px] text-[#666666] transition-colors duration-300 hover:text-black cursor-pointer font-normal">GitHub</span>
                      <span className="text-[14px] text-[#666666] transition-colors duration-300 hover:text-black cursor-pointer font-normal">VS Code</span>
                      <span className="text-[14px] text-[#666666] transition-colors duration-300 hover:text-black cursor-pointer font-normal">Git</span>
                    </div>
                  </div>

                  {/* UI/UX Skills */}
                  <div>
                    <div className="flex items-center gap-3 mb-8">
                      <Brush className="w-5 h-5 text-pink-500" />
                      <h4 className="text-xl font-normal text-black">Familiar with UI/UX principles</h4>
                    </div>
                    <div className="flex flex-wrap gap-6 ml-8 mt-4">
                      <span className="text-[14px] text-[#666666] transition-colors duration-300 hover:text-black cursor-pointer font-normal">UI Design</span>
                      <span className="text-[14px] text-[#666666] transition-colors duration-300 hover:text-black cursor-pointer font-normal">Prototyping</span>
                      <span className="text-[14px] text-[#666666] transition-colors duration-300 hover:text-black cursor-pointer font-normal">User Research</span>
                      <span className="text-[14px] text-[#666666] transition-colors duration-300 hover:text-black cursor-pointer font-normal">Design Systems</span>
                      <span className="text-[14px] text-[#666666] transition-colors duration-300 hover:text-black cursor-pointer font-normal">Accessibility</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="relative w-[420px] h-[520px] overflow-hidden rounded-xl mt-[200px] mr-[50px]">
                <img
                  src="/images/wysvan.jpg"
                  alt="Wyslie Van Basa"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" ref={contactRef} className="contact-section py-40 bg-[#F8F6F1] relative">
          <div className="container mx-auto px-0">
            <div className="max-w-[90rem] mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative -ml-20"
              >
                {/* Large "Get in touch" text */}
                <div 
                  className="relative w-fit"
                  onMouseEnter={() => {
                    setIsHovering(true);
                    setCursorType("contact");
                  }}
                  onMouseLeave={() => {
                    setIsHovering(false);
                    setCursorType("default");
                  }}
                >
                  <a 
                    href="mailto:wyslievan@gmail.com"
                    className="block"
                  >
                    <h2 className="text-[clamp(130px,35vw,280px)] whitespace-nowrap font-light leading-[0.85] tracking-[-0.02em] text-black mb-24 -ml-8 font-helvetica">
                      Get in touch
                    </h2>
                  </a>
                </div>

                <div className="w-full flex justify-end pr-32">
                  <div className="flex gap-10">
                    <a 
                      href="https://github.com/wySFK" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="social-link nav-link"
                      data-scroll-text
                    >
                      <span>G</span>
                      <span>I</span>
                      <span>T</span>
                      <span>H</span>
                      <span>U</span>
                      <span>B</span>
                      <span className="arrow">↗</span>
                    </a>
                    <a 
                      href="https://facebook.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="social-link nav-link"
                      data-scroll-text
                    >
                      <span>F</span>
                      <span>A</span>
                      <span>C</span>
                      <span>E</span>
                      <span>B</span>
                      <span>O</span>
                      <span>O</span>
                      <span>K</span>
                      <span className="arrow">↗</span>
                    </a>
                    <a 
                      href="mailto:wyslievan@gmail.com"
                      className="social-link nav-link"
                      data-scroll-text
                    >
                      <span>E</span>
                      <span>M</span>
                      <span>A</span>
                      <span>I</span>
                      <span>L</span>
                      <span className="arrow">↗</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Dialog */}
        <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Get in touch</DialogTitle>
              <DialogDescription>
                Send me a message and I'll get back to you as soon as possible.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" />
                </div>
              </div>
              <DialogFooter className="mt-6">
                <Button type="submit">Send message</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </SmoothScrolling>
  );
};

export default Index; 