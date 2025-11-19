// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: set base to your repo name so GitHub Pages finds assets
export default defineConfig({
  base: '/CrowdCounterMicrobit/',
  plugins: [react()],
})
