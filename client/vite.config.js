import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    open:false,
    strictPort:true,
    host:true,
    port:3000
  }
});
