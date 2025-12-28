/** @type {import('tailwindcss').Config} */
import { difyColors } from './dify-colors.js';

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...difyColors,
        // EasyQuant Theme - CSS Variables for light/dark mode
        eq: {
          // Backgrounds
          base: 'var(--eq-bg-base)',
          surface: 'var(--eq-bg-surface)',
          elevated: 'var(--eq-bg-elevated)',
          overlay: 'var(--eq-bg-overlay)',
          // Borders
          'border-subtle': 'var(--eq-border-subtle)',
          'border-default': 'var(--eq-border-default)',
          'border-strong': 'var(--eq-border-strong)',
          // Text
          'text-primary': 'var(--eq-text-primary)',
          'text-secondary': 'var(--eq-text-secondary)',
          'text-muted': 'var(--eq-text-muted)',
          // Primary (Blue)
          'primary-400': 'var(--eq-primary-400)',
          'primary-500': 'var(--eq-primary-500)',
          'primary-600': 'var(--eq-primary-600)',
          // Success (Green)
          'success-bg': 'var(--eq-success-bg)',
          'success-border': 'var(--eq-success-border)',
          'success-text': 'var(--eq-success-text)',
          'success-solid': 'var(--eq-success-solid)',
          // Danger (Red)
          'danger-bg': 'var(--eq-danger-bg)',
          'danger-border': 'var(--eq-danger-border)',
          'danger-text': 'var(--eq-danger-text)',
          'danger-solid': 'var(--eq-danger-solid)',
          // Warning (Yellow)
          'warning-bg': 'var(--eq-warning-bg)',
          'warning-border': 'var(--eq-warning-border)',
          'warning-text': 'var(--eq-warning-text)',
          'warning-solid': 'var(--eq-warning-solid)',
          // Info (Light Blue)
          'info-bg': 'var(--eq-info-bg)',
          'info-border': 'var(--eq-info-border)',
          'info-text': 'var(--eq-info-text)',
        },
        // Dify Standard Palettes
        gray: {
          25: '#fcfcfd',
          50: '#f9fafb',
          100: '#f2f4f7',
          200: '#eaecf0',
          300: '#d0d5dd',
          400: '#98a2b3',
          500: '#667085',
          700: '#475467',
          600: '#344054',
          800: '#1d2939',
          900: '#101828',
        },
        primary: {
          25: '#f5f8ff',
          50: '#eff4ff',
          100: '#d1e0ff',
          200: '#b2ccff',
          300: '#84adff',
          400: '#528bff',
          500: '#2970ff',
          600: '#155eef',
          700: '#004eeb',
          800: '#0040c1',
          900: '#00359e',
        },
        blue: {
          500: '#E1EFFE',
        },
        green: {
          50: '#F3FAF7',
          100: '#DEF7EC',
          800: '#03543F',
        },
        yellow: {
          100: '#FDF6B2',
          800: '#723B13',
        },
        purple: {
          50: '#F6F5FF',
          200: '#DCD7FE',
        },
        indigo: {
          25: '#F5F8FF',
          50: '#EEF4FF',
          100: '#E0EAFF',
          300: '#A4BCFD',
          400: '#8098F9',
          600: '#444CE7',
          800: '#2D31A6',
        },
        danger: {
          50: '#FEF3F2',
          100: '#FEE4E2',
          200: '#FECDCA',
          300: '#FDA29B',
          400: '#F97066',
          500: '#F04438',
          600: '#D92D20',
          700: '#B42318',
          800: '#912018',
          900: '#7A271A',
        },
        success: {
          50: '#ECFDF3',
          100: '#D1FADF',
          200: '#A6F4C5',
          300: '#6CE9A6',
          400: '#32D583',
          500: '#12B76A',
          600: '#039855',
          700: '#027A48',
          800: '#05603A',
          900: '#054F31',
        },
        warning: {
          50: '#FFFAEB',
          100: '#FEF0C7',
          200: '#FEDF89',
          300: '#FEC84B',
          400: '#FDB022',
          500: '#F79009',
          600: '#DC6803',
          700: '#B54708',
          800: '#93370D',
          900: '#7A2E0E',
        },
      },
      borderRadius: {
        'eq-sm': '4px',
        'eq-md': '6px',
        'eq-lg': '8px',
        'eq-xl': '12px',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}