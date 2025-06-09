"use client";

import { motion } from "framer-motion";
import { Github, Facebook, Mail, ChevronDown, Code, Brush, ExternalLink, FolderGit2, MessageSquare, Phone, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { Parallax } from "@/components/Parallax";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Skills from "@/components/Skills";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [currentTime, setCurrentTime] = useState("");

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

  return (
    <main className="min-h-screen bg-[#FFFFFF]">
      {/* Top Navigation */}
      <div className="fixed top-0 left-0 w-full px-8 py-4 flex justify-between items-center z-50 bg-[#FFFFFF]">
        <div className="text-xs tracking-[0.2em] text-gray-400">WYSVAN_BCN {currentTime}</div>
        <nav className="flex gap-12">
          <a href="#" className="text-xs tracking-[0.2em] hover:opacity-60 transition-opacity">INDEX</a>
          <a href="#about" className="text-xs tracking-[0.2em] hover:opacity-60 transition-opacity">ABOUT</a>
          <a href="#projects" className="text-xs tracking-[0.2em] hover:opacity-60 transition-opacity">PLAYGROUND</a>
          <a href="#contact" className="text-xs tracking-[0.2em] hover:opacity-60 transition-opacity">LET'S TALK</a>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen relative bg-[#FFFFFF]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-full max-w-[90rem] px-20"
        >
          <Parallax className="w-full" speed={0.5}>
            <div className="flex justify-end">
              <div className="text-right">
                <h1 className="text-[clamp(80px,20vw,180px)] font-normal leading-[0.85] tracking-[-0.03em] text-black">
                  <span className="block text-left">Wyslie</span>
                  <span className="block">Van Basa</span>
                </h1>
                <div className="mt-6 text-[15px] space-y-1 text-left">
                  <p>Interactive Developer</p>
                  <p>Based in Davao City</p>
                  <p className="mt-8 text-xs tracking-[0.2em] text-[#999999]">PORTFOLIO_24</p>
                </div>
              </div>
            </div>
          </Parallax>
        </motion.div>
        <div className="absolute bottom-16 w-full">
          <div className="relative w-full">
            <div className="absolute left-1/2 -translate-x-1/2">
              <div className="text-xs tracking-[0.2em]">[SCROLL TO EXPLORE]</div>
            </div>
            <div className="absolute -right-32 flex items-center gap-6">
              <a href="https://github.com/wySFK" className="text-xs tracking-[0.2em] hover:opacity-60 transition-opacity" target="_blank" rel="noopener noreferrer">GITHUB ↗</a>
              <a href="https://facebook.com" className="text-xs tracking-[0.2em] hover:opacity-60 transition-opacity" target="_blank" rel="noopener noreferrer">FACEBOOK ↗</a>
              <a href="mailto:wyslievan@gmail.com" className="text-xs tracking-[0.2em] hover:opacity-60 transition-opacity">EMAIL ↗</a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-[#FFFFFF]">
        <div className="max-w-[90rem] mx-auto px-20">
          <h2 className="text-3xl font-bold mb-16">About Me</h2>
          <div className="grid md:grid-cols-2 gap-16">
            <div className="relative aspect-square">
              <Image
                src="/images/wysvan.jpg"
                alt="Wyslie Van Basa - Interactive Developer"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="space-y-8">
              <p className="text-gray-600">
                I pursued my Information Technology studies at Holy Cross of Davao College. Familiar with HTML, CSS, and JavaScript, and motivated to learn more and improve. Looking for opportunities to gain hands on experience and grow in the tech industry.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone className="w-5 h-5" />
                  <span>+66 (09674481148)</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="w-5 h-5" />
                  <span>wyslievan@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span>NHA Maa Davao City</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <Skills />
    </main>
  );
} 