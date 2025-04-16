// styleConfig.js
// Centralized configuration for Docsendara styling
// You can customize colors, font sizes, radii, and other visual aspects here.

const styleConfig = {
  colors: {
    background: 'bg-gradient-to-b from-black via-gray-900 to-black',
    sidebar: 'bg-gradient-to-b from-white/[0.08] to-white/[0.02]',
    border: 'border-white/10',
    accent: 'from-blue-500 to-purple-500',
    text: {
      primary: 'text-white',
      secondary: 'text-gray-300',
      muted: 'text-white/50',
      link: 'text-blue-400 hover:text-blue-300',
      error: 'text-red-500',
    },
    authorBadge: 'bg-gradient-to-b from-purple-500/20 to-purple-500/10',
    contributorBadge: 'bg-gradient-to-b from-blue-500/20 to-blue-500/10',
    card: 'bg-gradient-to-b from-white/[0.08] to-white/[0.02]',
  },
  font: {
    family: 'font-display', // or 'font-sans', etc.
    sizes: {
      h1: 'text-4xl',
      h2: 'text-2xl',
      h3: 'text-xl',
      body: 'text-base',
      small: 'text-xs',
      tiny: 'text-[8px]',
    },
    weights: {
      bold: 'font-bold',
      semibold: 'font-semibold',
      normal: 'font-normal',
    },
  },
  radius: {
    card: 'rounded-lg',
    badge: 'rounded-md',
    avatar: 'rounded-full',
  },
  spacing: {
    section: 'p-6',
    card: 'p-4',
    sidebar: 'ml-8',
    gap: 'gap-2',
  },
  shadow: {
    card: 'shadow-lg',
  },
  transitions: {
    default: 'transition-all duration-150',
  },
};

export default styleConfig;
