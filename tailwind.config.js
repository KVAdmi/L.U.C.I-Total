/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        'glass-bg': 'rgba(23, 23, 23, 0.7)',
        'glass-border': 'rgba(255, 255, 255, 0.1)',
        // AL-E Crystal Design System - MODO OSCURO
        'ale-black': '#0B0E11',
        'ale-petrol': '#15333E',
        'ale-glass': 'rgba(255,255,255,0.12)',
        'ale-white': '#FFFFFF',
        'ale-neon': '#83F3FF',
        // AL-E Crystal Design System - MODO CLARO (VIP Professional)
        'ale-white-bg': '#FAFBFC',
        'ale-silver': '#E8ECEF',
        'ale-pearl': '#F5F7F9',
        'ale-charcoal': '#1A2332',
        'ale-slate': '#4A5568',
        'ale-deep-teal': '#0A4D5C',
        'ale-teal-hover': '#0D6B7D',
        'ale-border-light': 'rgba(26,35,50,0.12)',
        'ale-accent-cyan': '#0891B2',
        'ale-shadow': 'rgba(26,35,50,0.08)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backdropBlur: {
        xl: '20px',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}