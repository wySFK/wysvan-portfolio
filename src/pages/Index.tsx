import { motion } from "framer-motion";
import { Github, Facebook, Mail, ChevronDown, GraduationCap, Code, Brush, ExternalLink, FolderGit2, MessageSquare, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { toast } = useToast();
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon!",
    });
    setIsContactOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="text-lg md:text-xl font-medium text-gray-500 tracking-wider uppercase">Welcome to my portfolio</span>
          <h1 className="mt-6 text-5xl md:text-6xl font-bold text-gray-900">
            Hi, I'm <span className="text-gray-700">Wyslie Van Basa</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600">
           Creating functional and userfriendly digital solutions
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full hover:scale-105 transition-transform"
              onClick={() => scrollToSection("contact")}
            >
              Get in touch
            </Button>
            <Button
              size="lg"
              className="rounded-full hover:scale-105 transition-transform"
              onClick={() => scrollToSection("education")}
            >
              View my background
            </Button>
          </div>
          <div className="mt-12 flex gap-6 justify-center">
            <a
              href="https://github.com/wySFK"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://www.facebook.com/wySVan"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href="mailto:wyslievan@gmail.com"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <MessageSquare className="w-6 h-6" />
            </a>
          </div>
        </motion.div>
        <button
          onClick={() => scrollToSection("about")}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 hover:text-gray-600 transition-colors animate-bounce"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">About Me</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
                  <img src="/images/wysvan.jpg" width="50" alt="Wyslie Van"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-6">
                <p className="text-gray-600 leading-relaxed">
                I pursued my Information Technology studies at Holy Cross of Davao College. Familiar with HTML, CSS, and JavaScript , and motivated to learn more and improve. Looking for opportunities to gain hands on experience and grow in the tech industry.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Phone className="w-5 h-5" />
                    <span>+66 (09674481148)</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Mail className="w-5 h-5" />
                    <span>wyslievan@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <MapPin className="w-5 h-5" />
                    <span>NHA Maa Davao City</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <span className="text-sm font-medium text-gray-500 tracking-wider uppercase">Academic</span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">Featured Projects</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Rafael's Room Management System",
                  description: "A Room & Tenant Management",
                  tags: ["CSS", "Java", "MYSQL"],
                  image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
                  githubUrl: "#",
                  liveUrl: "#",
                },
                {
                  title: "Capstone Project: Foresenic VR Lens",
                  description: "A Virtual Reality Simulator for Forensic Photography",
                  tags: ["Oculus SDK", "C#", "Unity", "Blender"],
                  image: "https://images.unsplash.com/photo-1592477725143-2e57dc728f0a",
                  githubUrl: "#",
                  liveUrl: "#",
                },
                {
                  title: "Portfolio Website",
                  description: "A responsive portfolio website built with modern technologies",
                  tags: ["CSS", "HTML"],
                  image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
                  githubUrl: "#",
                  liveUrl: "#",
                },
              ].map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <a
                        href={project.githubUrl}
                        className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="View GitHub Repository"
                      >
                        <Github className="w-5 h-5 text-gray-900" />
                      </a>
                      <a
                        href={project.liveUrl}
                        className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="View Live Site"
                      >
                        <ExternalLink className="w-5 h-5 text-gray-900" />
                      </a>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <FolderGit2 className="w-5 h-5 text-gray-600" />
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <a
                href="https://github.com/wySFK"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                View more projects on GitHub <ExternalLink className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Education & Skills</h2>
            <div className="grid md:grid-cols-2 gap-12">
              {/* Education Timeline */}
              <div className="space-y-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <GraduationCap className="w-6 h-6 mr-2" />
                  Educational Background
                </h3>
                {[
                  {
                    period: "2021 - 2025",
                    degree: "Bachelor of Science in Information Technology",
                    school: "Holy Cross of Davao College",
                    description: "Sta.Ana Davao City",
                  },
                  {
                    period: "2019 - 2021",
                    school: "Christian Colleges of Southeast Asia ",
                    description: "Don Julian Rodriguez Sr. Ave, Talomo, Davao City, Davao Del Sur",
                  },
                  {
                    period: "2014 - 2019",
                    school: "Davao City National High School F. Torres St. Davao City",
                    description: "F. Torres St, Poblacion District, Davao City, 8000 Davao del Sur",
                  },
                  {
                    period: "2008 - 2014",
                    school: "Kapitan Tomas Monteverde Sr. Central Elementary School",
                    description: " C. Bangoy St, Poblacion District, Davao City, 8000 Davao del Sur",
                  },
                ].map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="relative pl-6 border-l-2 border-gray-200"
                  >
                    <span className="absolute left-[-9px] top-2 w-4 h-4 bg-white rounded-full border-2 border-gray-400" />
                    <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                      <span className="text-sm font-medium text-gray-500">{edu.period}</span>
                      <h4 className="font-semibold text-gray-900 mt-1">{edu.degree}</h4>
                      <p className="text-gray-600 mt-1">{edu.school}</p>
                      <p className="text-gray-500 text-sm mt-2">{edu.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Skills Section */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <Code className="w-6 h-6 mr-2" />
                    Technical Skills
                  </h3>
                  <div className="space-y-6">
                    {[
                      { category: "Frontend Development", skills: ["HTML", "CSS", "JavaScript"] },
                      { category: "UI/UX", skills: ["Figma", "Responsive Design", "Material UI"] },
                      { category: "Development Tools", skills: ["Github", "VS Code"] },
                    ].map((skillSet, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <h4 className="font-semibold text-gray-900 mb-3">{skillSet.category}</h4>
                        <div className="flex flex-wrap gap-2">
                          {skillSet.skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <Brush className="w-6 h-6 mr-2" />
                    Soft Skills
                  </h3>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        "Problem Solving",
                        "Techinal Support",
                        "Communication",
                        "Time Management",
                        "Creativity",
                        "Critical Thinking",
                        "Editing",
                        "Project Management"
                      ].map((skill, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 text-gray-700"
                        >
                          <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

       {/* Contact Section */}
       <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Get in Touch</h2>
            <p className="text-gray-600 mb-8">
              Interested in working together? Feel free to reach out for collaborations or just a friendly hello.
            </p>
            <Button 
              size="lg" 
              className="rounded-full hover:scale-105 transition-transform"
              onClick={() => setIsContactOpen(true)}
            >
              <Mail className="mr-2 h-4 w-4" /> Contact me
            </Button>
          </motion.div>
        </div>
      </section>

      <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Send me a message</DialogTitle>
            <DialogDescription>
              Fill out the form below and I'll get back to you as soon as possible.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Your email address" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Your message" className="min-h-[100px]" required />
            </div>
            <DialogFooter>
              <Button type="submit">Send message</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
