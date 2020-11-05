const fs = require('fs');
const path = require('path');

module.exports = {
  plugins: [
    require('postcss-modules')({
      globalModulePaths: [/src\/styles\/global.css/],
      getJSON: function (cssFileName, json) {
        const cssName = path.basename(cssFileName, '.css');
        const jsonFileName = path.resolve('./src/styles/' + cssName + '.js');
        fs.writeFileSync(
          jsonFileName,
          `export default ${JSON.stringify(json)}`,
        );
      },
    }),
  ],
};
