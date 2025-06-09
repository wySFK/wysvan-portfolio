import { motion } from "framer-motion";
import { Code2, Database, Layout, Palette, Server, Settings } from "lucide-react";

const skillCategories = [
  {
    title: "Frontend Development",
    icon: Layout,
    skills: [
      { name: "HTML5", level: 90 },
      { name: "CSS3/SCSS", level: 85 },
      { name: "JavaScript", level: 80 },
      { name: "React", level: 75 },
      { name: "TypeScript", level: 70 },
    ],
  },
  {
    title: "Backend Development",
    icon: Server,
    skills: [
      { name: "Node.js", level: 70 },
      { name: "Express", level: 65 },
      { name: "MySQL", level: 75 },
      { name: "MongoDB", level: 60 },
    ],
  },
  {
    title: "Tools & Technologies",
    icon: Settings,
    skills: [
      { name: "Git", level: 80 },
      { name: "VS Code", level: 85 },
      { name: "npm/yarn", level: 75 },
      { name: "Docker", level: 60 },
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-[#FFFFFF]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-gray-500 tracking-wider uppercase">
              Expertise
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">
              Skills & Technologies
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <Icon className="w-6 h-6 text-blue-500" />
                    <h3 className="font-semibold text-gray-900">{category.title}</h3>
                  </div>

                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">
                            {skill.name}
                          </span>
                          <span className="text-sm text-gray-500">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-[#FFFFFF] rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: skillIndex * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-blue-500 h-2 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;