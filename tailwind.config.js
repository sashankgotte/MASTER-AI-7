/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#030712',
          900: '#070c1a',
          850: '#0b1329',
          800: '#0f1b3d',
          700: '#1b2a52',
          600: '#283c74',
        },
        cyber: {
          cyan: '#00f0ff',
          neon: '#00ffaa',
          purple: '#a855f7',
          violet: '#8b5cf6',
          blue: '#3b82f6',
          amber: '#f59e0b',
          rose: '#f43f5e',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Space Grotesk', 'Outfit', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s infinite ease-in-out',
        'float': 'float 4s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'spin-reverse': 'spinReverse 25s linear infinite',
        'ripple': 'ripple 2s cubic-bezier(0, 0.2, 0.8, 1) infinite',
        'mouth-move': 'mouthMove 0.3s ease-in-out infinite alternate',
        'wave': 'wave 1.2s ease-in-out infinite',
        'scan': 'scan 3s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'drop-shadow(0 0 15px rgba(0, 240, 255, 0.4))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 30px rgba(0, 240, 255, 0.8))' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        spinReverse: {
          'from': { transform: 'rotate(360deg)' },
          'to': { transform: 'rotate(0deg)' },
        },
        mouthMove: {
          '0%': { transform: 'scaleY(0.2)' },
          '100%': { transform: 'scaleY(1.2)' },
        },
        wave: {
          '0%, 100%': { height: '8px' },
          '50%': { height: '32px' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        }
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(0, 240, 255, 0.35)',
        'neon-purple': '0 0 20px rgba(168, 85, 247, 0.35)',
        'neon-green': '0 0 20px rgba(0, 255, 170, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'cyber-card': '0 10px 30px -10px rgba(0, 240, 255, 0.15), 0 0 0 1px rgba(0, 240, 255, 0.15)',
      }
    },
  },
  plugins: [],
}

