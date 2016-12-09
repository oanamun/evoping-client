import path from 'path';
import webpack from 'webpack';
const argv = require('yargs').argv;

const NODE_ENV = argv.NODE_ENV;

export default {
  copyAssets: [
    'src/index.html',
    {
      asset: 'src/assets/**',
      dist: 'dist/assets/'
    }
  ],
  jsAssets: ['src/**/*.js'],
  mainJs: 'src/index.js',
  webpack: {
    resolve: {
      root: [
        path.resolve(__dirname, './node_modules')
      ]
    },
    plugins: [
      new webpack.ProvidePlugin({
        fetch: 'exports?self.fetch!whatwg-fetch'
      })
    ]
  },
  env: {
    'process.env': {
      NODE_ENV: JSON.stringify(NODE_ENV || process.env.NODE_ENV || 'development'),
    }
  },
  devServerPort: 8010,
  devServerProxy: {
    "/rest/*": 'http://localhost:8114'
  },
  alias: {
    'grommet-templates': path.resolve(__dirname, '../grommet-templates/src/js'),
    'grommet-index/scss': path.resolve(__dirname, '../grommet-index/src/scss'),
    'grommet-index': path.resolve(__dirname, '../grommet-index/src/js'),
    'grommet/scss': path.resolve(__dirname, '../grommet/src/scss'),
    'grommet': path.resolve(__dirname, '../grommet/src/js')
  },
  devPreprocess: ['set-webpack-alias'],
  distPreprocess: ['set-webpack-alias'],
  preCommitTasks: ['jslint','scsslint'],
};
