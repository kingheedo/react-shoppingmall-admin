import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import dns from 'dns';

dns.setDefaultResultOrder('verbatim');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3070,
    proxy: {
      '/api': 'http://localhost'
    }
  },
  /* custom */
  resolve: { 
    alias: [
      { find: '@Types', replacement: path.resolve('./src/@Types') },
      { find: 'apis', replacement: path.resolve('./src/apis') },
      { find: 'assets', replacement: path.resolve('./src/assets') },
      { find: 'components', replacement: path.resolve('./src/components') },
      { find: 'pages', replacement: path.resolve('./src/pages') },
      { find: 'routes', replacement: path.resolve('./src/routes') },
      { find: 'styles', replacement: path.resolve('./src/styles') },
      { find: 'config', replacement: path.resolve('./src/config') },
      { find: 'context', replacement: path.resolve('./src/context') },
      { find: 'store', replacement: path.resolve('./src/store') },
      { find: 'layout', replacement: path.resolve('./src/layout') },
      { find: 'hooks', replacement: path.resolve('./src/hooks') },
      { find: 'utils', replacement: path.resolve('./src/utils') }
    ]
  }
});
