// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/stockfish/stockfish.wasm',
        createProxyMiddleware({
            target: 'http://localhost:3000', // or your local development URL
            changeOrigin: true,
            onProxyRes: (proxyRes) => {
                proxyRes.headers['Cross-Origin-Embedder-Policy'] = 'require-corp';
                proxyRes.headers['Cross-Origin-Opener-Policy'] = 'same-origin';
            }
        })
    );

    app.use(
        '/stockfish/*',
        createProxyMiddleware({
            target: 'http://localhost:3000',
            changeOrigin: true,
            onProxyRes: (proxyRes) => {
                proxyRes.headers['Cross-Origin-Embedder-Policy'] = 'require-corp';
            }
        })
    );
};
