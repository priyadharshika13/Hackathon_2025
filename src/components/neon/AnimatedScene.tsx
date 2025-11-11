import { motion } from 'framer-motion';
import { prefersReducedMotion } from '../theme/ThemeProvider';

export default function AnimatedScene() {
  const reducedMotion = prefersReducedMotion();

  const shapes = [
    { id: 1, color: 'bg-neon-cyan', size: 60, x: 20, y: 20 },
    { id: 2, color: 'bg-neon-purple', size: 80, x: 60, y: 40 },
    { id: 3, color: 'bg-neon-pink', size: 50, x: 40, y: 70 },
    { id: 4, color: 'bg-neon-lime', size: 40, x: 75, y: 25 },
  ];

  const orbitingDots = [
    { id: 1, color: 'bg-neon-cyan', delay: 0 },
    { id: 2, color: 'bg-neon-purple', delay: 0.5 },
    { id: 3, color: 'bg-neon-pink', delay: 1 },
  ];

  if (reducedMotion) {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="relative w-64 h-64">
          {shapes.map((shape) => (
            <div
              key={shape.id}
              className={`absolute ${shape.color} rounded-2xl opacity-20 blur-xl`}
              style={{
                width: `${shape.size}px`,
                height: `${shape.size}px`,
                left: `${shape.x}%`,
                top: `${shape.y}%`,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Floating shapes */}
      {shapes.map((shape, index) => (
        <motion.div
          key={shape.id}
          className={`absolute ${shape.color} rounded-2xl opacity-20 blur-xl`}
          style={{
            width: `${shape.size}px`,
            height: `${shape.size}px`,
          }}
          animate={{
            x: [
              `${shape.x}%`,
              `${shape.x + (index % 2 === 0 ? 3 : -3)}%`,
              `${shape.x}%`,
            ],
            y: [
              `${shape.y}%`,
              `${shape.y + (index % 2 === 0 ? -5 : 5)}%`,
              `${shape.y}%`,
            ],
            rotate: [0, 360],
          }}
          transition={{
            duration: 8 + index * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Central orbiting system */}
      <div className="relative w-64 h-64">
        {/* Center glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-neon-cyan rounded-full opacity-30 blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Orbiting dots */}
        {orbitingDots.map((dot) => (
          <motion.div
            key={dot.id}
            className="absolute top-1/2 left-1/2"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
              delay: dot.delay,
            }}
          >
            <div
              className={`${dot.color} w-3 h-3 rounded-full shadow-glow-cyan`}
              style={{
                transform: 'translateX(100px)',
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-neon-cyan rounded-full opacity-40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
