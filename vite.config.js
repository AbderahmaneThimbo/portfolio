import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // The build pre-renders the page in Node (scripts/prerender.mjs). These packages ship their ES modules
  // only to bundlers, so bundle them into the server build instead of importing them from node_modules.
  ssr: {
    noExternal: ['gsap', '@gsap/react', 'lenis', 'react-icons'],
  },
})
