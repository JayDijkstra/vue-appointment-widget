import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: tag => tag === 'appointment-widget'
          }
        }
      })
  ],
  // Make process available for browsers
    define: {
        'process.env': process.env
    },
  build: {
    lib: {
      entry: 'src/components/main.ce.ts',
      name: 'appointment-widget',
      fileName: 'appointment-widget'
    },
    rollupOptions: {
    }
  }
})
