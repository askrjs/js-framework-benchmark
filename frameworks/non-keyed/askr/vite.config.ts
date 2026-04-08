import { askr } from '@askrjs/askr-vite'
import { defineConfig } from 'vite-plus'

export default defineConfig({
  base: './',
  plugins: [askr()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        entryFileNames: 'main.js'
      }
    }
  }
})