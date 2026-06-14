import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// On GitHub Pages a project site is served from /<repo-name>/, so the build
// needs that base path. Local dev keeps a clean root. Override with VITE_BASE.
// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base:
    process.env.VITE_BASE ??
    (command === 'build' ? '/LearnWithDeiva/' : '/'),
  plugins: [react()],
}))
