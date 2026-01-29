'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGithub,
  FaGitAlt,
  FaFigma,
  FaPython,
} from 'react-icons/fa';
import {
  SiTailwindcss,
  SiNextdotjs,
  SiMongodb,
  SiExpress,
  SiTypescript,
  SiFirebase,
  SiVercel,
  SiDocker,
  SiOpenai,
} from 'react-icons/si';

type Skill = {
  name: string;
  icon: React.ReactNode;
};

const skills: Skill[] = [
  { name: 'HTML5', icon: <FaHtml5 className="text-orange-500" /> },
  { name: 'CSS3', icon: <FaCss3Alt className="text-blue-500" /> },
  { name: 'JavaScript', icon: <FaJs className="text-yellow-400" /> },
  { name: 'TypeScript', icon: <SiTypescript className="text-blue-400" /> },
  { name: 'React.js', icon: <FaReact className="text-cyan-400" /> },
  { name: 'Next.js', icon: <SiNextdotjs className="text-white" /> },
  { name: 'Tailwind', icon: <SiTailwindcss className="text-cyan-300" /> },
  { name: 'Node.js', icon: <FaNodeJs className="text-green-500" /> },
  { name: 'Express', icon: <SiExpress className="text-gray-300" /> },
  { name: 'MongoDB', icon: <SiMongodb className="text-green-400" /> },
  { name: 'Git', icon: <FaGitAlt className="text-orange-500" /> },
  { name: 'GitHub', icon: <FaGithub className="text-white" /> },
  { name: 'Figma', icon: <FaFigma className="text-pink-400" /> },
  { name: 'Firebase', icon: <SiFirebase className="text-yellow-500" /> },
  { name: 'Python', icon: <FaPython className="text-blue-400" /> },
  { name: 'Docker', icon: <SiDocker className="text-blue-300" /> },
  { name: 'Vercel', icon: <SiVercel className="text-white" /> },
  { name: 'OpenAI', icon: <SiOpenai className="text-emerald-300" /> },
];

// Fibonacci sphere points (uniform distribution)
function getSpherePoints(n: number) {
  const points: { x: number; y: number; z: number }[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle

  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2; // 1 to -1
    const radius = Math.sqrt(1 - y * y);
    const theta = phi * i;

    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;

    points.push({ x, y, z });
  }
  return points;
}

export default function SkillsGlobe() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [rot, setRot] = useState({ x: 0.4, y: 0.2 });
  const [dragging, setDragging] = useState(false);

  const points = useMemo(() => getSpherePoints(skills.length), []);

  // auto rotate
  useEffect(() => {
    let raf = 0;

    const loop = () => {
      setRot((r) => {
        if (dragging) return r;
        return { x: r.x + 0.0015, y: r.y + 0.002 };
      });
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [dragging]);

  // rotate a point in 3D
  const rotatePoint = (p: { x: number; y: number; z: number }) => {
    const cosY = Math.cos(rot.y);
    const sinY = Math.sin(rot.y);

    const cosX = Math.cos(rot.x);
    const sinX = Math.sin(rot.x);

    // rotate around Y
    let x = p.x * cosY + p.z * sinY;
    let z = -p.x * sinY + p.z * cosY;

    // rotate around X
    let y = p.y * cosX - z * sinX;
    z = p.y * sinX + z * cosX;

    return { x, y, z };
  };

  const size = 520; // globe size
  const radius = 190; // sphere radius
  const perspective = 700;

  const onPointerDown = () => setDragging(true);
  const onPointerUp = () => setDragging(false);

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    setRot((r) => ({
      x: r.x + e.movementY * 0.004,
      y: r.y + e.movementX * 0.004,
    }));
  };

  return (
    <section
      id="skills"
      className="relative py-24 bg-gradient-to-b from-gray-950 to-gray-900 overflow-hidden"
    >
      {/* soft orbs */}
      <div className="absolute -top-10 -left-10 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
      <div className="absolute -bottom-10 -right-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          🌍 Skill <span className="text-fuchsia-400">Globe</span>
        </motion.h2>

        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
          Drag to rotate — skills orbit like a mini universe.
        </p>

        <div className="flex items-center justify-center">
          <div
            ref={containerRef}
            className="relative select-none"
            style={{
              width: size,
              height: size,
              perspective: `${perspective}px`,
            }}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
            onPointerMove={onPointerMove}
          >
            {/* Center core */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="h-20 w-20 rounded-full bg-fuchsia-500/30 blur-xl" />
              <div className="absolute inset-0 h-20 w-20 rounded-full border border-fuchsia-400/40 shadow-[0_0_30px_rgba(236,72,153,0.35)]" />
            </div>

            {skills.map((skill, i) => {
              const p = rotatePoint(points[i]);

              // project 3D -> 2D
              const scale = (p.z + 2) / 3; // 0.33 ~ 1.33
              const x2d = p.x * radius;
              const y2d = p.y * radius;

              const opacity = Math.min(1, Math.max(0.35, scale));
              const zIndex = Math.floor(scale * 100);

              return (
                <div
                  key={skill.name}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    transform: `translate(${x2d}px, ${y2d}px) translate(-50%, -50%) scale(${scale})`,
                    opacity,
                    zIndex,
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.12 }}
                    className="flex items-center gap-2 rounded-2xl border border-white/10 bg-gray-900/60 px-4 py-2 backdrop-blur-md
                               shadow-[0_0_18px_rgba(236,72,153,0.18)]
                               hover:border-fuchsia-400/50"
                  >
                    <span className="text-2xl">{skill.icon}</span>
                    <span className="text-sm font-medium text-gray-100">
                      {skill.name}
                    </span>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-10 text-center text-gray-500 text-sm">
          Tip: Drag the globe like a game 🎮
        </div>
      </div>
    </section>
  );
}
