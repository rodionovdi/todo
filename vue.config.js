module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "./src/assets/styles/breakpoints.scss";`
      }
    },
    
  },
  runtimeCompiler: true,
  publicPath: '/todo/'
};