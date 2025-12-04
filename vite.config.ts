import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],

    // 让 Vite 使用正确的目录结构（根目录 = 项目根目录）
    root: '',

    build: {
      outDir: 'dist',
      emptyOutDir: true
    },

    resolve: {
      alias: {
        '@': '/src'
      }
    }
  };
});