module.exports = {
  plugins: [
    require('postcss-modules')({
      globalModulePaths: [/src\/styles\/global.css/],
      getJSON:
        // ctx.extractModules ||
        (_filename, _json, _outputFile) => {},
    }),
  ],
};
