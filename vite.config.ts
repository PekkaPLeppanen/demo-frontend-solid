import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000
  },
  test: {
    environment: 'jsdom',
    globals: true,
    transformMode: {
      web: [/\.[jt]sx?$/]
    },
    setupFiles: ['node_modules/@testing-library/jest-dom/extend-expect.js'],
    // otherwise, solid would be loaded twice:
    deps: { registerNodeLoader: true },
    // if you have few tests, try commenting one
    // or both out to improve performance:
    threads: false,
    isolate: false
  },
  build: {
    target: 'esnext'
  },
  resolve: {
    conditions: ['development', 'browser'],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
