// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server:{
//   port:3000,
//   proxy:{
//    '/axon':{
//     target:"http://localhost:4000",
//     changeOrigin:true
//    }
//   }
//   }
// })


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/axon': {
        target: 'http://localhost:4000',
        changeOrigin: true
      }
    },
    historyApiFallback: true  // This ensures SPA routing works
  }
});

