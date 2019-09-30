require('@babel/polyfill');
const path = require('path');
const fs = require('fs');
const packagejson = require('../package.json');

const createResources = require('../lib/utils/createResources');
const cleanResources = require('../lib/utils/cleanResources');
const dirnameScss = path.resolve(__dirname, './test-scss');
const dirnameLess = path.resolve(__dirname, './test-less');
const scssUrls = [
  {uri: 'https://raw.githubusercontent.com/dingchenaobo/test/master/theme.scss'},
];
const lessUrls = [
  {uri: 'https://raw.githubusercontent.com/dingchenaobo/test/master/theme2.less'},
];

describe(`description: ${packagejson.description} 测试:`, () => {
  test('[function] cleanResources:', () => {
    cleanResources(dirnameLess);
    expect(fs.existsSync(dirnameLess)).toBe(true);
    cleanResources(dirnameScss);
    expect(fs.existsSync(dirnameScss)).toBe(true);
  });

  test('[function] createResources:', () => {
    createResources(scssUrls, dirnameScss, (error) => {
      expect(
        error &&
        fs.readdirSync(dirnameScss).length === scssUrls.length
      ).toBe(null);
    });
    createResources(lessUrls, dirnameLess, (error) => {
      expect(
        error &&
        fs.readdirSync(dirnameLess).length === lessUrls.length
      ).toBe(null);
    });
  });
});
