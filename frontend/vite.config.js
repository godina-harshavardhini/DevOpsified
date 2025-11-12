export default {
  server: {
    port: 5173, // or any free port other than 8080
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
};
