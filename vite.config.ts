import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { generateContent } from './scripts/gen-content.mjs'

/**
 * Generates the consolidated content artifacts in `public/data/` before the
 * bundle/server starts, and regenerates them in dev whenever a content file
 * under `src/content/` changes (then triggers a reload so the new data is
 * picked up on the next fetch).
 */
function contentData(isBuild: boolean): Plugin {
  const contentDir = path.resolve(__dirname, 'src/content')
  return {
    name: 'learnwithdeiva:content-data',
    async buildStart() {
      // Builds always regenerate from scratch. Dev only generates when the
      // artifacts are missing (the watcher below keeps them fresh after that),
      // so restarting the dev server stays near-instant.
      await generateContent({ log: true, force: isBuild })
    },
    configureServer(server) {
      let timer: ReturnType<typeof setTimeout> | undefined
      const regen = (file: string) => {
        if (!file.startsWith(contentDir)) return
        clearTimeout(timer)
        timer = setTimeout(async () => {
          await generateContent({ force: true })
          server.ws.send({ type: 'full-reload' })
        }, 150)
      }
      server.watcher.add(contentDir)
      server.watcher.on('add', regen)
      server.watcher.on('change', regen)
      server.watcher.on('unlink', regen)
    },
  }
}

// On GitHub Pages a project site is served from /<repo-name>/, so the build
// needs that base path. Local dev keeps a clean root. Override with VITE_BASE.
// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base:
    process.env.VITE_BASE ??
    (command === 'build' ? '/LearnWithDeiva/' : '/'),
  plugins: [contentData(command === 'build'), react()],
}))
