import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'  // Import fs module
import path from 'path'  // Import path module

// Paths to the SSL certificate and key
const certPath = path.resolve(__dirname, "../server/localhost.pem");
const keyPath = path.resolve(__dirname, "../server/localhost-key.pem");

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Set your desired port here
    https: {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    }
  }
})