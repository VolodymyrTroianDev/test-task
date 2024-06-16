import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { fileURLToPath } from 'url'
import alias from '@rollup/plugin-alias'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    alias({
      entries: [
        {
          find: '@',
          replacement: path.resolve(__dirname, 'src')
        }
      ]
    })
  ]
})
