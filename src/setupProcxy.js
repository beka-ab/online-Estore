const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://product-list-add.000webhostapp.com",
      secure: false,
      changeOrigin: true,
    })
  );
};
