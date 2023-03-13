import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), checker({ typescript: false })],
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@utils': '/src/utils',
      '@hooks': '/src/hooks',
      '@styles': '/src/styles',
      '@assets': '/src/assets',
      '@api': '/src/api',
      '@store': '/src/store',
      '@router': '/src/router',
      '@config': '/src/config',
      '@types': '/src/types',
      '@common': '/src/common',
    },
  },
});
