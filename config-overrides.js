/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const { paths } = require('react-app-rewired');
const lessToJs = require('less-vars-to-js');
const GenerateJsonPlugin = require('generate-json-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const buildVersion = require('./buildVersion.js');

const BUILD_VERSION = `window.BUILD_VERSION = ${JSON.stringify(buildVersion)}`;

// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const alias = { '@': paths.appSrc };
const extensions = [".ts", ".tsx"];
const theme = fs.readFileSync(path.resolve(__dirname, `src/basic/theme.less`), 'utf8');
const errNotFound = (target) => {
  throw new Error(`定位 ${target} 出错`);
};

/**
 * 修改 webpack 配置
 * @link: https://github.com/timarney/react-app-rewired
 * @link: https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/webpack.config.js
 */

module.exports = {
  webpack: (config) => {
    // 1. 添加 @babel/polyfill
    config.entry.unshift('@babel/polyfill');
    // 2. 添加 alias extensions
    config.resolve.alias = { ...config.resolve.alias, ...alias };
    config.resolve.extensions = [...config.resolve.extensions, ...extensions];
    // 3. 启用 .eslintrc
    const eslint = config.module.rules[1].use[0];
    if (!eslint.loader.includes('eslint-loader')) errNotFound('eslint-loader');
    eslint.options = { ...eslint.options, useEslintrc: true };
    // 4. 添加 babel-plugin-import | .less 处理 | .scss 处理
    const [url, appJs, otherJs, , , sass, sassModule, file] = config.module.rules[2].oneOf;
    // url-loader test 添加.xlsx文件
    if (!url.loader.includes('url-loader')) errNotFound('url-loader');
    url.test.push(/\.(png|jpe?g|gif|svg)(\?.*)?$/);
    url.options = {
      limit: '2048'
     }
    // babel-plugin-import
    if (!appJs.loader.includes('babel-loader')) errNotFound('babel-loader');
    // const pluginImport = ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }];
    // appJs.options.plugins.unshift(pluginImport);
    const pluginImport = ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }];
    const pluginDecorators = ["@babel/plugin-proposal-decorators", { "legacy": true }];
    const addPlugsArr = [pluginImport, pluginDecorators];
    appJs.options.plugins.unshift(...addPlugsArr);
    // .less
    if (!sass.test.toString().includes('scss|sass')) errNotFound('.scss Rule');
    sass.use[3] = {
      loader: require.resolve('less-loader'),
      options: { ...sass.use[3].options, modifyVars: lessToJs(theme), javascriptEnabled: true },
    };
    const less = { test: /\.less$/, include: paths.appNodeModules, use: sass.use };
    // .scss
    if (!sassModule.test.toString().includes('.module')) errNotFound('.module.scss Rule');
    const [, cssLoader, , sassLoader] = sassModule.use;
    cssLoader.options = { ...cssLoader.options, camelCase: 'dashes' };
    sassLoader.options = { ...sassLoader.options };
    const newSassModule = { test: /\.scss$/, include: paths.appSrc, use: sassModule.use };
    // oneOf
    config.module.rules[2].oneOf = [url, appJs, otherJs, less, newSassModule, file];
    // config.plugins.push(new BundleAnalyzerPlugin());
    // 抽取公共资源
    config.optimization = {
      runtimeChunk: {
        name: 'manifest',
      },
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all',
          },
        },
      },
    };
    // 5. 删除 Service Worker HtmlWebpackPlugin
    config.plugins = config.plugins.filter((plugin) => plugin.constructor.name !== 'GenerateSW');
    config.plugins = config.plugins.filter((plugin) => plugin.constructor.name !== 'HtmlWebpackPlugin');
    // 6. 重写HtmlWebpackPlugin
    config.plugins.push(new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      buildVersion: BUILD_VERSION, // 构建的版本信息，插入index.html。全局变量
      removeComments: false, // 保留注释
    }));
    // 生成json文件
    config.plugins.push(new GenerateJsonPlugin(`/static/version/buildVersion.json`, {
      data: buildVersion,
      errmsg: '',
      errno: 0
    }),);
    // 7. 新增项目运行环境参数test|uat|online
    config.plugins.push(new webpack.DefinePlugin({
      'process.env.PROJECT_ENV': JSON.stringify(process.env.PROJECT_ENV),
    }));
    return config;
  },
  resolve: { alias }, // 使 IDE 可读取到 alias（非 react-app-rewired 配置项）
  devServer: (configFunction) => (proxy, allowedHost) => {
    // Create the default config by calling configFunction with the proxy/allowedHost parameters
    const config = configFunction(proxy, allowedHost);
    if (!process.env.HTTPS) {
      config.disableHostCheck = true;
    }
    return config;
  },
};

// const pluginImport = ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }];
// const pluginDecorators = ["@babel/plugin-proposal-decorators", { "legacy": true }];
// const addPlugsArr = [pluginImport];
// appJs.options.plugins.unshift(...addPlugsArr);